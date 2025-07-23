// worker.js
export default {
  async fetch(request, env) {
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200,
        headers: corsHeaders 
      });
    }

    const url = new URL(request.url);

    try {
      // Handle GET requests - Image fetching
      if (request.method === 'GET') {
        return await handleImageFetch(request, env, corsHeaders);
      }
      
      // Handle POST requests - Form submissions (keep existing functionality)
      if (request.method === 'POST') {
        return await handleFormSubmission(request, env, corsHeaders);
      }

      // Method not allowed
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  }
};

// Handle image fetching from Cloudinary
async function handleImageFetch(request, env, corsHeaders) {
  const url = new URL(request.url);
  const folder = url.searchParams.get('folder') ?? 'folder-1';
  // If explicitly passed as empty string, use empty
  const folderParam = url.searchParams.has('folder') ? url.searchParams.get('folder') : 'folder-1';

  try {
    const cloudinaryUrl = folderParam 
      ? `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=${folderParam}&max_results=500&sort_by=created_at_desc`
      : `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?max_results=500&sort_by=created_at_desc`;
    
    const response = await fetch(cloudinaryUrl, {
      headers: {
        'Authorization': `Basic ${btoa(env.CLOUDINARY_API_KEY + ':' + env.CLOUDINARY_API_SECRET)}`
      }
    });

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.status}`);
    }

        const data = await response.json();
    
    const images = data.resources.map((resource, index) => ({
      id: index,
      publicId: resource.public_id,
      name: resource.public_id.split('/').pop(),
      folder: resource.folder || '',
      url: resource.secure_url,
      createdAt: resource.created_at,
      width: resource.width,
      height: resource.height
    }));

    return new Response(JSON.stringify({ images }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch images from Cloudinary' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

// Handle form submissions (your existing Telegram integration)
async function handleFormSubmission(request, env, corsHeaders) {
  try {
    const formData = await request.json();
    const { name, 
            phoneNumber, 
            eventType,
            date,
            time,
            venue,
            isBride,
            pax,
            budget 
          } = formData;

    if (!name || 
        !phoneNumber || 
        !eventType || 
        !date || 
        !time || 
        !venue || 
        !isBride || 
        !['yes', 'no'].includes(isBride) ||
        !pax || 
        !budget) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const escapeMarkdownV2 = (text) => {
      return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
    };

    // Format Malaysian phone number for WhatsApp (remove +60 and leading zeros, ensure proper format)
    const formatWhatsAppNumber = (phoneNumber) => {
      let cleanNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
      
      // Handle Malaysian numbers
      if (cleanNumber.startsWith('60')) {
        return cleanNumber; // Already in international format without +
      } else if (cleanNumber.startsWith('0')) {
        return '60' + cleanNumber.slice(1); // Remove leading 0 and add 60
      } else {
        return '60' + cleanNumber; // Add 60 prefix
      }
    };

    const whatsappNumber = formatWhatsAppNumber(phoneNumber);
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    // Determine role with proper emojis
    const getRoleText = () => {
      if (eventType === 'wedding') {
        return isBride === 'yes' ? '👰 Bride' : '👥 Booking for someone else';
      } else if (eventType === 'engagement') {
        return isBride === 'yes' ? '💍 Bride\\-to\\-be' : '👥 Booking for someone else';
      } else {
        return isBride === 'yes' ? '🙋‍♀️ For themselves' : '👥 Booking for someone else';
      }
    };

    const telegramMessage = `
🎉 *NEW EVENT BOOKING SUBMISSION*

👤 *Client Details:*
• *Name:* ${escapeMarkdownV2(name)}
• *Phone:* ${escapeMarkdownV2(phoneNumber)}

📋 *Event Information:*
• *Type:* ${escapeMarkdownV2(eventType.charAt(0).toUpperCase() + eventType.slice(1))} 🎊
• *Date:* ${escapeMarkdownV2(date)} 📅
• *Time:* ${escapeMarkdownV2(time)} ⏰
• *Venue:* ${escapeMarkdownV2(venue)} 📍
• *Role:* ${getRoleText()}

👥 *Event Details:*
• *Number of Pax:* ${escapeMarkdownV2(pax.toString())} people
• *Budget:* RM ${escapeMarkdownV2(budget.toString())} 💰

📱 *Quick Actions:*
[Chat on WhatsApp](${whatsappLink}) 💬

━━━━━━━━━━━━━━━━━━━━━━━━
*Karya Yullie Event Services* ✨
    `.trim();

    const telegramApiUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'MarkdownV2',
      }),
    });

    if (telegramResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, message: 'Message sent.' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } else {
      const telegramError = await telegramResponse.json();
      console.error('Telegram API Error:', telegramError);
      return new Response(
        JSON.stringify({ error: 'Failed to send message.', telegram_api_error: telegramError }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

  } catch (error) {
    console.error('Worker error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error.', details: error.message || 'Check logs.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
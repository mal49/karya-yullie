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
  const requestedFolder = url.searchParams.get('folder'); // This can be 'folder2', 'folder-1', or ''

  let cloudinaryUrl;
  let requestMethod = 'GET'; // Default to GET method
  let requestBody = null; // Default to no request body

  if (requestedFolder) {
    // Use the Search API to filter by asset_folder for specific folders
    cloudinaryUrl = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/search?max_results=500`;
    requestMethod = 'POST'; // Search API requires POST method
    requestBody = {
      expression: `asset_folder:"${requestedFolder}"`, // Use asset_folder for searching within folders
      max_results: 500,
      // Removed sort_by parameter temporarily to isolate the issue with asset_folder filtering
    };
  } else {
    // If no folder is specified, list all uploaded images using the /resources/image endpoint
    cloudinaryUrl = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=500`;
    requestMethod = 'GET'; // /resources/image endpoint uses GET method
    // For /resources/image, sorting is usually done via URL parameters if supported, but let's keep it simple for now as it's not the search API
    // and ensure no sort_by body is sent, as it's a GET request and this structure is for POST search.
  }

  try {
    console.log('Fetching from Cloudinary URL:', cloudinaryUrl);
    if (requestBody) {
      console.log('Request Body:', JSON.stringify(requestBody));
    }
    
    const response = await fetch(cloudinaryUrl, {
      method: requestMethod,
      headers: {
        'Authorization': `Basic ${btoa(env.CLOUDINARY_API_KEY + ':' + env.CLOUDINARY_API_SECRET)}`,
        'Content-Type': requestBody ? 'application/json' : undefined // Only set Content-Type for POST requests with a body
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined
    });

    const responseText = await response.text(); // Read the response body as text
    console.log('Cloudinary API Raw Response Status:', response.status);
    console.log('Cloudinary API Raw Response Body:', responseText);

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText); // Now parse it from the text
    
    // Log public_id and folder for all resources
    console.log('Cloudinary Resources:', data.resources.map(r => ({ public_id: r.public_id, folder: r.folder })));

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

    //first user
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

    //second user
    await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID_2,
        text: telegramMessage,
        parse_mode: 'MarkdownV2',
      })
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
// worker.js
export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // REMINDER: Be specific in production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { 'Allow': 'POST, OPTIONS' }
      });
    }

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
  },
};
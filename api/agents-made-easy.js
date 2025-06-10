const https = require('https');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only handle POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Extract the last message
    const messages = req.body.messages || [];
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage?.content || '';
    
    console.log('Received message:', userMessage);
    
    // Prepare the request data
    const requestData = JSON.stringify({
      message: userMessage,
      thread_id: 'agents-made-easy-' + Date.now(),
      context: {
        mode: 'agents-made-easy'
      }
    });

    // Make request to sales bot
    const options = {
      hostname: 'instabids-sales-bot-api-67gkc.ondigitalocean.app',
      path: '/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
      }
    };

    const salesBotRequest = new Promise((resolve, reject) => {
      const salesReq = https.request(options, (salesRes) => {
        let data = '';
        salesRes.on('data', (chunk) => {
          data += chunk;
        });
        salesRes.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ response: data });
          }
        });
      });

      salesReq.on('error', (error) => {
        reject(error);
      });

      salesReq.write(requestData);
      salesReq.end();
    });

    const data = await salesBotRequest;
    let responseText = data.response || data.message || "I'm having trouble connecting to our sales system.";
    
    // Enhance responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('pricing') || lowerMessage.includes('plans') || lowerMessage.includes('cost')) {
      responseText = "Let me show you our pricing plans. We have three tiers designed to meet different business needs:\n\n" + responseText;
    } else if (lowerMessage.includes('demo') || lowerMessage.includes('book') || lowerMessage.includes('meeting')) {
      responseText = "I can help you book a demo. Here are our available slots:\n\n" + responseText;
    } else if (lowerMessage.includes('implementation') || lowerMessage.includes('timeline') || lowerMessage.includes('process')) {
      responseText = "Here's our typical implementation timeline:\n\n" + responseText;
    } else if (lowerMessage.includes('roi') || lowerMessage.includes('calculator') || lowerMessage.includes('savings')) {
      responseText = "Let's calculate your potential ROI:\n\n" + responseText;
    }
    
    // Return OpenAI-compatible response
    res.json({
      id: "chatcmpl-" + Date.now(),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "gpt-3.5-turbo",
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: responseText
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({
      id: "chatcmpl-error",
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "gpt-3.5-turbo",
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: "I'm having trouble connecting to our sales system. Please try again."
        },
        finish_reason: 'stop'
      }]
    });
  }
};

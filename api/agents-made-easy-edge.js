export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Only handle POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  try {
    // Parse the incoming request
    const body = await req.json();
    
    // Extract the last message from CopilotKit
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage?.content || '';
    
    console.log('Received message:', userMessage);
    
    // Forward to your sales bot API
    const salesBotResponse = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        thread_id: 'agents-made-easy-' + Date.now(),
        context: {
          mode: 'agents-made-easy',
          full_conversation: messages
        }
      })
    });

    const data = await salesBotResponse.json();
    let responseText = data.response || data.message || "I'm having trouble connecting to our sales system.";
    
    console.log('Sales bot response:', responseText);
    
    // Enhanced response text that will trigger UI generation
    // CopilotKit will parse these patterns and trigger the corresponding actions
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
    
    // Return OpenAI-compatible response that CopilotKit expects
    const response = {
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
    };
    
    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error in agents-made-easy proxy:', error);
    
    // Return a properly formatted error response
    return new Response(JSON.stringify({
      id: "chatcmpl-error",
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "gpt-3.5-turbo",
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: "I'm having trouble connecting to our sales system. Please try again in a moment."
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}

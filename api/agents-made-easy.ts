import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";
import OpenAI from "openai";

export const config = {
  runtime: 'edge',
};

// System prompt that enhances the bot's responses to trigger UI actions
const SYSTEM_PROMPT = `You are the Instabids AI Agent Assistant integrated with a dynamic UI system. 
When users ask about:
- Pricing: Say "Let me show you our pricing plans. We have three tiers designed to meet different business needs:"
- Demo: Say "I can help you book a demo. Here are our available slots:"
- Implementation: Say "Here's our typical implementation timeline:"
- ROI: Say "Let's calculate your potential ROI:"

These exact phrases will trigger beautiful UI components to appear.`;

export default async function handler(req: Request) {
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

  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create CopilotKit runtime with remote actions for your sales bot
    const copilotKit = new CopilotRuntime({
      actions: [
        {
          name: "chat_with_sales_bot",
          description: "Chat with the InstaBids sales bot",
          parameters: [
            {
              name: "message",
              type: "string",
              description: "The message to send to the sales bot",
              required: true,
            }
          ],
          handler: async ({ message }) => {
            try {
              // Forward to your sales bot API
              const response = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  message: message,
                  thread_id: 'agents-made-easy-' + Date.now(),
                  context: {
                    mode: 'agents-made-easy'
                  }
                })
              });

              if (!response.ok) {
                throw new Error(`Sales bot API error: ${response.status}`);
              }

              const data = await response.json();
              let responseText = data.response || data.message || "I'm having trouble connecting to our sales system.";
              
              // Enhance responses to trigger UI generation
              const lowerMessage = message.toLowerCase();
              if (lowerMessage.includes('pricing') || lowerMessage.includes('plans') || lowerMessage.includes('cost')) {
                responseText = "Let me show you our pricing plans. We have three tiers designed to meet different business needs:\n\n" + responseText;
              } else if (lowerMessage.includes('demo') || lowerMessage.includes('book') || lowerMessage.includes('meeting')) {
                responseText = "I can help you book a demo. Here are our available slots:\n\n" + responseText;
              } else if (lowerMessage.includes('implementation') || lowerMessage.includes('timeline') || lowerMessage.includes('process')) {
                responseText = "Here's our typical implementation timeline:\n\n" + responseText;
              } else if (lowerMessage.includes('roi') || lowerMessage.includes('calculator') || lowerMessage.includes('savings')) {
                responseText = "Let's calculate your potential ROI:\n\n" + responseText;
              }
              
              return responseText;
            } catch (error) {
              console.error('Error calling sales bot:', error);
              return "I'm having trouble reaching our sales system. Please try again in a moment.";
            }
          }
        }
      ]
    });

    // Create service adapter
    const serviceAdapter = new OpenAIAdapter({ 
      openai,
      systemPrompt: SYSTEM_PROMPT 
    });

    // Handle the request
    const { handleRequest } = copilotKit.streamHttpServerResponse(req, serviceAdapter);

    return handleRequest({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error in CopilotKit runtime:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

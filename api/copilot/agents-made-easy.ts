import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";
import OpenAI from "openai";

// Edge runtime configuration
export const config = {
  runtime: 'edge',
};

// Initialize OpenAI - we'll use this minimally just for action coordination
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const serviceAdapter = new OpenAIAdapter({ 
  openai,
  model: "gpt-3.5-turbo", // Using the cheapest model since we're just coordinating actions
});

// Create runtime with custom action handler
const runtime = new CopilotRuntime({
  actions: [
    {
      name: "showPricingTable",
      description: "Display pricing table",
      parameters: [
        {
          name: "plans",
          type: "object[]",
          description: "Pricing plans"
        }
      ],
      handler: async ({ plans }) => {
        return "Pricing table displayed";
      }
    },
    {
      name: "showBookingCalendar", 
      description: "Show booking calendar",
      parameters: [
        {
          name: "slots",
          type: "object[]", 
          description: "Available slots"
        }
      ],
      handler: async ({ slots }) => {
        return "Calendar displayed";
      }
    },
    {
      name: "showProgressIndicator",
      description: "Show progress steps",
      parameters: [
        {
          name: "steps",
          type: "object[]",
          description: "Progress steps"
        }
      ],
      handler: async ({ steps }) => {
        return "Progress indicator displayed";
      }
    },
    {
      name: "showROICalculator",
      description: "Show ROI calculator",
      parameters: [
        {
          name: "metrics",
          type: "object",
          description: "ROI metrics"
        }
      ],
      handler: async ({ metrics }) => {
        return "ROI calculator displayed";
      }
    }
  ]
});

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    
    // Check if this is a request to execute actions
    if (body.messages?.[0]?.content?.includes('copilotkit:')) {
      // This is CopilotKit trying to execute an action, let the runtime handle it
      const response = await runtime.streamHttpServerResponse(req, serviceAdapter);
      return response;
    }
    
    // Otherwise, forward to sales bot and enhance response
    const lastMessage = body.messages?.[body.messages.length - 1];
    const userMessage = lastMessage?.content || '';
    
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
          full_conversation: body.messages
        }
      })
    });

    const data = await salesBotResponse.json();
    let responseText = data.response || data.message || "I'm having trouble connecting to our sales system.";
    
    // Enhance response with action triggers
    let enhancedResponse = responseText;
    let systemPrompt = "";
    
    if (userMessage.toLowerCase().includes('pricing') || userMessage.toLowerCase().includes('plans') || userMessage.toLowerCase().includes('cost')) {
      systemPrompt = `The user is asking about pricing. After responding, call the showPricingTable action with this data:
      {
        "plans": [
          {"name": "Starter", "price": 97, "featured": false, "features": ["1 AI Agent", "1,000 conversations/mo", "Email support", "Basic analytics"]},
          {"name": "Professional", "price": 297, "featured": true, "features": ["3 AI Agents", "10,000 conversations/mo", "Priority support", "Advanced analytics", "Custom training"]},
          {"name": "Enterprise", "price": 997, "featured": false, "features": ["Unlimited AI Agents", "Unlimited conversations", "24/7 phone support", "White-label options", "API access"]}
        ]
      }`;
    }
    
    if (userMessage.toLowerCase().includes('demo') || userMessage.toLowerCase().includes('book')) {
      systemPrompt = `The user wants to book a demo. After responding, call the showBookingCalendar action with available slots.`;
    }
    
    if (userMessage.toLowerCase().includes('implementation') || userMessage.toLowerCase().includes('timeline')) {
      systemPrompt = `The user is asking about implementation. After responding, call the showProgressIndicator action with the implementation steps.`;
    }
    
    if (userMessage.toLowerCase().includes('roi') || userMessage.toLowerCase().includes('calculator')) {
      systemPrompt = `The user wants to calculate ROI. After responding, call the showROICalculator action with sample metrics.`;
    }
    
    // Create a modified request that includes the sales bot response and action instructions
    const modifiedMessages = [
      ...body.messages.slice(0, -1),
      {
        role: "user",
        content: userMessage
      },
      {
        role: "system", 
        content: `You are a helpful assistant. The sales bot responded: "${responseText}". ${systemPrompt}`
      }
    ];
    
    // Let CopilotKit runtime process this with action awareness
    const modifiedRequest = new Request(req.url, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify({
        ...body,
        messages: modifiedMessages
      })
    });
    
    const response = await runtime.streamHttpServerResponse(modifiedRequest, serviceAdapter);
    return response;
    
  } catch (error) {
    console.error('Error in agents-made-easy:', error);
    return new Response(JSON.stringify({
      error: "Internal server error",
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

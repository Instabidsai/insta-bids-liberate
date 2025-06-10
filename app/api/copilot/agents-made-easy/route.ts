import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";
import { NextRequest } from "next/server";

// Create a new CopilotBackend instance
const copilotKit = new CopilotBackend({
  actions: [
    {
      name: "showPricingTable",
      description: "Display an interactive pricing table with different plans",
      parameters: [
        {
          name: "plans",
          type: "object[]",
          description: "Array of pricing plans with name, price, and features array",
          required: true
        }
      ],
      handler: async ({ plans }) => {
        return "Pricing table displayed successfully";
      }
    },
    {
      name: "showBookingCalendar",
      description: "Show a calendar for booking demos or consultations",
      parameters: [
        {
          name: "slots",
          type: "object[]",
          description: "Available time slots with date and time properties",
          required: true
        }
      ],
      handler: async ({ slots }) => {
        return "Calendar displayed with available slots";
      }
    },
    {
      name: "showProgressIndicator",
      description: "Display implementation progress steps",
      parameters: [
        {
          name: "steps",
          type: "object[]",
          description: "Implementation steps with name, description, and completed boolean",
          required: true
        }
      ],
      handler: async ({ steps }) => {
        return "Progress indicator displayed";
      }
    },
    {
      name: "showROICalculator",
      description: "Display an ROI calculator",
      parameters: [
        {
          name: "metrics",
          type: "object",
          description: "Business metrics with hoursPerWeek, hourlyRate, and cost",
          required: true
        }
      ],
      handler: async ({ metrics }) => {
        return "ROI calculator displayed";
      }
    }
  ]
});

// Custom adapter that forwards messages to your sales bot
const salesBotAdapter = new OpenAIAdapter({
  openai: {
    // This is a mock - we'll override the completion method
    apiKey: "not-needed"
  }
});

// Override the completion method to call your sales bot
salesBotAdapter.complete = async (messages: any[]) => {
  const lastMessage = messages[messages.length - 1];
  
  if (lastMessage && lastMessage.role === 'user') {
    try {
      const response = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: lastMessage.content,
          thread_id: 'default'
        })
      });

      if (!response.ok) {
        throw new Error(`Sales bot returned ${response.status}`);
      }

      const data = await response.json();
      
      return {
        choices: [{
          message: {
            role: 'assistant',
            content: data.response || data.message || "I can help you implement AI agents for your business. Ask me about pricing, demos, or ROI!"
          },
          finish_reason: 'stop'
        }]
      };
    } catch (error) {
      console.error('Sales bot error:', error);
      return {
        choices: [{
          message: {
            role: 'assistant',
            content: "I'm having trouble connecting to our sales system. Please try again or contact support@instabids.ai"
          },
          finish_reason: 'stop'
        }]
      };
    }
  }
  
  return {
    choices: [{
      message: {
        role: 'assistant',
        content: "Hi! I'm your AI sales assistant. I can show you pricing, book demos, and calculate ROI. What would you like to see?"
      },
      finish_reason: 'stop'
    }]
  };
};

export async function POST(req: NextRequest) {
  const { handleRequest } = copilotKit;
  
  return handleRequest({
    req,
    adapter: salesBotAdapter,
    endpoint: "/api/copilot/agents-made-easy"
  });
}
import { CopilotBackend, LangChainAdapter } from "@copilot/runtime";
import { NextRequest } from "next/server";

// Simple API route that connects to your real sales bot
export async function POST(req: NextRequest) {
  const copilotKit = new CopilotBackend({
    actions: [
      {
        name: "showPricingTable",
        description: "Display an interactive pricing table with different plans",
        parameters: [
          {
            name: "plans",
            type: "object[]",
            description: "Array of pricing plans with name, price, and features array"
          }
        ],
        handler: async ({ plans }) => {
          return "Pricing table displayed";
        }
      },
      {
        name: "showBookingCalendar",
        description: "Show a calendar for booking demos or consultations",
        parameters: [
          {
            name: "slots",
            type: "object[]",
            description: "Available time slots with date and time properties"
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
            description: "Implementation steps with name, description, and completed boolean"
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
            description: "Business metrics with hoursPerWeek, hourlyRate, and cost"
          }
        ],
        handler: async ({ metrics }) => {
          return "ROI calculator displayed";
        }
      }
    ]
  });

  // Get the request body
  const body = await req.json();
  
  try {
    // Forward the last message to your sales bot
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage && lastMessage.role === 'user') {
      // Call your real sales bot API
      const salesBotResponse = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: lastMessage.content,
          thread_id: body.threadId || 'default'
        })
      });

      if (!salesBotResponse.ok) {
        throw new Error(`Sales bot returned ${salesBotResponse.status}`);
      }

      const salesBotData = await salesBotResponse.json();
      
      // Return the response in CopilotKit format
      return copilotKit.response(req, {
        messages: [
          ...messages,
          {
            role: 'assistant',
            content: salesBotData.response || salesBotData.message || "I'm here to help you implement AI agents for your business."
          }
        ]
      });
    }
    
    // Default response if no user message
    return copilotKit.response(req, {
      messages: [
        {
          role: 'assistant',
          content: "Hi! I'm your AI sales assistant. I can show you pricing, book demos, and calculate ROI. What would you like to see?"
        }
      ]
    });
    
  } catch (error) {
    console.error('Error in copilot route:', error);
    
    return copilotKit.response(req, {
      messages: [
        {
          role: 'assistant',
          content: "I'm having trouble connecting to our sales system. Please try again in a moment or contact support@instabids.ai"
        }
      ]
    });
  }
}
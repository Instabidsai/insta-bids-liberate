import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";
import { NextRequest } from "next/server";

const copilotKit = new CopilotRuntime({
  actions: [
    {
      name: "showPricingTable",
      description: "Display an interactive pricing table",
      parameters: [
        {
          name: "plans",
          type: "object[]",
          description: "Array of pricing plans"
        }
      ],
      handler: async ({ plans }) => {
        return {
          display: {
            type: "pricing-table",
            data: plans
          }
        };
      }
    },
    {
      name: "showBookingCalendar",
      description: "Show a calendar for booking demos or consultations",
      parameters: [
        {
          name: "availableSlots",
          type: "object[]",
          description: "Available time slots"
        }
      ],
      handler: async ({ availableSlots }) => {
        return {
          display: {
            type: "booking-calendar",
            data: availableSlots
          }
        };
      }
    },
    {
      name: "showProgressIndicator",
      description: "Display implementation progress",
      parameters: [
        {
          name: "steps",
          type: "object[]",
          description: "Implementation steps with status"
        }
      ],
      handler: async ({ steps }) => {
        return {
          display: {
            type: "progress-indicator",
            data: steps
          }
        };
      }
    },
    {
      name: "showROICalculator",
      description: "Display an ROI calculator",
      parameters: [
        {
          name: "metrics",
          type: "object",
          description: "Business metrics for calculation"
        }
      ],
      handler: async ({ metrics }) => {
        return {
          display: {
            type: "roi-calculator",
            data: metrics
          }
        };
      }
    }
  ]
});

// Custom adapter to forward messages to your sales bot API
class SalesBotAdapter extends OpenAIAdapter {
  async chat(request: any) {
    // Forward to your actual sales bot
    const response = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.messages[request.messages.length - 1].content,
        thread_id: request.threadId || 'default'
      })
    });

    const data = await response.json();
    
    // Transform the response to OpenAI format
    return {
      choices: [{
        message: {
          role: 'assistant',
          content: data.response
        }
      }]
    };
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const { handleRequest } = copilotKit;
  
  return handleRequest({
    req,
    adapter: new SalesBotAdapter()
  });
}
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/backend";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const copilotKit = new CopilotRuntime({
    actions: [
      {
        name: "showPricingTable",
        description: "Display an interactive pricing table",
        parameters: [
          {
            name: "plans",
            type: "object[]",
            description: "Array of pricing plans with name, price, and features"
          }
        ],
        handler: async ({ plans }) => {
          return { plans };
        }
      },
      {
        name: "showBookingCalendar",
        description: "Show a calendar for booking demos",
        parameters: [
          {
            name: "slots",
            type: "object[]",
            description: "Available time slots with date and time"
          }
        ],
        handler: async ({ slots }) => {
          return { slots };
        }
      },
      {
        name: "showProgressIndicator",
        description: "Display implementation progress",
        parameters: [
          {
            name: "steps",
            type: "object[]",
            description: "Implementation steps with name, description, and completed status"
          }
        ],
        handler: async ({ steps }) => {
          return { steps };
        }
      },
      {
        name: "showROICalculator",
        description: "Display an ROI calculator",
        parameters: [
          {
            name: "metrics",
            type: "object",
            description: "Business metrics including hoursPerWeek, hourlyRate, and cost"
          }
        ],
        handler: async ({ metrics }) => {
          return { metrics };
        }
      }
    ]
  });

  const openaiAdapter = new OpenAIAdapter({
    model: "gpt-4",
  });

  // Forward the request to the sales bot and enhance with CopilotKit actions
  const forwardToSalesBot = async (messages: any[]) => {
    try {
      const response = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messages[messages.length - 1]?.content || '',
          thread_id: 'web-' + Date.now()
        })
      });

      const data = await response.json();
      return data.response || data.message || "I'm having trouble connecting to our sales system.";
    } catch (error) {
      console.error('Error connecting to sales bot:', error);
      return "I'm having trouble connecting to our sales system. Please try again.";
    }
  };

  return copilotKit.response(req, {
    adapter: openaiAdapter,
    onMessage: async (messages) => {
      const salesBotResponse = await forwardToSalesBot(messages);
      return {
        role: "assistant",
        content: salesBotResponse
      };
    }
  });
}

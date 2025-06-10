export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Extract the request body
  const body = await req.json();
  
  try {
    // Forward to your sales bot API
    const response = await fetch('https://instabids-sales-bot-api-67gkc.ondigitalocean.app/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.messages?.[body.messages.length - 1]?.content || '',
        thread_id: 'agents-made-easy-' + Date.now(),
        context: {
          mode: 'agents-made-easy',
          full_conversation: body.messages
        }
      })
    });

    const data = await response.json();
    const responseText = data.response || data.message || "I'm having trouble connecting to our sales system.";
    
    // Pattern matching for UI generation
    const actions = [];
    
    if (responseText.toLowerCase().includes('pricing') || responseText.toLowerCase().includes('plans')) {
      actions.push({
        name: "showPricingTable",
        args: {
          plans: [
            {
              name: "Starter",
              price: 97,
              featured: false,
              features: ["1 AI Agent", "1,000 conversations/mo", "Email support", "Basic analytics"]
            },
            {
              name: "Professional",
              price: 297,
              featured: true,
              features: ["3 AI Agents", "10,000 conversations/mo", "Priority support", "Advanced analytics", "Custom training"]
            },
            {
              name: "Enterprise",
              price: 997,
              featured: false,
              features: ["Unlimited AI Agents", "Unlimited conversations", "24/7 phone support", "White-label options", "API access"]
            }
          ]
        }
      });
    }
    
    if (responseText.toLowerCase().includes('demo') || responseText.toLowerCase().includes('book')) {
      actions.push({
        name: "showBookingCalendar",
        args: {
          slots: [
            { date: "Tomorrow", time: "10:00 AM" },
            { date: "Tomorrow", time: "2:00 PM" },
            { date: "Thursday", time: "11:00 AM" },
            { date: "Thursday", time: "3:00 PM" },
            { date: "Friday", time: "9:00 AM" },
            { date: "Friday", time: "1:00 PM" }
          ]
        }
      });
    }
    
    if (responseText.toLowerCase().includes('implementation') || responseText.toLowerCase().includes('timeline')) {
      actions.push({
        name: "showProgressIndicator",
        args: {
          steps: [
            { name: "Discovery Call", description: "Understand your business needs", completed: true },
            { name: "AI Agent Design", description: "Custom agent configuration", completed: false },
            { name: "Training & Setup", description: "Train on your data", completed: false },
            { name: "Go Live", description: "Deploy to production", completed: false }
          ]
        }
      });
    }
    
    if (responseText.toLowerCase().includes('roi') || responseText.toLowerCase().includes('calculator')) {
      actions.push({
        name: "showROICalculator",
        args: {
          metrics: {
            hoursPerWeek: 20,
            hourlyRate: 50,
            cost: 297
          }
        }
      });
    }
    
    // Return CopilotKit-compatible response
    return new Response(JSON.stringify({
      choices: [{
        message: {
          role: 'assistant',
          content: responseText
        },
        finish_reason: 'stop'
      }],
      copilotkit: {
        actions: actions
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in agents-made-easy proxy:', error);
    return new Response(JSON.stringify({
      choices: [{
        message: {
          role: 'assistant',
          content: "I'm having trouble connecting to our sales system. Please try again."
        },
        finish_reason: 'stop'
      }]
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

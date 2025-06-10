import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const lastMessage = messages[messages.length - 1];
    
    // If this is a user message, forward to sales bot
    if (lastMessage && lastMessage.role === 'user') {
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
        throw new Error(`Sales bot error: ${salesBotResponse.status}`);
      }

      const salesBotData = await salesBotResponse.json();
      
      // Check if response contains action triggers
      const response = salesBotData.response || salesBotData.message || "";
      let actions = [];
      
      // Simple pattern matching for UI generation
      if (response.toLowerCase().includes('pricing') || response.toLowerCase().includes('plans')) {
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
      
      if (response.toLowerCase().includes('demo') || response.toLowerCase().includes('book')) {
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
      
      if (response.toLowerCase().includes('implementation') || response.toLowerCase().includes('timeline')) {
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
      
      if (response.toLowerCase().includes('roi') || response.toLowerCase().includes('calculator')) {
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
      return NextResponse.json({
        choices: [{
          message: {
            role: 'assistant',
            content: response
          },
          finish_reason: 'stop'
        }],
        actions: actions
      });
    }
    
    // Initial message
    return NextResponse.json({
      choices: [{
        message: {
          role: 'assistant',
          content: "Hi! I'm your AI sales assistant. I can show you pricing, book demos, and calculate ROI. What would you like to see?"
        },
        finish_reason: 'stop'
      }]
    });
    
  } catch (error) {
    console.error('Error in copilot route:', error);
    
    return NextResponse.json({
      choices: [{
        message: {
          role: 'assistant',
          content: "I'm having trouble connecting to our sales system. Please try again or contact support@instabids.ai"
        },
        finish_reason: 'stop'
      }]
    });
  }
}

// Also handle GET for health checks
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
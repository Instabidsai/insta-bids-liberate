import { CopilotKit, useCopilotAction, useCopilotChat } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, Calculator, TrendingUp } from "lucide-react";

// Pricing Table Component
function PricingTable({ plans }: { plans: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-3 gap-6 p-6"
    >
      {plans.map((plan, index) => (
        <div 
          key={index}
          className={`bg-white rounded-xl p-6 shadow-lg ${plan.featured ? 'ring-2 ring-purple-600' : ''}`}
        >
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <p className="text-4xl font-bold mb-4">${plan.price}<span className="text-sm">/mo</span></p>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
            Get Started
          </button>
        </div>
      ))}
    </motion.div>
  );
}

// Booking Calendar Component
function BookingCalendar({ slots }: { slots: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <Calendar className="mr-2" /> Book Your Demo
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {slots.map((slot, index) => (
          <button
            key={index}
            className="p-3 border rounded-lg hover:bg-purple-100 transition-colors"
          >
            <p className="font-semibold">{slot.date}</p>
            <p className="text-sm text-gray-600">{slot.time}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Progress Indicator Component
function ProgressIndicator({ steps }: { steps: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-6">Implementation Process</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
              step.completed ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {step.completed && <Check className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{step.name}</p>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ROI Calculator Component
function ROICalculator({ metrics }: { metrics: any }) {
  const savings = metrics.hoursPerWeek * metrics.hourlyRate * 52;
  const roi = ((savings - metrics.cost) / metrics.cost * 100).toFixed(0);
  
  return (
    <motion.div 
      initial={{ opacity: 0, rotate: -5 }}
      animate={{ opacity: 1, rotate: 0 }}
      className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <Calculator className="mr-2" /> ROI Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm opacity-90">Hours Saved Per Week</p>
          <p className="text-3xl font-bold">{metrics.hoursPerWeek}</p>
        </div>
        <div>
          <p className="text-sm opacity-90">Annual Savings</p>
          <p className="text-3xl font-bold">${savings.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm opacity-90">ROI</p>
          <p className="text-4xl font-bold flex items-center">
            <TrendingUp className="mr-2" /> {roi}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Main Component with Generative UI
function AgentsMadeEasyContent() {
  const [dynamicComponents, setDynamicComponents] = useState<any[]>([]);
  
  // Get the chat messages to analyze for UI triggers
  const { messages } = useCopilotChat();
  
  // Register action handlers for dynamic UI generation
  const showPricingTable = useCopilotAction({
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
      setDynamicComponents(prev => [...prev, { type: 'pricing', data: plans }]);
      return "I've displayed our pricing plans for you. Each plan is designed for different business needs.";
    }
  });

  const showBookingCalendar = useCopilotAction({
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
      setDynamicComponents(prev => [...prev, { type: 'calendar', data: slots }]);
      return "I've shown available demo slots. Click any time that works for you!";
    }
  });

  const showProgressIndicator = useCopilotAction({
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
      setDynamicComponents(prev => [...prev, { type: 'progress', data: steps }]);
      return "Here's the typical implementation timeline. Most businesses complete setup within a week!";
    }
  });

  const showROICalculator = useCopilotAction({
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
      setDynamicComponents(prev => [...prev, { type: 'roi', data: metrics }]);
      return "Based on your inputs, here's your projected ROI. Most clients see positive returns within 30 days!";
    }
  });

  // Analyze messages for UI triggers
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        const content = lastMessage.content.toLowerCase();
        
        // Check for pricing triggers
        if (content.includes('pricing plans') || content.includes('let me show you our pricing')) {
          showPricingTable.handler({
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
          });
        }
        
        // Check for demo booking triggers
        if (content.includes('book a demo') || content.includes('available slots')) {
          showBookingCalendar.handler({
            slots: [
              { date: "Tomorrow", time: "10:00 AM" },
              { date: "Tomorrow", time: "2:00 PM" },
              { date: "Thursday", time: "11:00 AM" },
              { date: "Thursday", time: "3:00 PM" },
              { date: "Friday", time: "9:00 AM" },
              { date: "Friday", time: "1:00 PM" }
            ]
          });
        }
        
        // Check for implementation timeline triggers
        if (content.includes('implementation timeline') || content.includes('typical implementation')) {
          showProgressIndicator.handler({
            steps: [
              { name: "Discovery Call", description: "Understand your business needs", completed: true },
              { name: "AI Agent Design", description: "Custom agent configuration", completed: false },
              { name: "Training & Setup", description: "Train on your data", completed: false },
              { name: "Go Live", description: "Deploy to production", completed: false }
            ]
          });
        }
        
        // Check for ROI calculator triggers
        if (content.includes('calculate your') || content.includes('potential roi')) {
          showROICalculator.handler({
            metrics: {
              hoursPerWeek: 20,
              hourlyRate: 50,
              cost: 297
            }
          });
        }
      }
    }
  }, [messages]);

  return (
    <div className="flex h-screen">
      {/* Dynamic Components Panel */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Instabids AI Agents - Live Demo
        </h1>
        
        <AnimatePresence>
          {dynamicComponents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 mt-20"
            >
              <p className="text-xl mb-4">Ask me to show you:</p>
              <ul className="space-y-2">
                <li>• Pricing plans for your business size</li>
                <li>• Available demo slots</li>
                <li>• Implementation timeline</li>
                <li>• ROI calculator for your use case</li>
              </ul>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {dynamicComponents.map((component, index) => (
                <div key={index}>
                  {component.type === 'pricing' && <PricingTable plans={component.data} />}
                  {component.type === 'calendar' && <BookingCalendar slots={component.data} />}
                  {component.type === 'progress' && <ProgressIndicator steps={component.data} />}
                  {component.type === 'roi' && <ROICalculator metrics={component.data} />}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Chat Panel */}
      <div className="w-96 border-l">
        <CopilotChat
          instructions={`You are the Instabids AI Agent Assistant. When users ask about:
          - Pricing: Say "Let me show you our pricing plans..."
          - Demo: Say "I can help you book a demo. Here are our available slots..."
          - Implementation: Say "Here's our typical implementation timeline..."
          - ROI: Say "Let's calculate your potential ROI..."
          
          Always use these exact phrases to trigger the UI components.`}
          labels={{
            title: "AI Sales Assistant",
            initial: "Hi! I'm your AI sales assistant. I can show you pricing, book demos, and calculate ROI. What would you like to see?"
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}

export default function AgentsMadeEasy() {
  // Use the API endpoint at root level for Vercel
  const apiUrl = '/api/agents-made-easy';
  
  return (
    <CopilotKit runtimeUrl={apiUrl}>
      <AgentsMadeEasyContent />
    </CopilotKit>
  );
}

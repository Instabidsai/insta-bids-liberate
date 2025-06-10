import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy CopilotKit API requests to the sales bot
      '/api/agents-made-easy': {
        target: 'https://instabids-sales-bot-api-67gkc.ondigitalocean.app',
        changeOrigin: true,
        rewrite: (path) => '/chat',
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Ensure proper content type
            proxyReq.setHeader('Content-Type', 'application/json');
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Transform the response to CopilotKit format
            let body = '';
            proxyRes.on('data', (chunk) => {
              body += chunk;
            });
            proxyRes.on('end', () => {
              try {
                const data = JSON.parse(body);
                const response = data.response || data.message || "";
                
                // Pattern matching for UI generation
                let actions = [];
                
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
                
                // Send CopilotKit-compatible response
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  choices: [{
                    message: {
                      role: 'assistant',
                      content: response
                    },
                    finish_reason: 'stop'
                  }],
                  actions: actions
                }));
              } catch (error) {
                console.error('Error processing response:', error);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  choices: [{
                    message: {
                      role: 'assistant',
                      content: "I'm having trouble connecting to our sales system. Please try again."
                    },
                    finish_reason: 'stop'
                  }]
                }));
              }
            });
          });
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

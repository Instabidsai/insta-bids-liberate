import React, { useState } from 'react';

// Use your existing agent backend
const AGENT_API_URL = import.meta.env.VITE_SALES_BOT_API_URL || 'https://instabids-sales-bot-api-67gkc.ondigitalocean.app';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AgentsMadeEasy: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<any>({});
  const [painPoints, setPainPoints] = useState<any[]>([]);
  const [proposedSystem, setProposedSystem] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI transformation consultant. Let's design a custom AI agent system for your business. What industry are you in?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${AGENT_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          thread_id: 'agents-made-easy-' + Date.now(),
          context: {
            mode: 'agents-made-easy',
            conversation: messages,
            businessInfo,
            painPoints,
            proposedSystem
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Agent API responded with ${response.status}`);
      }

      const data = await response.json();
      
      // Process any actions from the response
      if (data.actions) {
        data.actions.forEach((action: any) => {
          switch (action.type) {
            case 'updateBusinessInfo':
              setBusinessInfo(prev => ({ ...prev, ...action.data }));
              break;
            case 'addPainPoint':
              setPainPoints(prev => [...prev, action.data]);
              break;
            case 'proposeAgentSystem':
              setProposedSystem(action.data);
              break;
          }
        });
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to the AI service. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Instabids: Agents Made Easy
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Transform your business with custom AI agent systems. 
            We'll discover your pain points and design the perfect AI automation strategy.
          </p>
          
          {!showChat && (
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-lg transition-colors duration-200 flex items-center mx-auto"
              onClick={() => setShowChat(true)}
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Start Your AI Transformation Journey
            </button>
          )}
        </div>

        {/* Main Content Area */}
        {showChat && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Dynamic Discovery Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Business Overview */}
                {Object.keys(businessInfo).length > 0 && (
                  <div className="p-6 bg-white/10 backdrop-blur-md border border-purple-500/20 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Business Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(businessInfo).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-purple-300 text-sm capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="text-white font-medium">{value as string}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pain Points */}
                {painPoints.length > 0 && (
                  <div className="p-6 bg-white/10 backdrop-blur-md border border-purple-500/20 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Discovered Opportunities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {painPoints.map((point, idx) => (
                        <div 
                          key={idx}
                          className="p-4 bg-purple-500/20 rounded-lg transform transition-all duration-300 hover:scale-105"
                        >
                          <h4 className="font-semibold text-purple-200">{point.title}</h4>
                          <p className="text-purple-100 text-sm mt-1">{point.description}</p>
                          <div className="mt-2 flex items-center text-xs text-purple-300">
                            <span className="px-2 py-1 bg-purple-600/30 rounded">
                              Impact: {point.impact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proposed System */}
                {proposedSystem && (
                  <div className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-500/30 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Your Custom AI Agent System
                    </h3>
                    <div className="space-y-4">
                      {proposedSystem.agents?.map((agent: any, idx: number) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <h4 className="font-semibold text-purple-200">{agent.name}</h4>
                            <p className="text-gray-300 text-sm">{agent.purpose}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {proposedSystem.expectedImpact && (
                      <div className="mt-6 p-4 bg-blue-500/20 rounded-lg">
                        <p className="text-blue-200 font-semibold">Expected Impact:</p>
                        <p className="text-white">{proposedSystem.expectedImpact}</p>
                      </div>
                    )}
                    {proposedSystem.investment && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <p className="text-green-300 text-sm">Investment</p>
                          <p className="text-white font-bold text-lg">{proposedSystem.investment}</p>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <p className="text-green-300 text-sm">ROI Timeline</p>
                          <p className="text-white font-bold text-lg">{proposedSystem.roiTimeline || '3-6 months'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side - Chat Interface */}
              <div className="lg:sticky lg:top-8">
                <div className="bg-white/95 backdrop-blur-md overflow-hidden rounded-xl shadow-2xl">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
                    <h3 className="text-white font-semibold">AI Transformation Consultant</h3>
                  </div>
                  
                  <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        disabled={isLoading}
                      />
                      <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                {proposedSystem && (
                  <div className="mt-6">
                    <button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-semibold transition-all duration-200"
                      onClick={() => window.location.href = 'https://calendly.com/instabids/ai-transformation'}
                    >
                      Schedule Implementation Call
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsMadeEasy;
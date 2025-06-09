import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SalesBot() {
  const [threadId, setThreadId] = useState<string>("");

  useEffect(() => {
    // Get or create thread ID from localStorage
    const storedThreadId = localStorage.getItem("instabids-thread-id");
    if (storedThreadId) {
      setThreadId(storedThreadId);
    } else {
      const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("instabids-thread-id", newThreadId);
      setThreadId(newThreadId);
    }
  }, []);

  // For now, using the demo runtime URL - you'll need to update this
  const RUNTIME_URL = process.env.VITE_COPILOT_RUNTIME_URL || "https://api.instabids.com/copilot/sales-bot";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/sales-bot" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="font-semibold text-gray-900">InstaBids Sales Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  localStorage.removeItem("instabids-thread-id");
                  window.location.reload();
                }}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                New Conversation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="pt-16 h-screen">
        {threadId && (
          <CopilotKit runtimeUrl={RUNTIME_URL}>
            <div className="h-full max-w-5xl mx-auto px-4 py-6">
              <div className="h-full bg-white rounded-lg shadow-xl overflow-hidden">
                <CopilotChat
                  className="h-full"
                  instructions={`You are the InstaBids Sales Assistant, helping homeowners with their home improvement projects. 
                  Current thread: ${threadId}
                  
                  Guide users through these stages:
                  1. Understanding - Learn about their project
                  2. MVP Identification - Identify core needs
                  3. Scoping - Detail requirements
                  4. Proposal - Present pricing
                  5. Closed - Finalize deal
                  
                  Be friendly, professional, and focus on understanding their needs.`}
                  labels={{
                    title: "InstaBids Sales Assistant",
                    initial: "Hi! I'm here to help you with your home improvement project. What are you looking to get done?",
                  }}
                />
              </div>
            </div>
          </CopilotKit>
        )}
      </main>
    </div>
  );
}
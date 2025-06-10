'use client';

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function AgentsMadeEasy() {
  return (
    <CopilotKit runtimeUrl="/api/copilot/agents-made-easy">
      <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
        <CopilotChat
          instructions={`You are the Instabids AI Agent Assistant. You help businesses implement AI agents quickly.
          
          IMPORTANT: You can create dynamic UI components! When appropriate, instead of just describing things, create:
          - Interactive pricing tables with useCopilotAction
          - Booking calendars for demos
          - Progress indicators showing implementation steps
          - Forms for collecting business information
          - Comparison charts
          - ROI calculators
          
          Always prefer showing interactive UI over describing in text.`}
          labels={{
            title: "Instabids AI Agent Assistant",
            initial: "Welcome! I can help you implement AI agents for your business. I can show you pricing, book demos, and create custom solutions. How can I help transform your business today?"
          }}
          className="h-full"
        />
      </div>
    </CopilotKit>
  );
}
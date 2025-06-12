import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, RefreshCw, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SalesBot = () => {
  const navigate = useNavigate();
  const [threadId, setThreadId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SALES_BOT_API = import.meta.env.VITE_SALES_BOT_API_URL || "https://instabids-sales-bot-api-67gkc.ondigitalocean.app";

  // Generate or retrieve thread ID
  useEffect(() => {
    const storedThreadId = localStorage.getItem("salesbot-thread-id");

    const initialMessage: Message = {
      role: "assistant",
      content: "Hi! I'm here to help you get started with InstaBids. What kind of home improvement project are you planning?",
    };

    if (storedThreadId) {
      setThreadId(storedThreadId);
      const storedMessages = localStorage.getItem(`salesbot-messages-${storedThreadId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([initialMessage]);
      }
    } else {
      const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("salesbot-thread-id", newThreadId);
      setThreadId(newThreadId);
      setMessages([initialMessage]);
    }
  }, []);


  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (threadId && messages.length > 0) {
      localStorage.setItem(`salesbot-messages-${threadId}`, JSON.stringify(messages));
    }
  }, [messages, threadId]);

  const handleNewConversation = () => {
    const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("salesbot-thread-id", newThreadId);
    setThreadId(newThreadId);
    setMessages([{
      role: "assistant",
      content: "Hi! I'm here to help you get started with InstaBids. What kind of home improvement project are you planning?"
    }]);
    setInputValue("");
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch(`${SALES_BOT_API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          message: userMessage,
          thread_id: threadId,
        }),
      });

      if (!response.ok) {
        console.error("API Error:", response.status, response.statusText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.response || data.message || data.content || "I'm sorry, I couldn't process that request.";

      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble connecting to the sales bot API. This might be a CORS issue. Please check the console for details." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-semibold">Sales Assistant</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewConversation}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            New Conversation
          </Button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto max-w-4xl p-4">
        <div className="h-[calc(100vh-120px)] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBot;

"use client";
import { Button } from "@/components/common/button";
import { Textarea } from "@/components/common/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

const ChatMessage = {
  id: "1",
  content:
    "Hello! I'm your AI tutor. Upload your notes and ask me any questions about your study materials.",
  isUser: false,
  timestamp: new Date(),
};

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([ChatMessage]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Frontend logic: Add user message to chat
    // Backend integration needed: Send message to AI service
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-100 to-indigo-100">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-gray-800">Study Chat</h2>
        <p className="text-sm text-gray-600">
          Ask questions about your uploaded materials
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.isUser
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {/* <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString()}
              </span> */}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-300 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="flex items-center space-x-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about your study materials..."
            className="flex-2 min-h-[40px] max-h-[120px] resize-none"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

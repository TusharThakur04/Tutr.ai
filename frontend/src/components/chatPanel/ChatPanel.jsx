"use client";
import { Button } from "@/components/common/button";
import { Textarea } from "@/components/common/textarea";
import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ThinkingBubble from "../common/loading";

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setThinking] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, message]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessage("");
    setThinking(true);

    const newMessage = {
      content: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    // setMessages((prev) => [...prev, newMessage]);

    // Backend call to process the message
    const sendMessage = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        message: userMessage,
      }
    );
    // console.log("Response from backend:", sendMessage.data.answer);
    setThinking(false);
    setMessages((prev) => [
      ...prev,
      {
        content: sendMessage.data.answer,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
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
      <div className="flex-1 min-h-186 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 && (
          <>
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col justify-start">
                <div
                  className={`min-w-[30%] max-w-[100%] rounded-2xl px-4 py-3 ${
                    msg.isUser
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-2xl font-semibold mb-2"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-semibold mb-2" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-medium mb-1" {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 className="text-base font-medium mb-1" {...props} />
                      ),
                      h5: ({ node, ...props }) => (
                        <h5 className="text-sm font-medium mb-1" {...props} />
                      ),
                      h6: ({ node, ...props }) => (
                        <h6
                          className="text-xs font-medium mb-1 uppercase"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal list-inside ml-4"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside ml-4" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="my-1" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-blue-500 underline" {...props} />
                      ),
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }) =>
                        inline ? (
                          <code
                            className="bg-gray-300 px-1 py-0.5 rounded text-sm"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-300 p-2 rounded overflow-x-auto text-sm">
                            <code {...props}>{children}</code>
                          </pre>
                        ),
                    }}
                  >
                    {msg.content}
                  </Markdown>
                </div>
              </div>
            ))}
          </>
        )}

        {isThinking && <ThinkingBubble setMessage={setMessage} />}
        <div ref={bottomRef} />
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

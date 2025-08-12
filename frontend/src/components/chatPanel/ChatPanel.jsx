"use client";
import { Button } from "@/components/common/button";
import { Textarea } from "@/components/common/textarea";
import axios from "axios";
import { Send } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessage = {
  id: "1",
  content: `

### Stages of Persecution in Germany
The notes outline a clear progression of how Jews were treated under Nazi rule, divided into specific phases:

1. **1933–1938: Exclusion, Terror, and Forced Emigration**
   - Jews were systematically terrorized, pauperized (made poor), and segregated. This included economic boycotts, restrictions on their rights, and efforts to compel them to leave Germany.
   - Key laws and measures included the Nuremberg Laws of 1935, which stripped Jews of their citizenship and basic rights. Specifically:
     - Only people of "German or related blood" could be citizens.
     - Marriages and extramarital relations between Jews and Germans were forbidden, making such relationships criminal offenses.
     - Jews were prohibited from flying the national flag or participating in many aspects of public life.
   - Other actions involved boycotting Jewish businesses and enforcing segregation, as shown in examples like signs declaring areas "free of Jews" or park benches labeled "for Aryans only." This created a climate of humiliation, poverty, and isolation, where Jews were treated as outsiders with "no right to live among us as citizens."

2. **1939–1945: Concentration and Extermination (Extending Beyond Germany)**
   - While the initial focus was in Germany, the notes describe how the persecution intensified during World War II. Jews were concentrated in certain areas, often in ghettos located in occupied territories like Poland. Before entering these ghettos, Jews had to surrender all their wealth, leaving them with nothing.
   - Conditions in the ghettos were horrific, marked by extreme misery, poverty, hunger, starvation, and disease due to overcrowding, deprivation, and poor hygiene. Many Jews died from these conditions.
   - The ultimate goal was extermination, with the notes mentioning that Jews were killed in gas chambers in Poland as part of the Nazi plan for "total elimination." Although this phase occurred outside Germany's pre-war borders, it was an extension of Nazi policies originating in Germany.

### Overall Condition and Suffering
Throughout the Nazi era, Jews were the worst sufferers among all groups targeted by the regime. They were classified as racial inferiors who threatened the "biological purity" of the Aryan race, leading to widespread persecution. The notes emphasize that Jews faced not just discrimination but a deliberate campaign of dehumanization, including loss of property, rights, and lives. By the end of the period, the Nazi goal was a "racial utopia" achieved through genocide, where Jews were seen as having no place in society.

This summary is based entirely on the context you provided. If you'd like more details or clarification on any part, or if you have additional questions, feel free to ask! If thi


`,
  isUser: false,
  timestamp: new Date(),
};

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([ChatMessage]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessage("");

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
    console.log("Response from backend:", sendMessage.data.answer);
    console.log("Raw answer:", typeof sendMessage.data.answer);
    const rawAnswer = sendMessage.data.answer;

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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex justify-start">
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
                    <h1 className="text-2xl font-semibold mb-2" {...props} />
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
                    <ol className="list-decimal list-inside ml-4" {...props} />
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
                  code: ({ node, inline, className, children, ...props }) =>
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

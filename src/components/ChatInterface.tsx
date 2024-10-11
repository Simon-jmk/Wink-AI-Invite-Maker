"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatMessage from "./ChatMessage";

interface ChatInterfaceProps {
  initialData: { location: string; date: string; startTime: string; endTime: string; theme: string };
  closeChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialData,
  closeChat,
}) => {
  const [messages, setMessages] = useState<
    { id: number; text: string; type: "user" | "bot" }[]
  >([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: inputValue, type: "user" },
        {
          id: prevMessages.length + 2,
          text: `AI response to: ${inputValue}`,
          type: "bot",
        }, // Placeholder AI response
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Chat with AI</h2>
        <button onClick={closeChat}>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
        </button>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            text={message.text}
            type={message.type}
          />
        ))}
      </div>
      <div className="p-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

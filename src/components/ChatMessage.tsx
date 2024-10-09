"use client";

import React from "react";
import { Card } from "./ui/card";


interface ChatMessageProps {
  text: string;
  type: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, type }) => {
  const isUser = type === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <Card
        className={`p-2 max-w-xs ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {text}
      </Card>
    </div>
  );
};

export default ChatMessage;

"use client";

import React, { useState } from "react";
import ChatInterface from "./ChatInterface";
import EventPreview from "./EventPreview";

const ChatAndEventPreview: React.FC = () => {
  const [prompts, setPrompts] = useState<string[]>([]); // State to hold prompts

  // Function to handle new prompts from ChatInterface
  const handleNewPrompt = (newPrompt: string) => {
    setPrompts((prevPrompts) => [...prevPrompts, newPrompt]); // Add new prompt to the list
  };

  const initialData = {
    name: "Autumn Festival",
    title: "Autumn Festival in New York",
    location: "New York",
    date: "2024-10-12",
    startTime: "10:00 AM",
    endTime: "02:00 PM",
    textColor: "#000000",
    bgColor: "#FFA500",
    bgSecondColor: "#FFD700",
    fgColor: "#FFFFFF",
    theme: "Autumn Festival",
    season: "Autumn",
    eventType: "Festival",
    format: "Outdoor",
    style: "Natural",
    quantity: 1,
  };

  return (
    <div className="flex">
      {/* Pass prompts to EventPreview */}
      <EventPreview data={initialData} prompts={prompts} />

      {/* Pass handleNewPrompt to ChatInterface */}
      <ChatInterface initialData={initialData} onNewPrompt={handleNewPrompt} closeChat={() => { /* Implement closeChat functionality here */ }} />
    </div>
  );
};

export default ChatAndEventPreview;

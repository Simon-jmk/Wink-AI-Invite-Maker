"use client";

require("dotenv").config();

import React, { useState } from "react";
import { Button } from "./ui/button";
import { RingLoader } from "react-spinners";

interface EventPreviewProps {
  data: {
    name: string;
    title: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    textColor: string;
    bgColor: string;
    bgSecondColor: string;
    fgColor: string;
    theme: string;
    season: string;
    eventType: string;
    format: string;
    style: string;
    quantity: number;
  };
  prompts: string[];
}
const EventPreview: React.FC<EventPreviewProps> = ({ data, prompts }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const sendToAPI = async () => {
    setLoading(true); // Set loading to true when API call starts
    try {
      const response = await fetch("/api/generateInvitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,  // Include all event data
            prompts,       // Make sure prompts are part of the eventData
          },
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.imageUrl); // Store and display the image URL
      } else {
        console.error("Failed to generate image:", result.message);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setLoading(false); // Set loading to false when API call finishes
    }
  };

  return (
    <div className="relative flex gap-32 p-24 flex-wrap">
      {/* Main content - blurred when loading */}
      <div className={`${loading ? "blur-sm" : ""} w-full`}>
        <div className="flex justify-around p-24 flex-wrap gap-8">
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold mb-4">Event Preview</h2>
            <p>
              <strong>Title:</strong> {data.title}
            </p>
            <p>
              <strong>Location:</strong> {data.location}
            </p>
            <p>
              <strong>Date:</strong> {data.date}
            </p>
            <p>
              <strong>Start:</strong> {data.startTime}
            </p>
            <p>
              <strong>Ends:</strong> {data.endTime}
            </p>
            <p>
              <strong>Theme:</strong> {data.theme}
            </p>
            <p>
              <strong>Season:</strong> {data.season}
            </p>
            <p>
              <strong>Format:</strong> {data.format}
            </p>
            <p>
              <strong>Style:</strong> {data.style}
            </p>
            <p>
              <strong>Quantity:</strong> {data.quantity}
            </p>
            <p>
              <strong>Event Type:</strong> {data.eventType}
            </p>
            <p>
              <strong>Text Color:</strong> {data.textColor}
            </p>
            <p>
              <strong>Foreground Color:</strong> {data.fgColor}
            </p>
            <p>
              <strong>Background Color:</strong> {data.bgColor}
            </p>
            <p>
              <strong>Background Secondary Color:</strong> {data.bgSecondColor}
            </p>
            <h3>Custom Prompts:</h3>
            <p>
              {prompts.length > 0
                ? prompts.join(", ")
                : "No custom prompts yet"}
            </p>
            {/* Display loader or button based on loading state */}
            
          </div>
          <div>
            {imageUrl && (
              <img src={imageUrl} className="w-96" alt="Generated Invitation" />
            )}
            <Button
              className="w-80 mt-6 bg-gradient-to-br from-indigo-800 to-violet-500"
              onClick={sendToAPI}
            >
              Generate Invitation
            </Button>
          </div>
        </div>
      </div>

      {/* Full-screen loader modal */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <RingLoader color="#36d7b7" size={150} />
        </div>
      )}
    </div>
  );
};

export default EventPreview;

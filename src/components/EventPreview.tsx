"use client";

require('dotenv').config();

import React, { useState } from "react";

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
}

const EventPreview: React.FC<EventPreviewProps> = ({ data }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const sendToAPI = async () => {
    try {
      const response = await fetch('/api/generateInvitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }), // Pass the event data to the API
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.imageUrl); // Store and display the image URL
      } else {
        console.error('Failed to generate image:', result.message);
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  
  return (
    <div className="p-4">
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

      {/* Button to send event */}
      <div>
      <button onClick={sendToAPI}>Generate Invitation</button>
      {imageUrl && <img src={imageUrl} alt="Generated Invitation" />}
    </div>
    </div>
  );
};
export default EventPreview;

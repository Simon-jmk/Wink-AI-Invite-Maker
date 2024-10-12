"use client";

import React from "react";

interface EventPreviewProps {
  data: {
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    textColor: string;
    fgColor: string;
    bgColor: string;
    theme: string;
  };
}

const EventPreview: React.FC<EventPreviewProps> = ({ data }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event Preview</h2>
      <p>
        <strong>Location:</strong> {data.location}
      </p>
      <p>
        <strong>Date:</strong> {data.date}
      </p>
      <p>
        <strong> Start:</strong> {data.startTime}
      </p>
      <p>
        <strong>Text Color:</strong> {data.textColor}
      </p>
      <p>
        <strong>Background Color:</strong> {data.bgColor}
      </p>
      <p>
        <strong>Foreground Color:</strong> {data.fgColor}
      </p>
      <p>
        <strong>Ends:</strong> {data.endTime}
      </p>
      <p>
        <strong>Theme:</strong> {data.theme}
      </p>
    </div>
  );
};

export default EventPreview;

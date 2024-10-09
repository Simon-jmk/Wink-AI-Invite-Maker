"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface EventPreviewProps {
  data: { location: string; date: string; time: string; theme: string };
  startChat: () => void;
}

const EventPreview: React.FC<EventPreviewProps> = ({ data, startChat }) => {
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
        <strong>Time:</strong> {data.time}
      </p>
      <p>
        <strong>Theme:</strong> {data.theme}
      </p>
      <Button onClick={startChat} className="mt-4">
        Refine Details
      </Button>
    </div>
  );
};

export default EventPreview;

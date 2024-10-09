"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EventFormProps {
  eventData: {
    id: number;
    name: string;
    location: string;
    date: string;
    time: string;
    theme: string;
  };
  onComplete: (data: {
    location: string;
    date: string;
    time: string;
    theme: string;
  }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ eventData, onComplete }) => {
  const [formData, setFormData] = useState({
    location: eventData.location,
    date: eventData.date,
    time: eventData.time,
    theme: eventData.theme,
  });

  useEffect(() => {
    setFormData({
      location: eventData.location,
      date: eventData.date,
      time: eventData.time,
      theme: eventData.theme,
    });
  }, [eventData]);

  const handleNext = () => {
    onComplete(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Event Information</h2>
      <Input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="mb-4"
      />
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="mb-4"
      />
      <Input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="mb-4"
      />
      <select
        name="theme"
        value={formData.theme}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Select a theme</option>
        <option value="christmas">Christmas</option>
        <option value="halloween">Halloween</option>
        <option value="birthday">Birthday</option>
      </select>
      <Button onClick={handleNext}>Complete</Button>
    </div>
  );
};

export default EventForm;

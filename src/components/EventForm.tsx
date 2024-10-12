"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SketchPicker } from "react-color";

interface EventFormProps {
  eventData: {
    id: number;
    name: string;
    location: string;
    date: string;
    textColor: string;
    fgColor: string;
    bgColor: string;
    startTime: string;
    endTime: string;
    theme: string;
  };
  onComplete: (data: {
    location: string;
    date: string;
    startTime: string;
    textColor: string;
    fgColor: string;
    bgColor: string;
    endTime: string;
    theme: string;
  }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ eventData, onComplete }) => {
  const [formData, setFormData] = useState({
    location: eventData.location,
    date: eventData.date,
    startTime: eventData.startTime, // Changed to startTime
    endTime: eventData.endTime,
    textColor: eventData.textColor,
    bgColor: eventData.bgColor,
    fgColor: eventData.fgColor,
    theme: eventData.theme,
  });

  useEffect(() => {
    setFormData({
      location: eventData.location,
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime, // Reset endTime when eventData changes
      textColor: eventData.textColor,
      bgColor: eventData.bgColor,
      fgColor: eventData.fgColor,
      theme: eventData.theme,
    });
  }, [eventData]);

  const handleNext = () => {
    onComplete(formData);
  };

  const handleColorChange = (color: { hex: string }, colorType: string) => {
    setFormData({ ...formData, [colorType]: color.hex });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Event Information</h2>

      <div className="flex justify-between">
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="mb-4 w-1/2"
        />

        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mb-4 w-1/7"
        />
        <Input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="mb-4  w-1/8"
        />
        <Input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="mb-4  w-1/8"
        />
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="block mb-2">Text Color</label>
          <SketchPicker
            color={formData.textColor}
            onChange={(color) => handleColorChange(color, "textColor")}
          />
        </div>
        <div>
          <label className="block mb-2">Foreground Color</label>
          <SketchPicker
            color={formData.fgColor}
            onChange={(color) => handleColorChange(color, "fgColor")}
          />
        </div>
        <div>
          <label className="block mb-2">Background Color</label>
          <SketchPicker
            color={formData.bgColor}
            onChange={(color) => handleColorChange(color, "bgColor")}
          />
        </div>
      </div>
      <select
        name="theme"
        value={formData.theme}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Select a theme</option>
        <option value="Valborg">Valborg</option>
        <option value="Spring">Spring</option>
        <option value="Easter">Easter</option>
        <option value="Midsummer">Midsummer</option>
        <option value="Summer">Summer</option>
        <option value="Autumn">Autumn</option>
        <option value="Halloween">Halloween</option>
        <option value="Winter">Winter</option>
        <option value="Lucia">Lucia</option>
        <option value="Christmas">Christmas</option>
        <option value="New Year">New Year</option>
      </select>
      <Button onClick={handleNext}>Complete</Button>
    </div>
  );
};

export default EventForm;

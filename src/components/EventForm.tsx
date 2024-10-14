"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";

interface EventFormProps {
  eventData: {
    title: string;
    id: number;
    name: string;
    location: string;
    date: string;
    textColor: string;
    fgColor: string;
    bgColor: string;
    bgSecondColor: string;
    startTime: string;
    endTime: string;
    theme: string;
    eventType: string;
    season: string;
    format: string;
    style: string;
    quantity: number;
  };
  onComplete: (data: {
    title: string;
    location: string;
    date: string;
    startTime: string;
    textColor: string;
    fgColor: string;
    bgColor: string;
    bgSecondColor: string;
    endTime: string;
    theme: string;
    eventType: string;
    season: string;
    format: string;
    style: string;
    quantity: number;
  }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ eventData, onComplete }) => {
  const [formData, setFormData] = useState({
    title: eventData.title,
    location: eventData.location,
    date: eventData.date,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    textColor: { hex: eventData.textColor || "#000000" },
    fgColor: { hex: eventData.fgColor || "#FFFFFF" },
    bgColor: { hex: eventData.bgColor || "#FF0000" },
    bgSecondColor: { hex: eventData.bgSecondColor || "#00FF00" },
    theme: eventData.theme,
    eventType: eventData.eventType,
    season: eventData.season,
    format: eventData.format,
    style: eventData.style,
    quantity: eventData.quantity,
  });

  useEffect(() => {
    setFormData({
      title: eventData.title,
      location: eventData.location,
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      textColor: { hex: eventData.textColor},
      fgColor: { hex: eventData.fgColor },
      bgColor: { hex: eventData.bgColor },
      bgSecondColor: { hex: eventData.bgSecondColor },
      theme: eventData.theme,
      season: eventData.season,
      eventType: eventData.eventType,
      format: eventData.format,
      style: eventData.style,
      quantity: eventData.quantity,
    });
  }, [eventData]);

  const handleNext = () => {
    const {
      location,
      date,
      startTime,
      endTime,
      theme,
      title,
      eventType,
      season,
      style,
      format,
      quantity,
      textColor,
      fgColor,
      bgColor,
      bgSecondColor,
    } = formData;

    onComplete({
      location,
      date,
      startTime,
      endTime,
      theme,
      eventType,
      title,
      season,
      textColor: textColor.hex,
      fgColor: fgColor.hex,
      bgColor: bgColor.hex,
      bgSecondColor: bgSecondColor.hex,
      style,
      format,
      quantity,
    });
  };

  const handleColorChange = (color: { hex: string }, colorType: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [colorType]: color,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 px-8 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Event Information</h2>
      <div className="flex mb-4 justify-between flex-wrap">
        <div className="flex gap-4 flex-col min-w-56">
          <div>
            <div>
              <label className="block mb-2">Event Title:</label>
              <Input
                type="text"
                name="title"
                placeholder="Name your event"
                value={formData.title}
                onChange={handleChange}
                className="mb-4 w-full bg-white"
              />
            </div>
            <div>
              <label className="block mb-2">Location:</label>
              <Input
                type="text"
                name="location"
                placeholder="Location of your event"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-white"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full mb-4">
            <div>
              <label className="block mb-2">Start Time:</label>
              <Input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="bg-white"
              />
            </div>
            <div>
              <label className="block mb-2">End Time:</label>
              <Input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="bg-white"
              />
            </div>
            <div>
              <label className="block mb-2">Date:</label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-white"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-col min-w-56">
          <div>
            <label className="block mb-2">Event Type:</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Party">Party</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Graduation Party">Graduation Party</option>
              <option value="Holiday Celebration">Holiday Celebration</option>
              <option value="Baby Shower">Baby Shower</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Theme:</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full  p-2 border rounded"
            >
              <option value="">Select a theme</option>
              <option value="Valborg">Valborg</option>
              <option value="Easter">Easter</option>
              <option value="Midsummer">Midsummer</option>
              <option value="Halloween">Halloween</option>
              <option value="Lucia">Lucia</option>
              <option value="Christmas">Christmas</option>
              <option value="New Year">New Year</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Season:</label>
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="">Select a season</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 flex-col min-w-56">
          <div>
            <label className="block mb-2">Format:</label>
            <select
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a format</option>
              <option value="1024x1024">1024x1024</option>
              <option value="1792x1024">1792x1024</option>
              <option value="1024x1792">1024x1792</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Style:</label>
            <select
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a style</option>
              <option value="Vivid">Vivid</option>
              <option value="Natural">Natural</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Amount:</label>
            <select
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a amount</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mb-8">
        <div>
          <label className="block mb-2">Text:</label>
          <HexColorPicker
            color={formData.textColor.hex}
            style={{ width: "200px", height: "100px" }}
            onChange={(color) => handleColorChange({ hex: color }, "textColor")}
          />
        </div>
        <div>
          <label className="block mb-2">Foreground:</label>
          <HexColorPicker
            color={formData.fgColor.hex}
            style={{ width: "200px", height: "100px" }}
            onChange={(color) => handleColorChange({ hex: color }, "fgColor")}
          />
        </div>
        <div>
          <label className="block mb-2">Background:</label>
          <HexColorPicker
            color={formData.bgColor.hex}
            style={{ width: "200px", height: "100px" }}
            onChange={(color) => handleColorChange({ hex: color }, "bgColor")}
          />
        </div>
        <div>
          <label className="block mb-2">Background Secondary:</label>
          <HexColorPicker
            color={formData.bgSecondColor.hex}
            style={{ width: "200px", height: "100px" }}
            onChange={(color) =>
              handleColorChange({ hex: color }, "bgSecondColor")
            }
          />
        </div>
      </div>
      <Button onClick={handleNext}>Complete</Button>
    </div>
  );
};

export default EventForm;

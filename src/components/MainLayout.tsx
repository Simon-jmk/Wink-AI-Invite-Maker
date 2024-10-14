"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EventForm from "./EventForm";
import EventPreview from "./EventPreview";
import ChatInterface from "./ChatInterface";
import { title } from "process";

interface EventData {
  id: number;
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
  eventType: string;
  season: string;
  format: string;
  style: string;
  quantity: number;
}

const MainLayout: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      title: "Sample Event Title",
      name: "Birthday Party",
      location: "Hello",
      date: "",
      startTime: "",
      endTime: "",
      textColor: "",
      bgColor: "",
      bgSecondColor: "",
      fgColor: "",
      theme: "",
      eventType: "",
      season: "",
      format: "",
      style: "",
      quantity: 1,
    },
    {
      id: 2,
      title: "Sample Event Title",
      name: "Christmas Event",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      textColor: "",
      bgColor: "",
      bgSecondColor: "",
      fgColor: "",
      theme: "",
      eventType: "",
      season: "",
      format: "",
      style: "",
      quantity: 1,
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const handleSelectEvent = (id: number) => {
    setSelectedEvent(id);
    setFormCompleted(false);
    setChatVisible(false);
  };

  const handleCreateNewEvent = () => {
    const newEventId = events.length + 1;
    const newEvent: EventData = {
      id: newEventId,
      title: "",
      name: `New Event ${newEventId}`,
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      textColor: "",
      bgColor: "",
      bgSecondColor: "",
      fgColor: "",
      theme: "",
      eventType: "",
      season: "",
      format: "",
      style: "",
      quantity: 1,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setSelectedEvent(newEventId);
    setFormCompleted(false);
    setChatVisible(false);
  };

  const handleFormComplete = (data: {
    location: string;
    date: string;
    startTime: string;
    endTime: string;
    theme: string;
  }) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEvent ? { ...event, ...data } : event
      )
    );
    setFormCompleted(true);
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  const handleEventNameChange = (id: number, name: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === id ? { ...event, name } : event))
    );
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const selectedEventData = events.find((event) => event.id === selectedEvent);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <Sidebar
        events={events}
        selectedEventId={selectedEvent}
        selectEvent={handleSelectEvent}
        createNewEvent={handleCreateNewEvent}
        onEventNameChange={handleEventNameChange}
        onDeleteEvent={handleDeleteEvent}
      />
      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        {selectedEvent && selectedEventData && (
          <>
            {!formCompleted && (
              <EventForm
                eventData={selectedEventData}
                onComplete={handleFormComplete}
              />
            )}
            {formCompleted && <EventPreview data={selectedEventData} />}
          </>
        )}
      </div>
      {/* Right Chat Sidebar */}
      {chatVisible && selectedEventData && (
        <div className="w-0 bg-transparent h-full">
          <ChatInterface
            initialData={selectedEventData}
            closeChat={handleCloseChat}
          />
        </div>
      )}
    </div>
  );
};

export default MainLayout;

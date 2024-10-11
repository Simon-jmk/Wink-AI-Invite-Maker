"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EventForm from "./EventForm";
import EventPreview from "./EventPreview";
import ChatInterface from "./ChatInterface";

interface EventData {
  id: number;
  name: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  theme: string;
}

const MainLayout: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      name: "Birthday Party",
      location: "Hello",
      date: "",
      startTime: "",
      endTime: "",
      theme: "",
    },
    {
      id: 2,
      name: "Christmas Event",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      theme: "",
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
    const newEvent = {
      id: newEventId,
      name: `New Event ${newEventId}`,
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      theme: "",
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
            <h2 className="text-2xl font-bold mb-4">
              {selectedEventData.name}
            </h2>
            {!formCompleted && (
              <EventForm
                eventData={selectedEventData}
                onComplete={handleFormComplete}
              />
            )}
            {formCompleted && (
              <EventPreview
                data={selectedEventData}
                startChat={() => setChatVisible(true)}
              />
            )}
          </>
        )}
      </div>
      {/* Right Chat Sidebar */}
      {chatVisible && selectedEventData && (
        <div className="w-80 bg-gray-100 border-l border-gray-300 p-4 h-full fixed right-0 top-0 shadow-lg">
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

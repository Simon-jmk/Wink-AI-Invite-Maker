import React, { useState } from "react";
import Sidebar from "./Sidebar";
import EventForm from "./EventForm";
import EventPreview from "./EventPreview";
import ChatInterface from "./ChatInterface";

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
  prompts: string[]; // Add prompts property to EventData
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
      prompts: [], // Add prompts to each event
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
      prompts: [], // Add prompts to each event
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([]); // Add prompts state here

  const handleSelectEvent = (id: number) => {
    setSelectedEvent(id);
    const selectedEvent = events.find((event) => event.id === id);
    if (selectedEvent) {
      setPrompts(selectedEvent.prompts || []); // Load event-specific prompts
    }
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

  const handleCreateNewEvent = () => {
    const newEvent: EventData = {
      id: events.length + 1,
      title: "New Event",
      name: "New Event Name",
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
      prompts: [], // Add prompts to new event
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setSelectedEvent(newEvent.id);
    setFormCompleted(false);
    setChatVisible(false);
  };

  const handleNewPrompt = (newPrompt: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEvent
          ? { ...event, prompts: [...(event.prompts || []), newPrompt] }
          : event
      )
    );
  };

  const selectedEventData = events.find((event) => event.id === selectedEvent);

  return (
    <div className="flex flex-col h-screen">
      {/* Heading */}
      <h1
        className="absolute top-4 left-0 right-0 text-center text-5xl font-bold mt-4 mx-auto w-56"
        style={{
          fontFamily: "'Rammetto One'",
          color: "#283c9f",
          zIndex: 100,
        }}
      >
        Wink
      </h1>
      {/* Left Sidebar */}
      <div className="flex flex-1">
        <Sidebar
          events={events}
          selectedEventId={selectedEvent}
          selectEvent={handleSelectEvent}
          createNewEvent={handleCreateNewEvent}
          onEventNameChange={handleEventNameChange}
          onDeleteEvent={handleDeleteEvent}
        />
        {/* Main Content Area */}
        <div className="flex-1 bg-[#f6f6ea] p-4 overflow-y-auto pt-24">
          {selectedEvent && selectedEventData && (
            <>
              {!formCompleted && (
                <EventForm
                  eventData={selectedEventData}
                  onComplete={handleFormComplete}
                />
              )}
              {formCompleted && selectedEventData && (
                <EventPreview
                  data={selectedEventData}
                  prompts={selectedEventData.prompts || []}
                />
              )}
            </>
          )}
        </div>
        {/* Right Chat Sidebar */}
        {chatVisible && selectedEventData && (
          <div className="w-0 bg-transparent h-full">
            <ChatInterface
              initialData={selectedEventData}
              closeChat={handleCloseChat}
              onNewPrompt={handleNewPrompt}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default MainLayout;

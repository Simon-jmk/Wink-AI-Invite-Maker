"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "./ConfirmationModal";

interface SidebarProps {
  events: { id: number; name: string }[];
  selectedEventId: number | null;
  selectEvent: (id: number) => void;
  createNewEvent: () => void;
  onEventNameChange: (id: number, name: string) => void;
  onDeleteEvent: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  events,
  selectedEventId,
  selectEvent,
  createNewEvent,
  onEventNameChange,
  onDeleteEvent,
}) => {
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [tempEventName, setTempEventName] = useState<string>("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleEditClick = (id: number, currentName: string) => {
    setEditingEventId(id);
    setTempEventName(currentName);
    setMenuOpenId(null);
  };

  const handleDeleteClick = (id: number) => {
    setEventToDelete(id);
    setShowModal(true);
    setMenuOpenId(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempEventName(e.target.value);
  };

  const handleSave = (id: number) => {
    if (tempEventName.trim()) {
      onEventNameChange(id, tempEventName.trim());
    }
    setEditingEventId(null);
  };

  const handleCancel = () => {
    setEditingEventId(null);
    setTempEventName("");
  };

  const handleConfirmDelete = () => {
    if (eventToDelete !== null) {
      onDeleteEvent(eventToDelete);
    }
    setShowModal(false);
    setEventToDelete(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventToDelete(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`h-full ${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-all duration-300 bg-gray-200`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
        {isSidebarOpen && (
          <button
            onClick={createNewEvent}
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        )}
      </div>
      {isSidebarOpen && (
        <>
          <h2 className="text-xl font-bold mb-4 px-4">My Events</h2>
          <div className="flex-1 overflow-y-auto px-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-2 mb-2 bg-white cursor-pointer hover:bg-gray-100 ${
                  selectedEventId === event.id ? "bg-blue-100" : ""
                }`}
                onMouseEnter={() => setMenuOpenId(null)}
              >
                {editingEventId === event.id ? (
                  <input
                    type="text"
                    value={tempEventName}
                    onChange={handleNameChange}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? handleSave(event.id)
                        : e.key === "Escape" && handleCancel()
                    }
                    onBlur={() => handleSave(event.id)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <span onClick={() => selectEvent(event.id)}>
                      {event.name}
                    </span>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(event.id);
                        }}
                        className="text-gray-500 hover:text-gray-700 ml-2"
                      >
                        ...
                      </button>
                      {menuOpenId === event.id && (
                        <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(event.id, event.name);
                            }}
                            className="block w-full px-2 py-1 text-left hover:bg-gray-100"
                          >
                            Rename
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(event.id);
                            }}
                            className="block w-full px-2 py-1 text-left hover:bg-gray-100 text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showModal}
            onClose={handleModalClose}
            onConfirm={handleConfirmDelete}
            message="Are you sure you want to delete this event? This action cannot be undone."
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;

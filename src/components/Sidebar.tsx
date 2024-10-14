"use client";

import React, { useState, useEffect, useRef } from "react";
import ConfirmationModal from "./ConfirmationModal";
import EventName from "./EventName";

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

  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click is outside both the menu and the input
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setMenuOpenId(null);
        setEditingEventId(null);
        setTempEventName("");
      } else if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        // If the click is outside the menu but not outside the input, only close the menu
        setMenuOpenId(null);
      } else if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        // If the click is outside the input but not the menu, only close the input
        setEditingEventId(null);
        setTempEventName("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenId, editingEventId]);

  useEffect(() => {
    if (editingEventId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingEventId]);

  return (
    <div
      className={`h-max min-h-full pb-4 ${
        isSidebarOpen ? "w-64 bg-gray-200" : "w-8 bg-transparent"
      } transition-all duration-300`}
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
          <div className="flex-1 px-4 grow-0 overflow-auto">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-2 mb-2 cursor-pointer hover:bg-gray-300 rounded-lg group ${
                  selectedEventId === event.id ||
                  menuOpenId === event.id ||
                  editingEventId === event.id ||
                  eventToDelete === event.id
                    ? "bg-gray-300"
                    : "bg-gray-200"
                }`}
                onClick={() => selectEvent(event.id)} // Make the entire div clickable to select the event
              >
                {editingEventId === event.id ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={tempEventName}
                    onChange={handleNameChange}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? handleSave(event.id)
                        : e.key === "Escape" && handleCancel()
                    }
                    onBlur={() => handleSave(event.id)}
                    className="w-full border pl-1 rounded bg-transparent"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <EventName
                      name={event.name}
                      selectEvent={() => selectEvent(event.id)}
                      isSelected={
                        selectedEventId === event.id ||
                        menuOpenId === event.id ||
                        editingEventId === event.id ||
                        eventToDelete === event.id
                      }
                      menuOpen={menuOpenId === event.id}
                      disableAnimation={
                        menuOpenId === event.id ||
                        editingEventId === event.id ||
                        eventToDelete === event.id
                      }
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent event selection when menu is opened
                        setMenuOpenId(event.id);
                      }}
                      className={`text-gray-500 ml-2 transition-opacity duration-200 ${
                        selectedEventId === event.id || menuOpenId === event.id
                          ? "opacity-100"
                          : "hidden group-hover:inline-block"
                      }`}
                    >
                      ⋯
                    </button>
                    {menuOpenId === event.id && (
                      <div
                        ref={menuRef}
                        className="absolute left-56 mt-20 w-24 bg-white border rounded shadow-lg z-50"
                      >
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
                )}
              </div>
            ))}
          </div>
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

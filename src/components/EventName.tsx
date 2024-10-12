"use client";

import React, { useState, useEffect, useRef } from "react";

const EventName: React.FC<{ name: string; selectEvent: () => void; isSelected: boolean; menuOpen: boolean; disableAnimation: boolean; }> = ({
  name,
  selectEvent,
  isSelected,
  menuOpen,
  disableAnimation,
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState<string>(name);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [name]);

  useEffect(() => {
    if (isSelected && !disableAnimation) {
      setDisplayedText("");
      let index = -1;
  
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + (name[index] || ""));
        index++;
        if (index >= name.length) {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(name);
    }
  }, [isSelected, name, disableAnimation]);
  

  return (
    <div className="relative overflow-hidden w-full flex items-center group" onClick={selectEvent}>
      <span
        ref={textRef}
        className={`whitespace-nowrap overflow-hidden cursor-pointer ${isSelected && !disableAnimation ? "typing-cursor" : ""}`}
        style={{ display: "inline-block", width: "full" }}
      >
        {displayedText}
      </span>
      {isOverflowing && (
        <div
          className={`absolute inset-y-0 right-0 w-10 bg-gradient-to-l pointer-events-none ${
            isSelected
              ? "from-gray-300 to-transparent"
              : "from-gray-200 to-transparent group-hover:from-gray-300 group-hover:to-transparent"
          }`}
        />
      )}
    </div>
  );
};

export default EventName;

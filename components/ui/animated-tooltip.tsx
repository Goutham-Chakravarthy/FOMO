"use client";

import React from "react";

export type AnimatedTooltipItem = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

interface AnimatedTooltipProps {
  items: AnimatedTooltipItem[];
}

// A lightweight animated tooltip without external deps.
// - Horizontal row of circular images
// - On hover: image slightly lifts/scales and a tooltip fades/scales in above
// - Uses Tailwind for transitions
export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({ items }) => {
  return (
    <div className="flex gap-10">
      {items.map((item) => (
        <div key={item.id} className="relative group flex flex-col items-center">
          {/* Avatar */}
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg bg-white/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Caption below avatar */}
          <div className="mt-2 text-center">
            <div className="text-white text-base font-medium leading-tight">{item.name}</div>
            <div className="text-green-400 text-sm">{item.designation}</div>
          </div>

          {/* Tooltip */}
          <div
            className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 shadow-xl text-center min-w-[160px]">
              <div className="text-white font-medium leading-tight">{item.name}</div>
              <div className="text-green-400 text-sm">{item.designation}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTooltip;

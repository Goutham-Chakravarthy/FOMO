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
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-2">
      {items.map((item) => (
        <div key={item.id} className="relative group flex flex-col items-center">
          {/* Avatar */}
          <div
            className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg bg-white/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
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
            <div className="text-white text-sm sm:text-base font-medium leading-tight">{item.name}</div>
            <div className="text-green-400 text-xs sm:text-sm">{item.designation}</div>
          </div>

          {/* Tooltip - appears on hover above avatar */}
          <div
            className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl text-center min-w-[140px] sm:min-w-[160px]">
              <div className="text-white text-sm sm:text-base font-medium leading-tight">{item.name}</div>
              <div className="text-green-400 text-xs sm:text-sm">{item.designation}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTooltip;
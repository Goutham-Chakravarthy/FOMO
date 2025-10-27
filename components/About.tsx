"use client";
// About.tsx - Full-page About section with terminal theme and glassmorphism
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";

// Types
interface StatItem {
  value: string;
  label: string;
}

// Data: Stats
const stats: StatItem[] = [
  { value: "3+", label: "Years Experience" },
  { value: "30+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "3", label: "Team Members" },
];

// Data: Team (AnimatedTooltip format)
const teamMembers = [
  {
    id: 1,
    name: "Byte",
    designation: "Lead Developer",
    image: "/byte.jpg",
  },
  {
    id: 2,
    name: "Data",
    designation: "UI/UX Designer",
    image: "/data.jpg",
  },
  {
    id: 3,
    name: "Pixel",
    designation: "DevOps Engineer",
    image: "/pixel.jpg",
  },
];

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="bg-black min-h-screen pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 md:space-y-16 lg:space-y-20">
        {/* Section 1 - Hero */}
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400 mb-3 sm:mb-4 md:mb-6">
            $ whoami
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed text-pretty max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-2 sm:px-4 md:px-0">
            We’re a team of three student developers with experience across web, mobile, cloud, AI/ML, data, UI, and Next.js. We started FOMO to help students with reliable and affordable academic solutions delivering quality projects, reports, and presentations on time.
          </p>
        </header>

        {/* Section 2 - Stats */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 text-center hover:scale-105 hover:bg-white/15 transition-all duration-300 shadow-lg"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-400 mb-1 sm:mb-1.5 md:mb-2">
                  {item.value}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - Team with Animated Tooltip */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            Meet Our Team
          </h2>
          <div className="flex justify-center items-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <AnimatedTooltip items={teamMembers} />
          </div>
        </section>
      </div>
    </section>
  );
}
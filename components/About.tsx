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
  { value: "5+", label: "Years Experience" },
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "10+", label: "Team Members" },
];

// Data: Team (AnimatedTooltip format)
const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    designation: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    designation: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    designation: "DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
];

export default function About(): React.JSX.Element {
  return (
    <section className="bg-black min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
        {/* Section 1 - Hero */}
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400 mb-4 sm:mb-6">
            $ whoami
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16 px-2">
            We are a team of passionate developers and designers dedicated to building cutting-edge digital solutions. With expertise spanning web development, mobile apps, and cloud infrastructure, we transform ideas into reality. Our mission is to deliver innovative, scalable, and user-centric products that drive business growth.
          </p>
        </header>

        {/* Section 2 - Stats */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-8 sm:mb-10 md:mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:scale-105 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-1 sm:mb-2">
                  {item.value}
                </div>
                <div className="text-gray-400 text-sm sm:text-base md:text-lg">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 - Team with Animated Tooltip */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center mb-8 sm:mb-10 md:mb-12">
            Meet Our Team
          </h2>
          <div className="flex justify-center items-center mb-12 sm:mb-16 md:mb-20">
            <AnimatedTooltip items={teamMembers} />
          </div>
        </section>
      </div>
    </section>
  );
}
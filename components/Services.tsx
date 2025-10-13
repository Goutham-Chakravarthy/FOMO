'use client';

import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Terminal, Users } from 'lucide-react';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import Image from 'next/image';

// TypeScript interface for service data
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Services = () => {
  const [terminalText, setTerminalText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  
  const terminalServices = [
    "Cloud Solutions",
    "API Development",
    "UI/UX Design",
    "Database Design",
    "System Architecture"
  ];

  useEffect(() => {
    const currentService = terminalServices[serviceIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (terminalText.length < currentService.length) {
          setTerminalText(currentService.slice(0, terminalText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (terminalText.length > 0) {
          setTerminalText(terminalText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setServiceIndex((serviceIndex + 1) % terminalServices.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [terminalText, isDeleting, serviceIndex]);

  const services: Service[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like Next.js, React, and TypeScript for scalable solutions.",
      icon: <Code className="size-6 sm:size-7 md:size-8 text-green-400" />
    },
    {
      id: 2,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications with seamless user experiences and robust performance.",
      icon: <Smartphone className="size-6 sm:size-7 md:size-8 text-green-400" />
    },
    {
      id: 3,
      title: "DevOps & CI/CD",
      description: "Automated deployment pipelines, containerization with Docker, and Kubernetes orchestration for efficiency.",
      icon: <Terminal className="size-6 sm:size-7 md:size-8 text-green-400" />
    },
    {
      id: 4,
      title: "Technical Consulting",
      description: "Expert guidance on architecture, technology stack selection, and best practices for your projects.",
      icon: <Users className="size-6 sm:size-7 md:size-8 text-green-400" />
    }
  ];

  return (
    <section id="services" className="relative min-h-screen bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden scroll-mt-24">
      {/* Background image */}
      <Image
        src="/projects-bg.jpg"
        alt="Services background"
        fill
        priority
        className="object-cover object-center opacity-100"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400 mb-4 sm:mb-6">
            <span className="text-gray-400">$</span> services --list
          </h2>
          <p className="text-gray-400 text-base sm:text-lg px-2 sm:px-4 max-w-3xl mx-auto leading-relaxed">
            Comprehensive development solutions powered by cutting-edge technology
            and industry best practices to bring your vision to life.
          </p>
        </div>

        {/* 5-Grid Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Left Column - 2 squares stacked */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Web Development */}
            <CardSpotlight 
              color="#10b981"
              className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 sm:p-8 group aspect-square flex flex-col"
            >
              <div className="bg-green-400/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-400/20 transition-all duration-300 relative z-10">
                {services[0].icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 font-mono relative z-10">
                {services[0].title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow relative z-10">
                {services[0].description}
              </p>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 relative z-10">
                <button className="text-green-400 hover:text-green-300 font-mono text-xs sm:text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                  Learn more →
                </button>
              </div>
            </CardSpotlight>

            {/* DevOps & CI/CD */}
            <CardSpotlight 
              color="#10b981"
              className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 sm:p-8 group aspect-square flex flex-col"
            >
              <div className="bg-green-400/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-400/20 transition-all duration-300 relative z-10">
                {services[2].icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 font-mono relative z-10">
                {services[2].title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow relative z-10">
                {services[2].description}
              </p>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 relative z-10">
                <button className="text-green-400 hover:text-green-300 font-mono text-xs sm:text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                  Learn more →
                </button>
              </div>
            </CardSpotlight>
          </div>

          {/* Center Column - Tall vertical rectangle */}
          <CardSpotlight 
            color="#10b981"
            className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 sm:p-8 group flex flex-col min-h-[400px] lg:min-h-0"
          >
            <div className="bg-green-400/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-400/20 transition-all duration-300 relative z-10">
              {services[1].icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 font-mono relative z-10">
              {services[1].title}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow relative z-10">
              {services[1].description}
            </p>
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 relative z-10">
              <button className="text-green-400 hover:text-green-300 font-mono text-xs sm:text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                Learn more →
              </button>
            </div>
          </CardSpotlight>

          {/* Right Column - 2 squares stacked */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Terminal with Typing Animation */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl aspect-square flex flex-col">
              <div className="bg-black/50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm flex-1 flex flex-col">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-2 sm:ml-4 text-xs sm:text-sm">services.sh</span>
                </div>
                <div className="flex-1 flex flex-col justify-start space-y-2 sm:space-y-3">
                  <p className="text-green-400 text-xs sm:text-sm">
                    <span className="text-gray-400">$</span> ./showcase.sh
                  </p>
                  <p className="text-white pl-3 sm:pl-4 text-xs sm:text-sm">We provide:</p>
                  <p className="text-green-400 text-base sm:text-lg pl-3 sm:pl-4 min-h-[24px] sm:min-h-[28px]">
                    {terminalText}<span className="animate-pulse">_</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Consulting */}
            <CardSpotlight 
              color="#10b981"
              className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 sm:p-8 group aspect-square flex flex-col"
            >
              <div className="bg-green-400/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-400/20 transition-all duration-300 relative z-10">
                {services[3].icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 font-mono relative z-10">
                {services[3].title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow relative z-10">
                {services[3].description}
              </p>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 relative z-10">
                <button className="text-green-400 hover:text-green-300 font-mono text-xs sm:text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                  Learn more →
                </button>
              </div>
            </CardSpotlight>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-green-400 mb-3 sm:mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-2">
              Let's discuss how we can transform your ideas into powerful digital solutions
              that drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white/10 backdrop-blur-lg border border-green-400/30 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-green-400 hover:border-green-400 hover:scale-105 hover:bg-green-400/10 transition-all duration-300 font-mono text-base sm:text-lg">
                Get Started →
              </button>
              <button className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-white hover:border-green-400/50 hover:scale-105 transition-all duration-300 font-mono text-base sm:text-lg">
                View Portfolio
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
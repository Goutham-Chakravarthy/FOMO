'use client';

import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Terminal, Users } from 'lucide-react';

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
      icon: <Code className="size-8 text-green-400" />
    },
    {
      id: 2,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications with seamless user experiences and robust performance.",
      icon: <Smartphone className="size-8 text-green-400" />
    },
    {
      id: 3,
      title: "DevOps & CI/CD",
      description: "Automated deployment pipelines, containerization with Docker, and Kubernetes orchestration for efficiency.",
      icon: <Terminal className="size-8 text-green-400" />
    },
    {
      id: 4,
      title: "Technical Consulting",
      description: "Expert guidance on architecture, technology stack selection, and best practices for your projects.",
      icon: <Users className="size-8 text-green-400" />
    }
  ];

  return (
    <section id="services" className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-mono text-green-400 mb-6">
            <span className="text-gray-400">$</span> services --list
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Comprehensive development solutions powered by cutting-edge technology
            and industry best practices to bring your vision to life.
          </p>
        </div>

        {/* 5-Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - 2 squares stacked */}
          <div className="flex flex-col gap-8">
            {/* Web Development */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 hover:bg-white/15 hover:shadow-green-400/20 transition-all duration-300 group aspect-square flex flex-col">
              <div className="bg-green-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-green-400/20 transition-all duration-300">
                {services[0].icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 font-mono">
                {services[0].title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed flex-grow">
                {services[0].description}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                  Learn more →
                </button>
              </div>
            </div>

            {/* DevOps & CI/CD */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 hover:bg-white/15 hover:shadow-green-400/20 transition-all duration-300 group aspect-square flex flex-col">
              <div className="bg-green-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-green-400/20 transition-all duration-300">
                {services[2].icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 font-mono">
                {services[2].title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed flex-grow">
                {services[2].description}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                  Learn more →
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Tall vertical rectangle */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 hover:bg-white/15 hover:shadow-green-400/20 transition-all duration-300 group flex flex-col">
            <div className="bg-green-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-green-400/20 transition-all duration-300">
              {services[1].icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3 font-mono">
              {services[1].title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed flex-grow">
              {services[1].description}
            </p>
            <div className="mt-6 pt-4 border-t border-white/10">
              <button className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                Learn more →
              </button>
            </div>
          </div>

          {/* Right Column - 2 squares stacked */}
          <div className="flex flex-col gap-8">
            {/* Terminal with Typing Animation */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl aspect-square flex flex-col">
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm flex-1 flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">services.sh</span>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-3">
                  <p className="text-green-400">
                    <span className="text-gray-400">$</span> ./showcase.sh
                  </p>
                  <p className="text-white pl-4">We provide:</p>
                  <p className="text-green-400 text-lg pl-4 min-h-[28px]">
                    {terminalText}<span className="animate-pulse">_</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Consulting */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:scale-105 hover:bg-white/15 hover:shadow-green-400/20 transition-all duration-300 group aspect-square flex flex-col">
              <div className="bg-green-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-green-400/20 transition-all duration-300">
                {services[3].icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 font-mono">
                {services[3].title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed flex-grow">
                {services[3].description}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10">
                <button className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-300 group-hover:translate-x-1 transform">
                  Learn more →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-20">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold font-mono text-green-400 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Let's discuss how we can transform your ideas into powerful digital solutions
              that drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/10 backdrop-blur-lg border border-green-400/30 rounded-full px-8 py-4 text-green-400 hover:border-green-400 hover:scale-105 hover:bg-green-400/10 transition-all duration-300 font-mono text-lg">
                Get Started →
              </button>
              <button className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-4 text-white hover:border-green-400/50 hover:scale-105 transition-all duration-300 font-mono text-lg">
                View Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Terminal-style Footer */}
        <div className="mt-16">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 ml-4">services.sh</span>
              </div>
              <div className="space-y-1">
                <p className="text-green-400">
                  <span className="text-gray-400">$</span> ./check-availability.sh
                </p>
                <p className="text-white pl-4">✓ Currently accepting new projects</p>
                <p className="text-white pl-4">✓ Response time: &lt; 24 hours</p>
                <p className="text-white pl-4">✓ Free consultation available</p>
                <p className="text-green-400 mt-2">
                  <span className="text-gray-400">$</span> <span className="animate-pulse">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { PiCirclesThreeFill } from "react-icons/pi";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastYRef.current;

          if (currentY <= 0) {
            setVisible(true);
          } else if (Math.abs(delta) > 6) {
            setVisible(delta < 0);
          }

          lastYRef.current = currentY;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Optimized smooth scroll with immediate start
  const smoothScrollTo = (targetPosition: number, duration: number = 1200) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Improved smooth scroll handler with immediate execution
  const handleSmoothScroll = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 120;
      const targetPosition = element.offsetTop - navbarHeight;
      
      // Immediately start the smooth scroll
      smoothScrollTo(targetPosition, 1200);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4">
          {/* Desktop Navbar */}
          <nav className="hidden md:flex z-10 items-center gap-3 lg:gap-5 py-2.5 lg:py-3 px-4 lg:px-6 rounded-full bg-white/10 backdrop-blur-lg border text-white border-white/20 shadow-xl">
            <button 
              onClick={(e) => handleSmoothScroll(e, "home")}
              className="hover:scale-110 transition-transform"
            >
              <PiCirclesThreeFill className="text-3xl lg:text-4xl text-white-400" />
            </button>

            <button 
              onClick={(e) => handleSmoothScroll(e, "home")}
              className="hover:text-gray-300 transition-all hover:scale-105 text-sm lg:text-base"
            >
              <span>Home</span>
            </button>

            <button 
              onClick={(e) => handleSmoothScroll(e, "services")}
              className="hover:text-gray-300 transition-all hover:scale-105 text-sm lg:text-base"
            >
              <span>Services</span>
            </button>

            <button 
              onClick={(e) => handleSmoothScroll(e, "projects")}
              className="hover:text-gray-300 transition-all hover:scale-105 text-sm lg:text-base"
            >
              <span>Projects</span>
            </button>

            <button 
              onClick={(e) => handleSmoothScroll(e, "about")}
              className="hover:text-gray-300 transition-all hover:scale-105 text-sm lg:text-base"
            >
              <span>About</span>
            </button>

            <button 
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="hover:text-gray-300 transition-all hover:scale-105 text-sm lg:text-base"
            >
              <span>Contact</span>
            </button>
          </nav>

          {/* Mobile Navbar */}
          <nav className="md:hidden z-10 flex items-center justify-between w-full max-w-md py-3 px-5 rounded-full bg-white/10 backdrop-blur-lg border text-white border-white/20 shadow-xl">
            <button 
              onClick={(e) => handleSmoothScroll(e, "home")}
              className="hover:scale-110 transition-transform"
            >
              <PiCirclesThreeFill className="text-3xl text-white-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen && visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md transition-all duration-300 ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col py-4">
              <button
                onClick={(e) => handleSmoothScroll(e, "home")}
                className="px-6 py-4 text-white hover:bg-white/10 transition-all active:bg-white/20 text-center text-lg"
              >
                Home
              </button>
              <div className="h-px bg-white/10 mx-4" />
              
              <button
                onClick={(e) => handleSmoothScroll(e, "services")}
                className="px-6 py-4 text-white hover:bg-white/10 transition-all active:bg-white/20 text-center text-lg"
              >
                Services
              </button>
              <div className="h-px bg-white/10 mx-4" />
              
              <button
                onClick={(e) => handleSmoothScroll(e, "projects")}
                className="px-6 py-4 text-white hover:bg-white/10 transition-all active:bg-white/20 text-center text-lg"
              >
                Projects
              </button>
              <div className="h-px bg-white/10 mx-4" />
              
              <button
                onClick={(e) => handleSmoothScroll(e, "about")}
                className="px-6 py-4 text-white hover:bg-white/10 transition-all active:bg-white/20 text-center text-lg"
              >
                About
              </button>
              <div className="h-px bg-white/10 mx-4" />
              
              <button
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="px-6 py-4 text-white hover:bg-white/10 transition-all active:bg-white/20 text-center text-lg"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
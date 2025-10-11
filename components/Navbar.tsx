"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { PiCirclesThreeFill } from "react-icons/pi";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastYRef.current;

          // If near top, always show
          if (currentY <= 0) {
            setVisible(true);
          } else if (Math.abs(delta) > 6) {
            // Hide on scroll down, show on scroll up
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

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex justify-center mt-10">
        <nav className="z-10 flex items-center gap-5 py-3 px-6 rounded-full bg-white/10 backdrop-blur-lg border text-white border-white/20 shadow-xl">
          <Link href="/" className="hover:scale-110 transition-transform">
            <PiCirclesThreeFill className="text-4xl text-white-400" />
          </Link>

          <Link href="/" className="hover:text-gray-300 transition-all hover:scale-105">
            <span>Home</span>
          </Link>

          <Link href="/#services" className="hover:text-gray-300 transition-all hover:scale-105">
            <span>Services</span>
          </Link>

          <Link href="/projects" className="hover:text-gray-300 transition-all hover:scale-105">
            <span>Projects</span>
          </Link>

          <Link href="/about" className="hover:text-gray-300 transition-all hover:scale-105">
            <span>About</span>
          </Link>

          <Link href="/contact" className="hover:text-gray-300 transition-all hover:scale-105">
            <span>Contact</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
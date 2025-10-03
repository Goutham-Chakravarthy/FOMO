import Link from "next/link";
import React from "react";
import { PiCirclesThreeFill } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className="z-10 top-14 left-1/2 -translate-x-1/2 fixed flex items-center gap-5 py-3 px-6 rounded-full bg-white/10 backdrop-blur-lg border text-white border-white/20 shadow-xl">
      <Link href="/" className="hover:scale-110 transition-transform">
        <PiCirclesThreeFill className="text-4xl text-white-400" />
      </Link>

      <Link href="/" className="hover:text-gray-300 transition-all hover:scale-105">
        <span>Home</span>
      </Link>

      <Link href="/services" className="hover:text-gray-300 transition-all hover:scale-105">
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
  );
};

export default Navbar;
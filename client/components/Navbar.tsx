"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50 mb-12 rounded-[20px] backdrop-blur-md bg-opacity-90 shadow-[8px_8px_15px_rgba(0,0,0,0.5),_-8px_-8px_15px_rgba(255,255,255,0.05)]">

      {/* Brand Logo + Name */}
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[#39FF14] hover:scale-105 transition-transform">
        <Image src="/55logo.png" alt="55 Blocks" width={72} height={72} />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        <Link href="/login" className="hover:text-[#39FF14] transition">
          Login
        </Link>
        <Link href="/signup" className="hover:text-[#39FF14] transition">
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden text-2xl focus:outline-none neumorphic-button text-[#39FF14]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FaTimes className="text-[#39FF14]" /> : <FaBars className="text-[#39FF14]" />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-2 right-2 bg-[#121212] text-center py-4 mt-2 rounded-[20px] shadow-[8px_8px_15px_rgba(0,0,0,0.5),_-8px_-8px_15px_rgba(255,255,255,0.05)] transition-all duration-300 md:hidden">
          <Link
            href="/login"
            className="block py-2 text-lg hover:text-[#39FF14] transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block py-2 text-lg hover:text-[#39FF14] transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
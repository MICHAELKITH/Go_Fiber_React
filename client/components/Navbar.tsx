"use client"

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center relative shadow-lg">
      {/* Brand Name */}
      <Link href="/" className="text-2xl font-bold text-[#39FF14] hover:scale-105 transition-transform">
        55 BLOCKS
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
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-center py-4 shadow-lg md:hidden">
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
"use client";

import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-gray-300 text-center py-6">
      <p className="text-sm">&copy; {new Date().getFullYear()} 55 BLOCKS. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-neon-green transition"
        >
          <FaTwitter className="text-2xl" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-neon-green transition"
        >
          <FaLinkedin className="text-2xl" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-neon-green transition"
        >
          <FaFacebook className="text-2xl" />
        </a>
      </div>
    </footer>
  );
}
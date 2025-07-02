"use client";

import Image from "next/image";
import React from "react";

export default function BreachStats() {
  return (
    <div className="w-full max-w-3xl mx-auto my-10 px-2">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 bg-black/60 rounded-xl p-4 md:p-8 border border-[#39FF14]/30 shadow-lg">
        <div className="flex-1 flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-extrabold text-[#39FF14]">
            893
          </span>
          <span className="text-base md:text-lg text-blue-400 mt-2">pwned websites</span>
        </div>
        <div className="w-full md:w-px h-px md:h-16 bg-[#39FF14]/20 my-4 md:my-0 md:mx-8" />
        <div className="flex-1 flex flex-col items-center">
          <span className="text-3xl md:text-5xl font-extrabold text-[#39FF14]">
            14,985,816,194
          </span>
          <span className="text-base md:text-lg text-blue-400 mt-2">pwned accounts</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between bg-black/70 border border-blue-900/30 rounded-lg px-4 md:px-6 py-4 mt-6 gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Image
            src="https://haveibeenpwned.com/Images/logos/1PasswordLogoLight.svg?v=XkBm2ucG374VlX0dq_JDvvP6eOx9sI7czpi49eT2QzU"
            alt="1Password"
            width={48}
            height={48}
            className="w-8 h-8 md:w-12 md:h-12"
          />
          <span className="text-white text-sm md:text-base">
            <span className="font-bold">1Password</span> &nbsp;Use a password
            manager to generate and store strong, unique passwords for all your
            accounts.
          </span>
        </div>
        <a
          href="https://1password.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center ml-0 sm:ml-4 px-4 py-2 border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-900/30 transition text-sm md:text-base"
        >
          Try 1Password &rarr;
        </a>
      </div>
    </div>
  );
}
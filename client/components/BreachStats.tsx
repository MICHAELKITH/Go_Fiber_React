"use client";

import Image from "next/image";
import React from "react";

export default function BreachStats() {
  return (
    <div className="w-full max-w-3xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 bg-black/60 rounded-xl p-8 border border-[#39FF14]/30 shadow-lg">
        <div className="flex-1 flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-extrabold text-[#39FF14]">
            893
          </span>
          <span className="text-lg text-blue-400 mt-2">pwned websites</span>
        </div>
        <div className="w-full md:w-px h-px md:h-16 bg-[#39FF14]/20 my-6 md:my-0 md:mx-8" />
        <div className="flex-1 flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-extrabold text-[#39FF14]">
            14,985,816,194
          </span>
          <span className="text-lg text-blue-400 mt-2">pwned accounts</span>
        </div>
      </div>
      <div className="flex items-center justify-between bg-black/70 border border-blue-900/30 rounded-lg px-6 py-4 mt-6">
        <div className="flex items-center gap-3">
          <Image
            src="https://static.1password.com/img/logo-v2/1password-logo-icon.svg"
            alt="1Password"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-white">
            <span className="font-bold">1Password</span> &nbsp;Use a password
            manager to generate and store strong, unique passwords for all your
            accounts.
          </span>
        </div>
        <a
          href="https://1password.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 px-4 py-2 border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-900/30 transition"
        >
          Try 1Password &rarr;
        </a>
      </div>
    </div>
  );
}

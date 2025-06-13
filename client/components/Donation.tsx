"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";

const DONATION_URL = "https://www.mchanga.africa/fundraiser/116893";

export default function Donation() {
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="flex items-center gap-2 mb-4">
        <FaHeart className="text-[#ff4d4d] text-2xl animate-pulse" />
        <h2 className="text-xl font-bold text-[#39FF14]">Support Our Project</h2>
      </div>
      <p className="text-gray-300 mb-4 text-center max-w-md">
        If you find this project helpful, consider making a donation to support further development and community impact.
      </p>
      <a
        href={DONATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#39FF14] text-black font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-[#32cd32] transition"
      >
        Donate via M-Changa
      </a>
    </div>
  );
}
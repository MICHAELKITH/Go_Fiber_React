"use client";

import React, { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Email = () => {
  const [email, setEmail] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    setResult(null);

    // Simulate scanning (replace with real API call)
    setTimeout(() => {
      if (email.includes("@")) {
        setResult("✅ No threats found for this email.");
      } else {
        setResult("❌ Please enter a valid email address.");
      }
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold text-[#39FF14] mb-4 flex items-center gap-2">
        <FaEnvelopeOpenText /> Email Scanning
      </h2>
      <p className="text-gray-300 mb-6">
        Scan your email address for threats and vulnerabilities.
      </p>
      <form onSubmit={handleScan} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="email"
          className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#39FF14] text-black font-bold py-2 rounded hover:bg-[#32cd32] transition-all"
          disabled={scanning}
        >
          {scanning ? "Scanning..." : "Scan Email"}
        </button>
      </form>
      {result && (
        <div className="mt-6 text-center text-lg">
          {result}
        </div>
      )}
    </div>
  );
};

export default Email;
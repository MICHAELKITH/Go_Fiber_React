"use client";

import { useState } from "react";

export default function ForensicDataRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");

    // Simulate a 5-second recovery process
    setTimeout(() => {
      setIsLoading(false);
      setResult("No recoverable data found. All traces are clean! 🎉");
    }, 5000);
  };

  return (
    <section className="relative z-10 text-center py-20 px-6">
      <h2 className="text-4xl font-bold text-[#39FF14] mb-12 tracking-tight">
        Forensic Data Recovery
      </h2>
      <div className="max-w-3xl mx-auto bg-black/40 p-8 rounded-xl border border-[#39FF14]/30 shadow-lg">
        <p className="text-gray-300 mb-6">
          Deleted doesn’t mean gone. Forensic data recovery brings hidden evidence back to life. Enter the file name or directory to begin recovery.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter file name or directory"
            className="w-full p-3 mb-4 bg-black/70 text-[#39FF14] border border-[#39FF14]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#39FF14] hover:bg-[#32CD32] text-black font-bold py-3 rounded-md transition-all duration-300 transform hover:scale-105"
          >
            Recover Now
          </button>
        </form>
        {isLoading && (
          <div className="mt-6 text-[#39FF14]">
            <p className="text-lg font-semibold">Recovering data...</p>
            <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
          </div>
        )}
        {result && (
          <div className="mt-6 text-[#39FF14]">
            <p className="text-lg font-semibold">{result}</p>
          </div>
        )}
      </div>
    </section>
  );
}
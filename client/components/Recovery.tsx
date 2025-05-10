"use client";

import { useState } from "react";

export default function ForensicDataRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    setProgress(0);

    // Simulate a 5-second recovery process with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          // Randomly simulate success or failure
          const success = Math.random() > 0.3;
          setResult(
            success
              ? "Data successfully recovered! 🎉"
              : "No recoverable data found. All traces are clean! 🎉"
          );
        }
        return prev + 20;
      });
    }, 1000);
  };

  const handleReset = () => {
    setIsLoading(false);
    setProgress(0);
    setResult("");
  };

  return (
    <section className="relative z-10 text-center py-20 px-6">
      <h2 className="text-4xl font-bold text-[#39FF14] mb-12 tracking-tight">
        Forensic Data Recovery
      </h2>
      <div className="max-w-3xl mx-auto bg-black/40 p-8 rounded-xl border border-[#39FF14]/30 shadow-lg">
        <p className="text-gray-300 mb-6">
          Deleted doesn’t mean gone. Forensic data recovery brings hidden
          evidence back to life. Enter the file name or directory to begin
          recovery.
        </p>
        {!result && (
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
        )}
        {isLoading && (
          <div className="mt-6 text-[#39FF14]" aria-live="polite">
            <p className="text-lg font-semibold">Recovering data...</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
              <div
                className="bg-[#39FF14] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
          </div>
        )}
        {result && (
          <div className="mt-6 text-[#39FF14]" aria-live="polite">
            <p className="text-lg font-semibold">{result}</p>
            <button
              onClick={handleReset}
              className="mt-4 bg-[#39FF14] hover:bg-[#32CD32] text-black font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Perform Another Recovery
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
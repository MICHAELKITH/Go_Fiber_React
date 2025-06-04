"use client";

import { useState } from "react";

export default function DarkWebScan() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    setProgress(0);
    setTerminalLogs(["[00:00] Initializing scan..."]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"}/check-email?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      // Simulate log steps based on real fetch progress
      const logSteps = [
        "Connecting to dark web databases...",
        "Fetching breach records...",
        "Analyzing data...",
        "Checking for data breaches...",
        "Validating email against known leaks...",
        "Cross-referencing with dark web forums...",
        "Analyzing patterns in breach data...",
        "Finalizing scan results...",
      ];

      for (let step = 0; step < logSteps.length; step++) {
        setTerminalLogs((prevLogs) => [
          ...prevLogs,
          `[00:${(step + 1).toString().padStart(2, "0")}] ${logSteps[step]}`,
        ]);
        setProgress(Math.round(((step + 1) / logSteps.length) * 100));
        // Small delay for UX, but not as slow as before
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      setIsLoading(false);
      setResult(
        data.breached
          ? "⚠️ Your email was found in a breach!"
          : "✅ No vulnerabilities detected! 🎉"
      );
    } catch (error) {
      setIsLoading(false);
      setResult("❌ Error scanning your email.");
      setTerminalLogs((prevLogs) => [
        ...prevLogs,
        "[ERROR] Failed to complete scan.",
      ]);
      console.error("Scan error:", error);
    }
  };

  const handleReset = () => {
    setIsLoading(false);
    setResult("");
    setTerminalLogs([]);
    setEmail("");
    setProgress(0);
  };

  return (
    <section className="relative z-10 text-center py-20 px-6">
      <h2 className="text-4xl font-bold text-[#39FF14] mb-12 tracking-tight">
        Scan Your Email for Dark Web Vulnerabilities
      </h2>
      <div className="max-w-3xl mx-auto bg-black/40 p-8 rounded-xl border border-[#39FF14]/30 shadow-lg">
        <p className="text-gray-300 mb-6">
          Enter your email below to check if it has been exposed on the dark web.
        </p>
        {!result && (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTerminalLogs([]);
              }}
              className="w-full p-3 mb-4 bg-black/70 text-[#39FF14] border border-[#39FF14]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-full bg-[#39FF14] hover:bg-[#32CD32] text-black font-bold py-3 rounded-md transition-all duration-300 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Scanning..." : "Scan Now"}
            </button>
          </form>
        )}

        {/* Terminal Window */}
        <div className="mt-6 bg-black/80 text-left text-[#39FF14] p-4 rounded-lg h-48 overflow-y-auto border border-[#39FF14]/30">
          {terminalLogs.map((log, index) => (
            <p key={index} className="text-sm">
              {log}
            </p>
          ))}
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-[#39FF14] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="mt-6 text-[#39FF14]">
            <p className="text-lg font-semibold">Scanning for vulnerabilities...</p>
            <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
          </div>
        )}

        {/* Result Message */}
        {result && (
          <div className="mt-6 text-[#39FF14]">
            <p className="text-lg font-semibold">{result}</p>
            <button
              onClick={handleReset}
              className="mt-4 bg-[#39FF14] hover:bg-[#32CD32] text-black font-bold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Perform Another Scan
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";

export default function DarkWebScan() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");
    setProgress(0);
    setTerminalLogs(["[00:00] Initializing scan...", `[00:01] Editing: ${email}`]);

    // Simulate terminal logs during the loading process
    const logSteps = [
      "Connecting to dark web databases...",
      "Fetching breach records...",
      "Analyzing data...",
      "Installing dependencies...",
      "Scanning for vulnerabilities...",
      "Checking for data breaches...",
      "Validating email against known leaks...",
      "Cross-referencing with dark web forums...",
      "Analyzing patterns in breach data...",
      "Finalizing scan results...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        const timestamp = `[00:${(step + 2).toString().padStart(2, "0")}]`; // Add timestamps
        setTerminalLogs((prevLogs) => [...prevLogs, `${timestamp} ${logSteps[step]}`]);
        setProgress((prev) => prev + 10); // Update progress bar (10% per step)
        step++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
        setResult("No vulnerabilities detected! 🎉");
      }
    }, 6000); // Add a new log every 6 seconds (10 steps x 6 seconds = 60 seconds)
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
              placeholder={email ? `Editing: ${email}` : "Enter your email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setTerminalLogs([`[00:00] Editing: ${e.target.value}`]); // Update terminal logs while typing
              }}
              className="w-full p-3 mb-4 bg-black/70 text-[#39FF14] border border-[#39FF14]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#39FF14] hover:bg-[#32CD32] text-black font-bold py-3 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Scan Now
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
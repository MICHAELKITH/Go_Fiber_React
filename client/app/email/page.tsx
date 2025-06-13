"use client";

import React, { useState } from "react";
import {
  FaEnvelopeOpenText,
  FaLock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaServer,
  FaBuilding,
  FaDatabase,
  FaMapMarkerAlt,
  FaSpinner,
} from "react-icons/fa";

const resultOrder = [
  { key: "dataBreaches", icon: <FaDatabase /> },
  { key: "passwords", icon: <FaLock /> },
  { key: "usernames", icon: <FaUser /> },
  { key: "phoneNumbers", icon: <FaPhone /> },
  { key: "ips", icon: <FaServer /> },
  { key: "relatedEmails", icon: <FaEnvelope /> },
  { key: "companies", icon: <FaBuilding /> },
  { key: "locations", icon: <FaMapMarkerAlt /> },
];

const resultLabels: Record<string, string> = {
  passwords: "Passwords",
  usernames: "Usernames",
  phoneNumbers: "Phone Numbers",
  relatedEmails: "Related Emails",
  ips: "IP Addresses",
  companies: "Companies",
  dataBreaches: "Data Breaches",
  locations: "Locations",
};

const ResultItem = ({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`flex flex-col items-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl w-full h-full border border-gray-700 hover:border-[#39FF14] transition ${className}`}>
    <div className="text-neon text-3xl mb-3">{icon}</div>
    <h4 className="text-neon font-bold text-xs uppercase mb-1 tracking-wide">{label}</h4>
    <p className="text-gray-200 text-center text-sm">{value}</p>
  </div>
);

const Email = () => {
  const [email, setEmail] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Record<string, string> | string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setResult({
          passwords: "No Passwords Located",
          usernames: "No Usernames Located",
          phoneNumbers: "No Phone Numbers Located",
          relatedEmails: "No Related Emails Located",
          ips: "156.146.59.23",
          companies: "No Companies Located",
          dataBreaches: "No Breaches Located",
          locations: "No Locations Located",
        });
      } else {
        setResult("❌ Please enter a valid email address.");
      }
      setScanning(false);
    }, 1200);
  };

  // SVG lines for connecting cards in a 2x4 grid
  const renderLines = () => (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Vertical lines */}
      <line x1="25%" y1="13%" x2="25%" y2="87%" stroke="#26323a" strokeWidth="2" />
      <line x1="75%" y1="13%" x2="75%" y2="87%" stroke="#26323a" strokeWidth="2" />
      {/* Horizontal lines */}
      <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#26323a" strokeWidth="2" />
      <line x1="0%" y1="25%" x2="100%" y2="25%" stroke="#26323a" strokeWidth="2" />
      <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="#26323a" strokeWidth="2" />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6  text-[#39FF14]   ">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neon mb-2 flex items-center gap-3 drop-shadow-lg">
          <FaEnvelopeOpenText /> Email Scanning
        </h2>
        <p className="text-gray-300 mb-8 text-center max-w-lg mx-auto">
          Enter your email address to scan for breaches, exposures, and vulnerabilities across the web.
        </p>
        <form
          onSubmit={handleScan}
          className="flex flex-col gap-4 w-full max-w-md mx-auto"
        >
          <input
            type="email"
            className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neon placeholder-gray-400 shadow"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={scanning}
            required
          />
          <button
            type="submit"
            className="bg-[#00ff00]  text-black font-bold py-2 rounded hover:bg-lime-500 transition-all flex items-center justify-center shadow"
            disabled={scanning}
          >
            {scanning ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Scanning...
              </>
            ) : (
              "Scan Email"
            )}
          </button>
        </form>
      </div>

      {scanning && (
        <div className="mt-8 text-neon flex items-center gap-2">
          <FaSpinner className="animate-spin" /> Scanning in progress...
        </div>
      )}

      {typeof result === "string" && (
        <div className="mt-6 text-center text-lg text-red-400">{result}</div>
      )}

      {result && typeof result === "object" && (
        <div className="relative w-full max-w-6xl mt-12">
          {/* SVG lines behind the grid */}
          <div className="absolute inset-0">{renderLines()}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {resultOrder.map(({ key, icon }) => (
              <ResultItem
                key={key}
                icon={icon}
                label={resultLabels[key]}
                value={result[key]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;
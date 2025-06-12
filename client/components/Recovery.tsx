"use client";

export default function ForensicDataRecovery() {
  return (
    <section className="relative z-10 text-center py-24 px-6 bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-20 -left-32 w-[400px] h-[400px] bg-[#39FF14]/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-32 w-[400px] h-[400px] bg-[#39FF14]/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* Heading */}
      <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
        <span className="text-[#39FF14]">Unlock the Power</span><br />
        of Forensic Data Recovery
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
        Recover what&apos;s lost. Reveal hidden truths in digital evidence using advanced forensic tools and AI-powered recovery.
      </p>

      {/* CTA Button */}
      <button className="bg-[#39FF14] hover:bg-[#32cc10] text-black font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-md shadow-[#39FF14]/40">
        Try Recovery Now
      </button>

      {/* UI Preview Mock (Placeholder) */}
      <div className="mt-16 bg-[#0a0a0a] border border-[#39FF14]/10 rounded-xl p-6 max-w-4xl w-full shadow-inner shadow-[#39FF14]/10">
        <p className="text-left text-gray-200 text-sm font-mono">
          {/* Simulated dashboard */}
          Scanning Drive C:\ ...<br />
          3,254 files found • 29 corrupted sectors • Recovery ETA: 3m 22s
        </p>
      </div>
    </section>
  );
}

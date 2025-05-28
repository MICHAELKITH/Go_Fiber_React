import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#39FF14]/10 text-center p-6">
      <div className="bg-black/70 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <FaCheckCircle className="text-6xl text-[#39FF14] mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#39FF14] mb-4 drop-shadow-lg">
          Payment Successful <span role="img" aria-label="party">🎉</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
          Thank you for your purchase.<br />
          <span className="text-[#39FF14] font-semibold">Your protection plan is now active!</span>
        </p>
        <Link
          href="/"
          className="inline-block bg-[#39FF14] text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-[#32cd32] transition-all duration-200"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
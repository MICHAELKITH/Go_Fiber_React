import React from "react";
import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/30 text-center p-6">
      <div className="bg-black/70 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <FaTimesCircle className="text-6xl text-red-500 mb-4 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-4 drop-shadow-lg">
          Subscription Cancelled
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
          Your subscription process was cancelled.<br />
          If this was a mistake, you can try again or contact support for help.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-200"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
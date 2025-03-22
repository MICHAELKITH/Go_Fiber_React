"use client";
import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields!");
      return;
    }
    toast.success("✅ Logged in successfully!");
    console.log("Login:", { email, password });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-4">
      <Toaster />

      {/* Cybersecurity Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] pointer-events-none"></div>

      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-neon-green relative z-10 text-center">
        Login to 55 BLOCKS
      </h2>

      <form onSubmit={handleSubmit} className="relative z-10 bg-gray-900/80 p-6 rounded-lg w-full max-w-sm shadow-lg border border-green-500">
        <label className="block mb-2 text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded sm:text-lg"
          required
        />
        <label className="block mb-2 text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded sm:text-lg"
          required
        />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded sm:text-lg transition-transform hover:scale-105">
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-400 text-sm md:text-base text-center relative z-10">
        Don't have an account? <Link href="/signup" className="text-neon-green hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}

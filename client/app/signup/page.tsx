"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("🚨 Passwords do not match! 🚨");
      return;
    }
    console.log("Signup:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Cyber Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <h2 className="text-4xl font-bold mb-6 text-neon-green relative z-10 animate-flicker">
        Sign Up for 55 BLOCKS
      </h2>

      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-900/80 p-6 rounded-lg w-80 shadow-lg border border-green-500 relative z-10"
      >
        <label className="block mb-2 text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded outline-none transition"
          required
        />
        <label className="block mb-2 text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded outline-none transition"
          required
        />
        <label className="block mb-2 text-gray-300">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded outline-none transition"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded transition transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-gray-400 relative z-10">
        Already have an account?{" "}
        <Link href="/login" className="text-neon-green hover:underline">
          Login
        </Link>
      </p>

      {/* Security Warning */}
      <p className="mt-2 text-xs text-red-500 relative z-10">
        * Use a strong password with symbols, numbers, and uppercase letters.
      </p>

      {/* Glitch & Animation Effects */}
      <div className="absolute top-0 left-0 w-full h-full animate-glitch"></div>
    </div>
  );
}

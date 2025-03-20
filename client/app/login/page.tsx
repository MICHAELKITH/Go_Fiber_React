"use client";
import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields!", {
        position: "top-center",
        style: {
          borderRadius: "8px",
          background: "#1a1a1a",
          color: "#ff4d4d",
          border: "1px solid #ff4d4d",
        },
      });
      return;
    }

    toast.success("✅ Logged in successfully!", {
      position: "top-center",
      style: {
        borderRadius: "8px",
        background: "#1a1a1a",
        color: "#4dff4d",
        border: "1px solid #4dff4d",
      },
    });

    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Toaster Component */}
      <Toaster />

      {/* Cyber Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <h2 className="text-4xl font-bold mb-6 text-neon-green relative z-10 animate-flicker">
        Login to 55 BLOCKS
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
        <button 
          type="submit" 
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded transition transform hover:scale-105"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-400 relative z-10">
        Don't have an account?{" "}
        <Link href="/signup" className="text-neon-green hover:underline">
          Sign Up
        </Link>
      </p>

      {/* Subtle Animation Effects */}
      <div className="absolute top-0 left-0 w-full h-full animate-glitch"></div>
    </div>
  );
}

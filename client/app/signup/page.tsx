"use client";
import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("🚨 Passwords do not match!", {
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
    toast.success("✅ Account created successfully!", {
      position: "top-center",
      style: {
        borderRadius: "8px",
        background: "#1a1a1a",
        color: "#4dff4d",
        border: "1px solid #4dff4d",
      },
    });
    console.log("Signup:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Toaster Component */}
      <Toaster />

      {/* Cyber Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-neon-green relative z-10">
        Sign Up for 55 BLOCKS
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/80 p-6 sm:p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg border border-green-500 shadow-lg relative z-10"
      >
        <label className="block mb-2 text-gray-300 text-lg">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded outline-none transition"
          required
        />
        <label className="block mb-2 text-gray-300 text-lg">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded outline-none transition"
          required
        />
        <label className="block mb-2 text-gray-300 text-lg">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded outline-none transition"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded transition transform hover:scale-105"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-gray-400 text-sm sm:text-base relative z-10">
        Already have an account?{" "}
        <Link href="/login" className="text-neon-green hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

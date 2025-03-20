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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      {/* Toaster Component */}
      <Toaster />

      <h2 className="text-4xl font-bold mb-6 text-neon-green">Sign Up for 55 BLOCKS</h2>
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg w-80 border border-green-500 shadow-lg">
        <label className="block mb-2 text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded"
          required
        />
        <label className="block mb-2 text-gray-300">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded"
          required
        />
        <label className="block mb-2 text-gray-300">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-neon-green hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

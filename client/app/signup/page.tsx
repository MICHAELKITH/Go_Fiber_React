"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("🚨 All fields are required!", { position: "top-center" });
      return;
    }

    if (name.length < 3) {
      toast.error("🚨 Name must be at least 3 characters long!", {
        position: "top-center",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("🚨 Please enter a valid email address!", {
        position: "top-center",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast.error("🚨 Password must be at least 8 characters long!", {
        position: "top-center",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("🚨 Passwords do not match!", {
        position: "top-center",
        style: { borderRadius: "8px", background: "#1a1a1a", color: "#ff4d4d" },
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });

      toast.success("✅ Account created successfully!", {
        position: "top-center",
        style: { borderRadius: "8px", background: "#1a1a1a", color: "#4dff4d" },
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "❌ Registration failed!",
        {
          position: "top-center",
          style: { borderRadius: "8px", background: "#1a1a1a", color: "#ff4d4d" },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 relative">
      <Toaster />
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#39FF14] relative z-10">
        Sign Up for 55 BLOCKS
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/80 p-6 sm:p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg border border-green-500 shadow-lg relative z-10"
      >
        <label htmlFor="name" className="block mb-2 text-gray-300 text-lg">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          aria-label="Name"
          required
        />

        <label htmlFor="email" className="block mb-2 text-gray-300 text-lg">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          aria-label="Email"
          required
        />

        <label htmlFor="password" className="block mb-2 text-gray-300 text-lg">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          aria-label="Password"
          required
        />

        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-gray-300 text-lg"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          aria-label="Confirm Password"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded transition transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-gray-400 text-sm sm:text-base relative z-10">
        Already have an account?{" "}
        <Link href="/login" className="text-[#39FF14] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
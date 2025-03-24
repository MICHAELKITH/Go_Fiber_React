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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("🚨 All fields are required!", { position: "top-center" });
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
      await axios.post("http://localhost:4000/register", {
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
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Registration failed!", {
        position: "top-center",
        style: { borderRadius: "8px", background: "#1a1a1a", color: "#ff4d4d" },
      });
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
        <label className="block mb-2 text-gray-300 text-lg">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          required
        />

        <label className="block mb-2 text-gray-300 text-lg">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          required
        />

        <label className="block mb-2 text-gray-300 text-lg">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          required
        />

        <label className="block mb-2 text-gray-300 text-lg">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-[#39FF14] rounded outline-none transition"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded transition transform hover:scale-105 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
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
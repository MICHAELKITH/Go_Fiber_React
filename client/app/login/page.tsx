"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8; // Add more rules if needed
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("⚠️ Please enter a valid email address!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("⚠️ Password must be at least 8 characters long!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("✅ Logged in successfully!");
      console.log("Token:", data.token);

      // Store token securely (consider using cookies instead of localStorage)
      localStorage.setItem("token", data.token);

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
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

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gray-900/80 p-6 rounded-lg w-full max-w-sm shadow-lg border border-green-500"
      >
        <label htmlFor="email" className="block mb-2 text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded sm:text-lg"
          aria-label="Email"
          required
        />
        <label htmlFor="password" className="block mb-2 text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-black/70 text-green-400 border border-green-500 focus:ring-2 focus:ring-neon-green rounded sm:text-lg"
          aria-label="Password"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded sm:text-lg transition-transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-gray-400 text-sm md:text-base text-center relative z-10">
        Don't have an account?{" "}
        <Link href="/signup" className="text-neon-green hover:underline">
          Sign Up here
        </Link>
      </p>
    </div>
  );
}
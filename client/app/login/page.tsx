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
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`❌ ${error.message}`);
      } else {
        toast.error("❌ An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <Toaster />

      <div className="w-full max-w-md p-8 relative">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00] via-[#00ff00]/20 to-transparent opacity-20 blur-xl" />
        
        {/* Main container */}
        <div className="relative bg-black/80 backdrop-blur-sm border border-[#00ff00]/30 rounded-lg p-8 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <h2 className="text-center text-3xl font-bold text-[#00ff00] mb-8">
            LOGIN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="uppercase text-sm text-gray-400 mb-2 block">
                UserName
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-[#00ff00]/30 text-[#00ff00] p-3 rounded-md 
                focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] 
                placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="uppercase text-sm text-gray-400 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-[#00ff00]/30 text-[#00ff00] p-3 rounded-md 
                focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] 
                placeholder-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold py-3 rounded-md
              transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50
              disabled:hover:scale-100 shadow-[0_0_10px_rgba(0,255,0,0.3)]"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <div className="mt-6 flex justify-between items-center text-sm">
            <Link
              href="/forgot-password"
              className="text-gray-400 hover:text-[#00ff00] transition-colors"
            >
              FORGOT PASSWORD?
            </Link>
            <Link
              href="/signup"
              className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors"
            >
              SIGNUP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
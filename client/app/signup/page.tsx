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
    } catch (error) {
      let message = "❌ Registration failed!";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message, {
        position: "top-center",
        style: { borderRadius: "8px", background: "#1a1a1a", color: "#ff4d4d" },
      });
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <Toaster />

      <div className="w-full max-w-md p-8 relative">
        {/* Glowing border effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff00] via-[#00ff00]/20 to-transparent opacity-20 blur-xl" />
        
        {/* Main container */}
        <div className="relative bg-black/80 backdrop-blur-sm border border-[#00ff00]/30 rounded-lg p-8 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
          <h2 className="text-center text-3xl font-bold text-[#00ff00] mb-8">
            SIGN UP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="uppercase text-sm text-gray-400 mb-2 block">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 border border-[#00ff00]/30 text-[#00ff00] p-3 rounded-md 
                focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] 
                placeholder-gray-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="uppercase text-sm text-gray-400 mb-2 block">
                Email
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

            <div>
              <label className="uppercase text-sm text-gray-400 mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/50 border border-[#00ff00]/30 text-[#00ff00] p-3 rounded-md 
                focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] 
                placeholder-gray-500"
                placeholder="Confirm your password"
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
              {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-gray-400 hover:text-[#00ff00] transition-colors text-sm uppercase"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
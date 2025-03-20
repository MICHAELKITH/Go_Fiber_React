import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navbar />
      
      {/* Cybersecurity Themed Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 opacity-10">
        {[...Array(144)].map((_, i) => (
          <div key={i} className="w-full h-full bg-green-500 bg-opacity-10 animate-pulse"></div>
        ))}
      </div>
      
      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center text-center py-20 px-6 z-10">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-neon-green animate-flicker">
          55 BLOCKS Cybersecurity
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Securing Your Code, Shielding Your Data: Where Innovation Meets Protection.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

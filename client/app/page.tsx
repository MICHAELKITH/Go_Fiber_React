// import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          55 BLOCKS Cybersecurity
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Securing Your Code, Shielding Your Data: Where Innovation Meets Protection.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

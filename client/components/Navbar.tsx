import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        55 BLOCKS
      </Link>
      <div className="flex gap-4">
        <Link href="/login" className="hover:text-gray-300">
          Login
        </Link>
        <Link href="/signup" className="hover:text-gray-300">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

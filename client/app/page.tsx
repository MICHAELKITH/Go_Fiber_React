import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <Navbar />

      {/* Cybersecurity Animated Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 opacity-10">
        {[...Array(144)].map((_, i) => (
          <div
            key={i}
            className="w-full h-full bg-green-500 bg-opacity-10 animate-pulse"
            style={{ animationDelay: `${Math.random() * 2}s` }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center text-center py-20 px-6 z-10">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-[#39FF14] animate-flicker">
          55 BLOCKS Cybersecurity
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          Securing Your Code, Shielding Your Data: Where Innovation Meets Protection.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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

      {/* Why Choose Us Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-neon-green mb-6">Why Choose 55 BLOCKS?</h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            { title: "AI-Powered Security", desc: "Protecting your digital assets with real-time AI analysis." },
            { title: "End-to-End Encryption", desc: "Ensuring privacy and security for all your data." },
            { title: "Zero-Trust Framework", desc: "Verifying every request before granting access." },
            { title: "24/7 Cyber Threat Monitoring", desc: "Real-time protection against security breaches." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-green-400">{item.title}</h3>
              <p className="text-gray-300 mt-2">{item.desc}</p>
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-neon-green mb-6">Trusted By Industry Leaders</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["partner1.png", "partner2.png", "partner3.png", "partner4.png"].map((src, index) => (
            <Image
              key={index}
              src={`/${src}`}
              alt={`Partner ${index + 1}`}
              width={100}
              height={50}
              className="hover:scale-110 transition-transform"
            />
          ))}
        </div>
      </section>

      {/* Cutting-Edge Features Section */}
      <section className="relative z-10 text-center py-20 px-6 bg-gray-800">
        <h2 className="text-3xl font-bold text-neon-green mb-6">Cutting-Edge Features</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience the future of cybersecurity with our advanced solutions tailored for individuals and enterprises.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Biometric Authentication", desc: "Secure access using fingerprint and facial recognition." },
            { title: "Blockchain Security", desc: "Tamper-proof technology ensuring data integrity." },
            { title: "AI-Driven Threat Analysis", desc: "Neutralizing cyber threats before they occur." },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-black/70 border border-green-500 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-green-400">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-neon-green mb-6">What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            { name: "John Doe", feedback: "55 BLOCKS transformed our security infrastructure!" },
            { name: "Jane Smith", feedback: "The best cybersecurity solution we've ever used." },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
              <h4 className="text-green-400 mt-4 font-semibold">- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black text-gray-300 text-center py-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} 55 BLOCKS. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-2xl hover:text-neon-green transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-2xl hover:text-neon-green transition" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-2xl hover:text-neon-green transition" />
          </a>
        </div>
      </footer>
    </div>
  );
}
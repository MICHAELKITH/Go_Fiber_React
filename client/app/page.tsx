import Link from "next/link";



import { 
   FaShieldAlt, FaLock, 
  FaUserShield, FaRocket, FaBolt, FaCrown, FaCheck 
} from "react-icons/fa";
import DarkWebScan from "@/components/DarkWebScan";
import ForensicDataRecovery from "@/components/Recovery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className=" min-h-screen bg-[#0a0a0a] text-white overflow-hidden mt-8">
      

      {/* Enhanced Cybersecurity Background */}
      <div className="absolute inset-0 bg-[url('/cyber-bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 opacity-10">
        {[...Array(144)].map((_, i) => (
          <div
            key={i}
            className="w-full h-full bg-[#39FF14] bg-opacity-10 animate-pulse"
            style={{ 
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content with Enhanced Animation */}
      <main className="relative flex flex-col items-center justify-center text-center py-20 px-6 z-10 mt-12">
        <div className="relative">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00ff00] animate-pulse">
            55 BLOCKS
          </h1>
          <span className="absolute -inset-1 blur-lg bg-[#39FF14]/30 animate-pulse"></span>
        </div>
        <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl font-light tracking-wide">
          Securing Your Digital Future with Next-Gen Cybersecurity Solutions
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/login">
            <button className="group relative px-8 py-4 bg-transparent border-2 border-[#39FF14] text-[#39FF14] rounded-lg 
              overflow-hidden transition-all hover:text-black">
              <span className="relative z-10 font-bold text-lg uppercase tracking-wider">Login</span>
              <div className="absolute inset-0 bg-[#39FF14] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </Link>
          <Link href="/signup">
            <button className="group relative px-8 py-4 bg-[#39FF14] text-black rounded-lg overflow-hidden 
              transition-all hover:bg-[#32CD32] font-bold text-lg uppercase tracking-wider">
              Get Started
            </button>
          </Link>
        </div>
      </main>

      {/* Feature Cards with Icons */}
      <section className="relative z-10 text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-[#39FF14] mb-12 tracking-tight">Why Choose 55 BLOCKS?</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <FaShieldAlt className="text-4xl mb-4" />,
              title: "AI-Powered Security",
              desc: "Real-time threat detection powered by advanced artificial intelligence."
            },
            {
              icon: <FaLock className="text-4xl mb-4" />,
              title: "End-to-End Encryption",
              desc: "Military-grade encryption for all your sensitive data."
            },
            {
              icon: <FaUserShield className="text-4xl mb-4" />,
              title: "Zero-Trust Framework",
              desc: "Continuous verification for maximum security."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group relative p-8 bg-black/40 rounded-xl border border-[#39FF14]/30 hover:border-[#39FF14] 
                transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-[#39FF14] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#39FF14] mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

<section className="relative z-10 py-20 px-6">
  <h2 className="text-4xl font-bold text-center text-[#39FF14] mb-12 tracking-tight">
    Choose Your Protection Level
  </h2>
  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
    {[
      {
        icon: <FaRocket />,
        name: "Starter",
        price: "$29",
        period: "/month",
        features: [
          "Basic Threat Detection",
          "Email Security",
          "24/7 Support",
          "Up to 5 Users"
        ],
        btnText: "Get Started",
        btnStyle: "border-2 border-[#39FF14] text-[#39FF14]"
      },
      {
        icon: <FaBolt />,
        name: "Professional",
        price: "$99",
        period: "/month",
        features: [
          "Advanced Threat Detection",
          "Email & Cloud Security",
          "Priority Support",
          "Up to 20 Users",
          "Real-time Monitoring"
        ],
        btnText: "Go Pro",
        btnStyle: "bg-[#39FF14] text-black",
        popular: true
      },
      {
        icon: <FaCrown />,
        name: "Enterprise",
        price: "$299",
        period: "/month",
        features: [
          "Custom Security Solutions",
          "Full Infrastructure Protection",
          "24/7 Dedicated Support",
          "Unlimited Users",
          "AI-Powered Analysis",
          "Custom Integration"
        ],
        btnText: "Contact Sales",
        btnStyle: "border-2 border-[#39FF14] text-[#39FF14]"
      }
    ].map((plan, index) => (
      <div
        key={index}
        className={`relative group p-8 bg-black/40 rounded-xl border ${
          plan.popular 
            ? "border-[#39FF14] scale-105 transform" 
            : "border-[#39FF14]/30"
        } hover:border-[#39FF14] transition-all duration-300 hover:-translate-y-2`}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#39FF14] text-black px-4 py-1 rounded-full text-sm font-bold">
            MOST POPULAR
          </div>
        )}
        <div className="text-[#39FF14] text-4xl mb-6">
          {plan.icon}
        </div>
        <h3 className="text-2xl font-bold text-[#39FF14] mb-4">
          {plan.name}
        </h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">
            {plan.price}
          </span>
          <span className="text-gray-400">
            {plan.period}
          </span>
        </div>
        <ul className="mb-8 space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-300">
              <FaCheck className="text-[#39FF14] mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 
            hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] ${plan.btnStyle}`}
        >
          {plan.btnText}
        </button>
      </div>
    ))}
  </div>
</section>

<DarkWebScan />
<ForensicDataRecovery/>

      {/* Testimonials Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-neon-green mb-6">What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            { name: "Safaricom", feedback: "55 BLOCKS transformed our security infrastructure!" },
            { name: "Moringa", feedback: "The best cybersecurity solution we've ever used." },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            >
              <p className="text-gray-300 italic">&quot;{testimonial.feedback}&quot;</p>

              <h4 className="text-green-400 mt-4 font-semibold">- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>
<Footer/>

    
    </div>
  );
}
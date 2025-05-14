"use client";

import { FaLaptopCode, FaMobileAlt, FaDesktop, FaCreditCard, FaRobot, FaTools, FaPenNib } from "react-icons/fa";

export default function OtherServices() {
  const services = [
    {
      icon: <FaLaptopCode className="text-4xl text-[#39FF14] mb-4" />,
      title: "Website Development",
      description: "Custom websites tailored to your business needs with modern designs and responsive layouts.",
    },
    {
      icon: <FaMobileAlt className="text-4xl text-[#39FF14] mb-4" />,
      title: "Mobile App Development",
      description: "Cross-platform mobile apps for iOS and Android with seamless user experiences.",
    },
    {
      icon: <FaDesktop className="text-4xl text-[#39FF14] mb-4" />,
      title: "Desktop App Development",
      description: "Robust desktop applications for Windows, macOS, and Linux platforms.",
    },
    {
      icon: <FaCreditCard className="text-4xl text-[#39FF14] mb-4" />,
      title: "Payment Integration",
      description: "Secure and reliable payment gateway integration for your e-commerce platforms.",
    },
    {
      icon: <FaRobot className="text-4xl text-[#39FF14] mb-4" />,
      title: "AI Integration",
      description: "Leverage artificial intelligence to automate processes and enhance user experiences.",
    },
    {
      icon: <FaTools className="text-4xl text-[#39FF14] mb-4" />,
      title: "Technical Assistance",
      description: "Expert support for web development, troubleshooting, and performance optimization.",
    },
    {
      icon: <FaPenNib className="text-4xl text-[#39FF14] mb-4" />,
      title: "Technical Writing",
      description: "Professional documentation, user guides, and technical content for your projects.",
    },
  ];

  return (
    <section className="relative z-10 text-center py-20 px-6">
      <h2 className="text-4xl font-bold text-[#39FF14] mb-12 tracking-tight">Our Other Services</h2>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative p-8 bg-black/40 rounded-xl border border-[#39FF14]/30 hover:border-[#39FF14] 
              transition-all duration-300 hover:-translate-y-2"
          >
            <div className="group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-[#39FF14] mb-4">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
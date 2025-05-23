"use client"


import React, { useState } from "react";
import { FaRocket, FaBolt, FaCrown, FaCheck } from "react-icons/fa";

const Pricing = () => {
  const [activePlan, setActivePlan] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActivePlan(activePlan === index ? null : index);
  };

  return (
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
              "Up to 5 Users",
            ],
            btnText: "Get Started",
            btnStyle: "border-2 border-[#39FF14] text-[#39FF14]",
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
              "Real-time Monitoring",
            ],
            btnText: "Go Pro",
            btnStyle: "bg-[#39FF14] text-black",
            popular: true,
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
              "Custom Integration",
            ],
            btnText: "Contact Sales",
            btnStyle: "border-2 border-[#39FF14] text-[#39FF14]",
          },
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
            <div className="text-[#39FF14] text-4xl mb-6">{plan.icon}</div>
            <h3 className="text-2xl font-bold text-[#39FF14] mb-4">
              {plan.name}
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">
                {plan.price}
              </span>
              <span className="text-gray-400">{plan.period}</span>
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
              onClick={() => toggleAccordion(index)}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 
                hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] ${plan.btnStyle}`}
            >
              {plan.btnText}
            </button>

            {/* Accordion Content */}
            {activePlan === index && (
              <div className="mt-4 bg-[#121212] p-4 rounded-lg text-left text-gray-300">
                <h4 className="text-lg font-bold text-[#39FF14] mb-2">
                  Payment Details
                </h4>
                <p className="text-sm mb-2">
                  Proceed to payment for the <strong>{plan.name}</strong> plan.
                </p>
                <button className="w-full bg-[#39FF14] hover:bg-[#32CD32] text-black font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105">
                  Pay Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
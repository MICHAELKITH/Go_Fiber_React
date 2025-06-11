"use client";
import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpenText,
  FaShareAlt,
  FaNetworkWired,
  FaRobot,
  FaCreditCard,
  FaUser,
  FaTasks,
  FaChartBar,
  FaLifeRing,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Email from "../email/page";
import SocialMedia from "../social/page";
import DomainPorts from "../domain/page";
import BlocksAI from "../ai/page";
import Billing from "../billing/page";

const sidebarItems = [
  { title: "Email Scanning", icon: <FaEnvelopeOpenText /> },
  { title: "Social Media Scanning", icon: <FaShareAlt /> },
  { title: "Domain Ports", icon: <FaNetworkWired /> },
  { title: "55 Blocks AI", icon: <FaRobot /> },
  { title: "Billing", icon: <FaCreditCard /> },
  { title: "Logout", icon: <FaSignOutAlt /> },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [username, setUsername] = useState("User");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fetch user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.name || data.email || "User");
        }
      } catch (err) {
        // Handle fetch error
        setUsername("User");
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Render main content based on activeLink
  const renderContent = () => {
    switch (activeLink) {
      case "Email Scanning":
        return <Email />;
      case "Social Media Scanning":
        return <SocialMedia />;
      case "Domain Ports":
        return <DomainPorts />;
      case "55 Blocks AI":
        return <BlocksAI />;
      case "Billing":
        return <Billing />;
      default:
        return (
          <>
            <p className="text-gray-300 mb-6">Activities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Tasks Completed", value: "120", icon: <FaTasks /> },
                { title: "Reports Generated", value: "45", icon: <FaChartBar /> },
                { title: "Support Tickets", value: "8", icon: <FaLifeRing /> },
              ].map((widget, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl text-[#39FF14]">{widget.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#39FF14]">
                      {widget.title}
                    </h3>
                    <p className="text-2xl font-bold text-white">{widget.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex bg-gradient-to-br from-black via-gray-900 to-red-900/30">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 p-6 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 w-64 z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#39FF14]">55 BLOCKS</h2>
          <button
            className="md:hidden text-2xl text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="space-y-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-4 py-2 px-4 rounded transition w-full text-left ${
                activeLink === item.title
                  ? "bg-gray-700 text-[#39FF14] border-l-4 border-[#39FF14]"
                  : "hover:bg-gray-700 hover:text-[#39FF14]"
              }`}
              onClick={() => {
                setActiveLink(item.title);
                setIsSidebarOpen(false);
                if (item.title === "Logout") {
                  setShowLogoutModal(true); // Show modal instead of redirect
                }
              }}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-xs w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-[#39FF14]">Logout?</h3>
            <p className="mb-6 text-gray-300">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-[#39FF14] text-black font-bold px-6 py-2 rounded hover:bg-lime-500 transition"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                OK
              </button>
              <button
                className="bg-gray-700 text-white font-bold px-6 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gray-800 py-4 px-6 shadow-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#39FF14]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-2">
              <FaUser className="text-white text-xl" />
              <span className="text-[#39FF14] font-semibold">Welcome, {username}</span>
            </div>
            <button
              className="md:hidden text-2xl text-white focus:outline-none"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Sidebar"
            >
              <FaBars />
            </button>
          </div>
        </header>

        <main className="p-16 md:ml-72">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
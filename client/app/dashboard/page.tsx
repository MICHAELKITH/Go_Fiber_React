"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaTasks, FaCog, FaChartBar, FaLifeRing, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
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
          {[
            { title: "Profile", link: "/profile", icon: <FaUser /> },
            { title: "Tasks", link: "/tasks", icon: <FaTasks /> },
            { title: "Settings", link: "/settings", icon: <FaCog /> },
            { title: "Reports", link: "/reports", icon: <FaChartBar /> },
            { title: "Support", link: "/support", icon: <FaLifeRing /> },
            { title: "Logout", link: "/", icon: <FaSignOutAlt /> },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center gap-4 py-2 px-4 rounded hover:bg-gray-700 hover:text-[#39FF14] transition"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gray-800 py-4 px-6 shadow-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#39FF14]">Dashboard</h1>
          <button
            className="md:hidden text-2xl text-white focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Sidebar"
          >
            <FaBars />
          </button>
        </header>

        {/* Main Section */}
        <main className="p-6">
          <p className="text-gray-300">Welcome to your dashboard! Select an option from the sidebar.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
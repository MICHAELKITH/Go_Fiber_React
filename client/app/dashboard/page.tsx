"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaTasks,
  FaCog,
  FaChartBar,
  FaLifeRing,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

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
              className={`flex items-center gap-4 py-2 px-4 rounded transition ${
                activeLink === item.title
                  ? "bg-gray-700 text-[#39FF14] border-l-4 border-[#39FF14]"
                  : "hover:bg-gray-700 hover:text-[#39FF14]"
              }`}
              onClick={() => {
                setActiveLink(item.title);
                setIsSidebarOpen(false); 
              }}
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
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button
                className="text-white text-xl focus:outline-none"
                aria-label="User Menu"
              >
                <FaUser />
              </button>
              <div className="absolute right-0 mt-2 bg-gray-800 text-sm rounded shadow-lg hidden group-hover:block">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-[#39FF14]"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-[#39FF14]"
                >
                  Settings
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-[#39FF14]"
                >
                  Logout
                </Link>
              </div>
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

        {/* Main Section */}
        <main className="p-16 md:ml-72">
          <p className="text-gray-300 mb-6">
            Activities
          </p>

        
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
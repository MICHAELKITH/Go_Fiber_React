import React from 'react'
import {
  
    FaNetworkWired,
  
  } from "react-icons/fa";
const DomainPorts = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold text-[#39FF14] mb-4 flex items-center gap-2">
      <FaNetworkWired /> Domain Ports
    </h2>
    <p className="text-gray-300">Check open ports and vulnerabilities for your domains.</p>
  </div>
);

export default DomainPorts 

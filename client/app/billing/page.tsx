import React from 'react'
import {
   
    FaCreditCard,
   
  } from "react-icons/fa";

const Billing = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold text-[#39FF14] mb-4 flex items-center gap-2">
      <FaCreditCard /> Billing
    </h2>
    <p className="text-gray-300">Manage your subscription and payment history.</p>
  </div>
);

export default Billing

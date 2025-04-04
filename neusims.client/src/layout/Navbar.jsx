import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TABS } from "../config/MenuConfig";
import { useMenu } from "../context/MenuContext";

const Navbar = () => {
  const { selectedTab, setSelectedTab } = useMenu();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens)
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="flex items-center space-x-3 p-2">
        <a className="text-xl font-bold bg-gray-50 " href="/">
          <span className="text-blue-700">Neu</span>
          <span className="text-red-700">SMIS</span>
        </a>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded ${
              selectedTab === tab ? "bg-blue-700" : ""
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="flex items-center space-x-4">
          <span className="hover:underline cursor-pointer">
            Change Password
          </span>
          <FaUserCircle size={24} />
          <a href="#" onClick={handleLogout} className="hover:underline">
            Log Out
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

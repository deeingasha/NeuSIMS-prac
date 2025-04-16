import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TABS } from "../config/MenuConfig";
import { useMenu } from "../context/MenuContext";
import { authService } from "../services/authService";

const Navbar = () => {
  const { selectedTab, setSelectedTab } = useMenu();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Execute logout logic
    authService.logout();
    // Then navigate to login page
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="flex justify-between items-center p-2">
        {/* Left side with logo and navigation */}
        <div className="flex items-center space-x-6">
          <a
            className="text-xl font-bold bg-gray-50 px-2 py-1 rounded"
            href="/"
          >
            <span className="text-blue-700">Neu</span>
            <span className="text-red-700">SMIS</span>
          </a>
          <div className="flex items-center space-x-1 text-sm">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${
                  selectedTab === tab ? "bg-blue-700" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right side with user actions */}
        <div className="flex items-center space-x-3 text-sm">
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

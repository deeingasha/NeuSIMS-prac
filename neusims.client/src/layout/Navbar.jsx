import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmailSMSDropdown from "@components/modules/EmailSMSDropdown";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Navbar = ({ onTabClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    "Parameter Settings",
    "School Administration",
    "System Administration",
    "Finance",
    "Library",
    "Reports",
    "Email/SMS",
    "Help",
  ];

  // Get the current selected tab from localStorage
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("selectedTab") || "School Administration"
  );

  const findActiveTab = (path) => {
    const segment = path.split("/")[1]?.toLowerCase();
    const matchedTab = tabs.find(
      (tab) => tab.toLowerCase().replace(/ /g, "-") === segment
    );
    return matchedTab || "School Administration";
  };

  const handleTabClick = (tab) => {
    if (tab === "Email/SMS") {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setActiveTab(tab); // Update local state
      onTabClick(tab); // Update parent state
    }
  };

  // Update activeTab when route changes
  useEffect(() => {
    const newTab = findActiveTab(location.pathname);
    setActiveTab(newTab);
    onTabClick(newTab);
  }, [location.pathname]);

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens)
    navigate("/login");
  };

  return (
    <nav className="navbar bg-blue-600 text-white p-4 flex justify-between items-center w-full">
      <div className="flex items-center space-x-4">
        <a className="text-xl font-bold bg-gray-50 " href="/">
          <span className="text-blue-700">Neu</span>
          <span className="text-red-700">SMIS</span>
        </a>

        {tabs.map((tab) => (
          <div key={tab} className="relative">
            <a
              href="#"
              onClick={() => handleTabClick(tab)}
              className={`hover:underline cursor-pointer ${
                activeTab === tab ? "text-yellow-300 font-bold" : ""
              }`}
            >
              {tab}
            </a>
            {tab === "Email/SMS" && isDropdownOpen && <EmailSMSDropdown />}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <span className="hover:underline cursor-pointer">Change Password</span>
        <FaUserCircle size={24} />
        <a href="#" onClick={handleLogout} className="hover:underline">
          Log Out
        </a>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onTabClick: PropTypes.func.isRequired,
};

export default Navbar;

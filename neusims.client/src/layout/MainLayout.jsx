import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    // Initialize from localStorage or default to "School Administration"
    return localStorage.getItem("selectedTab") || "School Administration";
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab); // Save to localStorage
  };

  // Update selectedTab when route changes
  useEffect(() => {
    const tab = localStorage.getItem("selectedTab");
    if (tab) {
      setSelectedTab(tab);
    }
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar onTabClick={handleTabClick} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedTab={selectedTab} />
        <main className="p-4 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

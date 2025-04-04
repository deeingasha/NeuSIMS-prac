import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    const path = location.pathname.split("/")[1];
    // Convert path to tab name (e.g., "school-administration" to "School Administration")
    if (path) {
      const tabName = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return tabName;
    }
    return "School Administration";
  });

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
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
      <Navbar onTabClick={handleTabClick} selectedTab={selectedTab} />
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

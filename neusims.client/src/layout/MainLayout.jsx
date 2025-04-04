import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [selectedTab, setSelectedTab] = useState("School Administration");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onTabClick={handleTabClick} />
      <div className="flex flex-1">
        <Sidebar selectedTab={selectedTab} />
        <main className="p-4 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

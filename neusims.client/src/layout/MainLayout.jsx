import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { MenuProvider } from "../context/MenuContext";

const MainLayout = () => {
  // const [selectedTab, setSelectedTab] = useState(() => {
  //   const path = location.pathname.split("/")[1];
  //   // Convert path to tab name (e.g., "school-administration" to "School Administration")
  //   if (path) {
  //     const tabName = path
  //       .split("-")
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(" ");
  //     return tabName;
  //   }
  //   return "School Administration";
  // });

  // const handleTabClick = (tab) => {
  //   setSelectedTab(tab);
  // };

  // In MainLayout.jsx

  // const location = useLocation();
  // const [selectedTab, setSelectedTab] = useState(() => {
  //   return localStorage.getItem("selectedTab") || "School Administration";
  // });

  // useEffect(() => {
  //   // Update selectedTab when URL changes, but only for main sections
  //   const path = location.pathname.split("/")[1];
  //   if (path) {
  //     // Find which tab owns this path
  //     const mainSection = Object.keys(menuItems).find((tab) => {
  //       return menuItems[tab].some(
  //         (menu) =>
  //           menu.title.toLowerCase().replace(/ /g, "-") === path ||
  //           menu.subItems.some(
  //             (sub) => sub.toLowerCase().replace(/ /g, "-") === path
  //           )
  //       );
  //     });

  //     if (mainSection) {
  //       setSelectedTab(mainSection);
  //       localStorage.setItem("selectedTab", mainSection);
  //     }
  //   }
  // }, [location.pathname]);

  // const handleTabClick = (tab) => {
  //   setSelectedTab(tab);
  //   localStorage.setItem("selectedTab", tab);
  // };

  return (
    <MenuProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </MenuProvider>
  );
};

export default MainLayout;

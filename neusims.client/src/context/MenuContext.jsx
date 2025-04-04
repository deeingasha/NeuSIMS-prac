import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TABS, menuItems } from "../config/MenuConfig";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(() => {
    return localStorage.getItem("selectedTab") || TABS[0];
  });

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

  // useEffect(() => {
  //   const path = location.pathname.split("/")[1];
  //   for (const tab of TABS) {
  //     if (
  //       menuItems[tab].some(
  //         (menu) => menu.title.toLowerCase().replace(/ /g, "-") === path
  //       )
  //     ) {
  //       setSelectedTab(tab);
  //       break;
  //     }
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    if (pathSegments.length >= 2) {
      // Find the tab that contains both the menu and subitem
      for (const tab of TABS) {
        const hasPath = menuItems[tab].some(
          (menu) =>
            menu.title.toLowerCase().replace(/ /g, "-") === pathSegments[0] &&
            menu.subItems.some(
              (sub) => sub.toLowerCase().replace(/ /g, "-") === pathSegments[1]
            )
        );

        if (hasPath) {
          setSelectedTab(tab);
          break;
        }
      }
    }
  }, [location.pathname]);
  return (
    <MenuContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);

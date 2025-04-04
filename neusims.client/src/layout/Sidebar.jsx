import { useState, useEffect } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems, getMenuPath } from "../config/MenuConfig";
import { useMenu } from "../context/MenuContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const { selectedTab } = useMenu();

  // Get current path segments
  const currentPath = location.pathname;
  const pathSegments = currentPath.split("/").filter(Boolean);

  const toggleSidebar = () => setIsOpen(!isOpen);
  // const toggleMenu = (title) => {
  //   setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  // };

  // Add this useEffect to handle initial open menu based on URL
  useEffect(() => {
    if (pathSegments.length >= 2) {
      const currentMenu = menuItems[selectedTab]?.find(
        (menu) =>
          menu.title.toLowerCase().replace(/ /g, "-") === pathSegments[0] &&
          menu.subItems.some(
            (sub) => sub.toLowerCase().replace(/ /g, "-") === pathSegments[1]
          )
      );

      if (currentMenu) {
        setOpenMenus({ [currentMenu.title]: true });
      }
    }
  }, [selectedTab, currentPath]);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      [title]: !prev[title],
    }));
  };

  return (
    <aside
      className={`flex flex-col bg-blue-600 bg-opacity-90 text-gray-50 transition-all ${
        isOpen ? "w-64" : "w-20"
      } overflow-hidden`}
    >
      <div className="flex justify-between items-center px-4 py-3 flex-shrink-0">
        <h2
          className={`text-lg font-bold transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {selectedTab}
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2rounded hover:bg-blue-700 transition-colors"
        >
          {isOpen ? (
            <FaAngleDoubleLeft size={20} />
          ) : (
            <FaAngleDoubleRight size={20} />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems[selectedTab]?.map((menu, idx) => (
          <div key={idx} className="px-4 py-1">
            <button
              onClick={() => toggleMenu(menu.title)}
              className={`w-full text-left font-semibold px-3 py-2 rounded transition-colors ${
                pathSegments[0] ===
                  menu.title.toLowerCase().replace(/ /g, "-") &&
                currentPath.startsWith(
                  `/${menu.title.toLowerCase().replace(/ /g, "-")}`
                )
                  ? "bg-blue-700" //TODO find better indicator for active menu
                  : "hover:bg-blue-700/50"
              }`}
            >
              {menu.title}
            </button>
            {openMenus[menu.title] && (
              <ul className="pl-4 mt-2 space-y-1">
                {menu.subItems.map((sub, subIdx) => {
                  // Construct the full path for this item
                  const itemPath = `/${menu.title
                    .toLowerCase()
                    .replace(/ /g, "-")}/${sub
                    .toLowerCase()
                    .replace(/ /g, "-")}`;

                  return (
                    <li
                      key={subIdx}
                      className={`block py-2 px-3 text-sm rounded hover:underline transition-colors ${
                        currentPath === itemPath
                          ? "bg-blue-700"
                          : "hover:bg-blue-700/50"
                      }`}
                    >
                      <Link to={itemPath}>{sub}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

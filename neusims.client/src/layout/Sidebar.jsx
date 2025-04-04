import { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const menuItems = {
  "Parameter Settings": [
    {
      title: "School Information",
      subItems: ["School Information", "Department"],
    },
    { title: "Salutation", subItems: ["Salutation"] },
    { title: "Staff Job Type", subItems: ["Job Type"] },
    {
      title: "Academic Settings",
      subItems: [
        "Year/Term",
        "Class/Stream",
        "Subject Setting",
        "Exam Setting",
      ],
    },
    {
      title: "Email Settings",
      subItems: ["Email Settings", "SMS Server Settings"],
    },
    { title: "Bank Settings", subItems: ["Bank Settings"] },
  ],
  "School Administration": [
    { title: "Holiday Management", subItems: [] },
    { title: "Registration", subItems: ["Student", "Staff", "Student Status"] },
    { title: "Identity Card", subItems: ["Student", "Staff"] },
    { title: "Class Allocation", subItems: ["Student", "Staff"] },
    { title: "Subject Allocation", subItems: ["Student", "Staff"] },
    {
      title: "Exams",
      subItems: ["Mark Entry", "Summary", "Comments", "Test Selection"],
    },
    { title: "Attendance", subItems: ["Attendance", "Attendance Status"] },
  ],
  "System Administration": [
    { title: "User Accounts", subItems: ["User Account"] },
    { title: "Data Backup", subItems: ["Data Backup"] },
  ],
  Finance: [
    {
      title: "Finance Settings",
      subItems: ["Finance Settings", "Due Date Settings"],
    },
    {
      title: "Fee and Receipt Processing",
      subItems: ["Fee Selection", "Fee Receipt/Details"],
    },
    { title: "Pocket Money Processing", subItems: ["Pocket Money"] },
  ],
  Library: [
    {
      title: "Library Settings",
      subItems: ["Book Subjects", "Add Material", "Loan Type"],
    },
    {
      title: "Library Class Books",
      subItems: ["Add Class Books", "Issue Books", "Return Books"],
    },
    {
      title: "Library Books",
      subItems: [
        "Add Library Books",
        "Issue Library Books",
        "Return Library Books",
      ],
    },
  ],
  Reports: [
    {
      title: "Staff/Student Lists",
      subItems: [
        "All Staff",
        "Teacher Per Class",
        "Staff List per Job Type",
        "Student List Per Class",
        "Student Per House",
      ],
    },
    {
      title: "Academic Reports",
      subItems: [
        "Subject List/Group",
        "Subject List/Student",
        "Subject List/Teacher",
        "Attendance/Class",
        "Progress Report",
        "End Term Report",
        "End Term Report",
        "All Marks Summary",
        "Learner's Competency",
      ],
    },
    {
      title: "Finance Reports",
      subItems: [
        "Fee Structure",
        "Fee Invoice",
        "Fee Statement Per Class",
        "Fee Statement Per Student",
        "All Students' Balance",
        "Pocket Money Balance",
      ],
    },
    {
      title: "Library Reports",
      subItems: [
        "Books Issued Per Date",
        "Books Due Per Date",
        "Books Overdue",
        "Lost Books",
      ],
    },
  ],
};

const Sidebar = ({ selectedTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
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
          Menu
        </h2>
        <button onClick={toggleSidebar} className="p-2">
          {isOpen ? (
            <FaAngleDoubleLeft size={20} />
          ) : (
            <FaAngleDoubleRight size={20} />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems[selectedTab]?.map((menu, idx) => (
          <div key={idx} className="px-4 py-2">
            <button
              onClick={() => toggleMenu(menu.title)}
              className="w-full text-left font-semibold"
            >
              {menu.title}
            </button>
            {openMenus[menu.title] && (
              <ul className="pl-4 mt-2">
                {menu.subItems.map((sub, subIdx) => (
                  <li
                    key={subIdx}
                    className="py-1 text-sm hover:underline cursor-pointer"
                  >
                    <Link
                      to={`/${menu.title.toLowerCase().replace(/ /g, "-")}/${sub
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
Sidebar.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default Sidebar;

export const TABS = [
  "Parameter Settings",
  "School Administration",
  "System Administration",
  "Finance",
  "Library",
  "Reports",
  "Email-SMS",
  "Help",
];

export const menuItems = {
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
        "Year-Term",
        "Class-Stream",
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
      subItems: ["Fee Selection", "Fee Receipt-Details"],
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
      title: "Staff-Student Lists",
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
        "Subject List-Group",
        "Subject List-Student",
        "Subject List-Teacher",
        "Attendance-Class",
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
  "Email-SMS": [
    {
      title: "Email-SMS",
      subItems: ["Email", "SMS via Modem", "SMS via Server"],
    },
  ],
};

export const getMenuPath = (menuTitle, subItem) => {
  return `/${menuTitle.toLowerCase().replace(/ /g, "-")}/${subItem
    .toLowerCase()
    .replace(/ /g, "-")}`;
};

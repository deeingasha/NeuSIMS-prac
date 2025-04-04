import { useState } from "react";
import StudentTable from "@components/modules/student/StudentTable";
import StudentForm from "@components/modules/student/StudentForm";
// import StudentTable from "../../components/modules/student/StudentTable";
// import StudentForm from "../../components/modules/student/StudentForm";

const StudentRegistration = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="p-4">
      {/* Header Section */}
      <h1 className="text-2xl font-bold mb-4">Student Registration</h1>

      {/* Tabs for Active Students & Alumni */}
      <div className="tabs mb-4">
        <button
          className={`tab tab-bordered ${
            activeTab === "active" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Students
        </button>
        <button
          className={`tab tab-bordered ${
            activeTab === "alumni" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("alumni")}
        >
          Alumni
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Student..."
        className="input input-bordered w-full mb-4"
      />

      {/* Student Table */}
      <StudentTable activeTab={activeTab} />

      {/* Student Form */}
      <StudentForm />
    </div>
  );
};

export default StudentRegistration;

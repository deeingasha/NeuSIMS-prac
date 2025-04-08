import { useState } from "react";
import SubjectAllocationTab from "@components/modules/subjectAllocation/SubjectAllocationTab";
import EditSubjectAllocationTab from "@components/modules/subjectAllocation/EditSubjectAllocation";

const StudentSubjectAllocation = () => {
  const [activeTab, setActiveTab] = useState("allocation");
  const [filters, setFilters] = useState({
    academicYear: "2024-2025",
    classGroup: "Secondary",
    class: "Grade 10",
    stream: "Blue",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefresh = () => {
    console.log("Refreshing with filters:", filters);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Filters Section */}
      <div className="border rounded-lg p-4 shadow">
        <div className="grid grid-cols-5 gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-24">Academic Year:</label>
            <select
              name="academicYear"
              value={filters.academicYear}
              onChange={handleFilterChange}
              className="select select-xs select-bordered w-36"
            >
              <option>2024-2025</option>
              <option>2023-2024</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-24">Class Group:</label>
            <select
              name="classGroup"
              value={filters.classGroup}
              onChange={handleFilterChange}
              className="select select-xs select-bordered w-36"
            >
              <option>Secondary</option>
              <option>Primary</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-20">Class:</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="select select-xs select-bordered w-36"
            >
              <option>Grade 10</option>
              <option>Grade 11</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-20">Stream:</label>
            <select
              name="stream"
              value={filters.stream}
              onChange={handleFilterChange}
              className="select select-xs select-bordered w-36"
            >
              <option>Blue</option>
              <option>Red</option>
            </select>
          </div>

          <button onClick={handleRefresh} className="btn btn-xs btn-primary">
            Refresh Screen
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-bordered mb-4">
        <button
          className={`tab tab-xs ${
            activeTab === "allocation" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("allocation")}
        >
          Subject Allocation
        </button>
        <button
          className={`tab tab-xs ${activeTab === "edit" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Subject Allocation
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "allocation" ? (
        <SubjectAllocationTab filters={filters} />
      ) : (
        <EditSubjectAllocationTab filters={filters} />
      )}
    </div>
  );
};

export default StudentSubjectAllocation;

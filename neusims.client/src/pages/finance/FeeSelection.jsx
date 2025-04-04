// src/pages/FeeSelection.jsx
import { useState } from "react";
import StudentFeeSelection from "../components/Finance/StudentFeeSelection";
import EditFeeSelection from "../components/Finance/EditFeeSElection";

const FeeSelection = () => {
  const [activeTab, setActiveTab] = useState("feeSelection");
  const [feeType, setFeeType] = useState("fresh"); // fresh or term

  // Reusable Filter Field Component
  const FilterField = ({ label, name, options }) => {
    return (
      <div className="flex items-center">
        <label className="text-xs font-medium w-32">{label}:</label>
        <select name={name} className="select select-xs select-bordered w-48">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Page Title as Tab
      <div className="relative h-8">
        <div className="absolute top-0 left-4 ">
          <div className="inline-block bg-white border border-b-0">
            <h1 className="text-lg font-semibold px-6">
              Student Fee Selection
            </h1>
          </div>
        </div>
        <div className="border-b absolute bottom-0 w-full"></div>
      </div> */}

      <div className="p-4 bg-white rounded-lg shadow-md">
        {/* Top Panel - Filters */}
        <div className="border-b pb-4 mb-4 space-y-6">
          {/* Grid Container for all filter lines */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-4">
            {/* First Line */}
            <div className="col-span-3 flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="feeType"
                  value="fresh"
                  checked={feeType === "fresh"}
                  onChange={(e) => setFeeType(e.target.value)}
                  className="radio radio-xs"
                />
                <span className="text-xs font-medium">Fresh Fee Selection</span>
              </label>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-6">
              <FilterField
                label="Academic Year"
                name="academicYear"
                options={["2025", "2024", "2023"]}
              />
              <FilterField
                label="Class Group"
                name="classGroup"
                options={["Primary", "Secondary"]}
              />
              <FilterField
                label="Primary Sub Group"
                name="subGroup"
                options={["Lower Primary", "Upper Primary"]}
              />
            </div>

            {/* Second Line */}
            <div className="col-span-3 flex items-center">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="feeType"
                  value="term"
                  checked={feeType === "term"}
                  onChange={(e) => setFeeType(e.target.value)}
                  className="radio radio-xs"
                />
                <span className="text-xs font-medium">Term Fee Selection</span>
              </label>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-6">
              <FilterField
                label="Term"
                name="term"
                options={["Term 1", "Term 2", "Term 3"]}
              />
              <FilterField
                label="Class"
                name="class"
                options={["Grade 10", "Grade 11", "Grade 12"]}
              />
              <FilterField
                label="Stream"
                name="stream"
                options={["Blue", "Red"]}
              />
            </div>

            {/* Third Line */}
            <div className="col-span-6 grid grid-cols-2 gap-6">
              <FilterField
                label="Invoice Number"
                name="invoiceNumber"
                options={["INV001", "INV002", "INV003"]}
              />
              <div className="flex items-center">
                <div className="w-32"></div>
                <button className="btn btn-xs btn-error w-48">
                  Cancel Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Panel - Tabs */}
        <div className="tabs tabs-bordered mb-4">
          <button
            className={`tab tab-xs ${
              activeTab === "feeSelection" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("feeSelection")}
          >
            Fee Selection
          </button>
          <button
            className={`tab tab-xs ${
              activeTab === "editFeeSelection" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("editFeeSelection")}
          >
            Edit Fee Selection
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === "feeSelection" ? (
          <StudentFeeSelection />
        ) : (
          <EditFeeSelection />
        )}
      </div>
    </div>
  );
};

export default FeeSelection;

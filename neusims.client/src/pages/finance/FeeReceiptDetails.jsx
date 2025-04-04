import { useState } from "react";
import FeeReceiptTab from "../components/Finance/FeeReceiptTab";

const FeeReceipt = () => {
  const [activeTab, setActiveTab] = useState("feeReceipt");

  // Reusable Filter Field Component
  const FilterField = ({ label, name, options, value, onChange }) => {
    return (
      <div className="flex items-center">
        <label className="text-xs font-medium w-32">{label}:</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="select select-xs select-bordered w-48"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  };

  // Top panel filters state
  const [topFilters, setTopFilters] = useState({
    academicYear: "2025",
    term: "Term 1",
    class: "Grade 10",
  });

  const handleTopFilterChange = (e) => {
    const { name, value } = e.target;
    setTopFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log("Refreshing with filters:", topFilters);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-md">
        {/* Top Panel - Filters */}
        <div className="border-b pb-4 mb-4">
          <div className="grid grid-cols-4 gap-6 mb-4">
            <FilterField
              label="Academic Year"
              name="academicYear"
              options={["2025", "2024", "2023"]}
              value={topFilters.academicYear}
              onChange={handleTopFilterChange}
            />
            <FilterField
              label="Term"
              name="term"
              options={["Term 1", "Term 2", "Term 3"]}
              value={topFilters.term}
              onChange={handleTopFilterChange}
            />
            <FilterField
              label="Class"
              name="class"
              options={["Grade 10", "Grade 11", "Grade 12"]}
              value={topFilters.class}
              onChange={handleTopFilterChange}
            />
            <div className="flex items-center">
              <button onClick={handleRefresh} className="btn btn-xs">
                Refresh Screen
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Panel - Tabs */}
        <div className="tabs tabs-bordered mb-4">
          <button
            className={`tab tab-xs ${
              activeTab === "feeReceipt" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("feeReceipt")}
          >
            Fee Receipt
          </button>
          <button
            className={`tab tab-xs ${
              activeTab === "viewFeeStatement" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("viewFeeStatement")}
          >
            View Fee Statement
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "feeReceipt" ? (
          <FeeReceiptTab topFilters={topFilters} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            View Fee Statement functionality coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeReceipt;

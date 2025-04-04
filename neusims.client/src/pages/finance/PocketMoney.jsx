import { useState } from "react";

const PocketMoney = () => {
  // States for filters and form data
  const [filters, setFilters] = useState({
    academicYear: "2025",
    class: "Grade 10",
    stream: "Blue",
    searchStudent: "",
    dateFrom: "",
    dateTo: "",
  });

  const [pocketMoneyDetails, setPocketMoneyDetails] = useState({
    accountBalance: 5000,
    amount: "",
    description: "",
  });

  // Mock students data
  const [students] = useState([
    { id: 1, admNo: "ADM001", name: "John Doe" },
    { id: 2, admNo: "ADM002", name: "Jane Smith" },
  ]);

  // Handle input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePocketMoneyChange = (e) => {
    const { name, value } = e.target;
    setPocketMoneyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reusable Filter Field Component
  const FilterField = ({ label, name, options }) => (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium w-32">{label}:</label>
      <select
        name={name}
        value={filters[name]}
        onChange={handleFilterChange}
        className="select select-xs select-bordered w-48"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel */}
        <div className="space-y-4">
          {/* Filters */}
          <div className="space-y-4">
            <FilterField
              label="Academic Year"
              name="academicYear"
              options={["2025", "2024", "2023"]}
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
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">
                Search Student:
              </label>
              <input
                type="text"
                name="searchStudent"
                value={filters.searchStudent}
                onChange={handleFilterChange}
                className="input input-xs input-bordered w-48"
                placeholder="Enter student name/number"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="table-container">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="number-column">#</th>
                  <th>ADM No</th>
                  <th>Student Name</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100">
                    <td className="number-column"></td>
                    <td>{student.admNo}</td>
                    <td>{student.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Date Selection Fieldset */}
          <fieldset className="border rounded p-4">
            <legend className="text-sm font-medium px-2">
              Select Date for Statement
            </legend>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-12">From:</label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    className="input input-xs input-bordered w-36"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-12">To:</label>
                  <input
                    type="date"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    className="input input-xs input-bordered w-36"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn btn-xs">Generate Statement</button>
              </div>
            </div>
          </fieldset>

          {/* Pocket Money Section */}
          <div className="border rounded-lg p-4">
            <div className="tabs tabs-bordered mb-4">
              <button className="tab tab-xs tab-active">Pocket Money</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-32">
                  Account Balance:
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    name="accountBalance"
                    value={pocketMoneyDetails.accountBalance}
                    onChange={handlePocketMoneyChange}
                    className="input input-xs input-bordered w-48 border-2"
                  />
                  <span className="text-xs">KShs.</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-32">Amount:</label>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    name="amount"
                    value={pocketMoneyDetails.amount}
                    onChange={handlePocketMoneyChange}
                    className="input input-xs input-bordered w-48 border-2"
                  />
                  <span className="text-xs">KShs.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <label className="text-xs font-medium w-32 mt-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={pocketMoneyDetails.description}
                  onChange={handlePocketMoneyChange}
                  rows="3"
                  className="textarea textarea-xs textarea-bordered w-48 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button className="btn btn-xs btn-primary">
                  Deposit Money
                </button>
                <button className="btn btn-xs btn-error">Withdraw Money</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PocketMoney;

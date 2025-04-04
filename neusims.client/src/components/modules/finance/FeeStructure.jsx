import { useState } from "react";

const FeeStructure = () => {
  // State for form controls
  const [filters, setFilters] = useState({
    academicYear: "2025",
    class: "Grade 10",
  });

  // Mock data for the fee structure table
  const [feeStructure, setFeeStructure] = useState([
    { id: 1, feeName: "Tuition Fee", amount: 50000 },
    { id: 2, feeName: "Development Fee", amount: 10000 },
    { id: 3, feeName: "Library Fee", amount: 5000 },
    { id: 4, feeName: "Caution Money", amount: 2000 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefresh = () => {
    // TODO: Fetch fee structure based on selected academic year and class
    console.log("Refreshing with filters:", filters);
  };

  return (
    <div className="p-4">
      {/* Filters Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium">Academic Year:</label>
          <select
            name="academicYear"
            value={filters.academicYear}
            onChange={handleChange}
            className="select select-xs select-bordered"
          >
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium">Class:</label>
          <select
            name="class"
            value={filters.class}
            onChange={handleChange}
            className="select select-xs select-bordered"
          >
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>
        </div>

        <button onClick={handleRefresh} className="btn btn-xs">
          Refresh Screen
        </button>
      </div>

      {/* Fee Structure Table */}
      <div className="border rounded-lg p-4 shadow w-2/3">
        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra w-full">
            <thead>
              <tr>
                <th className="number-column"># </th>
                <th className="border">Fee Name</th>
                <th className="border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((fee) => (
                <tr key={fee.feeName}>
                  <td className="number-column"></td>
                  <td>{fee.feeName}</td>
                  <td className="border text-right">
                    {fee.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              {/* <tr className="font-bold">
                <td className="border">Total</td>
                <td className="border text-right">
                  {feeStructure
                    .reduce((sum, fee) => sum + fee.amount, 0)
                    .toLocaleString()}
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;

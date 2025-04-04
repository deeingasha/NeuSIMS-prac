import { useState } from "react";

const TransportFeeStructure = () => {
  // State for form controls
  const [academicYear, setAcademicYear] = useState("2025");

  // Mock data for the transport fee structure table
  const [transportFees] = useState([
    { area: "Westlands and surrounding areas", amount: 25000 },
    { area: "Kilimani and Kileleshwa", amount: 20000 },
    { area: "Lavington and Karen", amount: 30000 },
  ]);

  const handleYearChange = (e) => {
    setAcademicYear(e.target.value);
  };

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium">Academic Year:</label>
          <select
            value={academicYear}
            onChange={handleYearChange}
            className="select select-xs select-bordered"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      {/* Transport Fee Structure Table */}
      <div className="border rounded-lg p-4 shadow w-2/3">
        <div className="overflow-x-auto">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="number-column">#</th>
                <th>Transport Area</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transportFees.map((fee, index) => (
                <tr key={fee.area}>
                  <td className="number-column"></td>
                  <td>{fee.area}</td>
                  <td className="text-right">{fee.amount.toLocaleString()}</td>
                </tr>
              ))}
              {/* Total Row */}
              {/* <tr className="font-bold">
                <td className="number-column"></td>
                <td>Total</td>
                <td className="text-right">
                  {transportFees
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

export default TransportFeeStructure;

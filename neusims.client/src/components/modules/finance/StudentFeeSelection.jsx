// src/components/Finance/StudentFeeSelection.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const StudentFeeSelection = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      admNo: "ADM001",
      name: "John Doe",
      selected: false,
      sponsored: true,
    },
  ]);

  const [transportDetails, setTransportDetails] = useState({
    area: "",
    type: "oneWay", // oneWay or twoWay
    amount: 0,
  });

  const [fees, setFees] = useState({
    regular: [
      { id: 1, name: "Tuition Fee", amount: 50000, selected: true },
      { id: 2, name: "Development Fee", amount: 10000, selected: true },
    ],
    other: [
      { id: 3, name: "Library Fee", amount: 5000 },
      { id: 4, name: "Sports Fee", amount: 2000 },
    ],
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Panel */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium">Student Search:</label>
          <input
            type="text"
            className="input input-xs input-bordered flex-grow"
            placeholder="Search students..."
          />
        </div>

        {/* Students Table */}
        <div className="border rounded-lg p-4">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th>Adm No</th>
                <th>Student Name</th>
                <th>Select</th>
                <th>Sponsored</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.admNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.selected}
                      onChange={() => {
                        /* handle change */
                      }}
                      className="checkbox checkbox-xs"
                    />
                  </td>
                  <td>{student.sponsored ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4">
        {/* Transport Details */}
        <fieldset className="border rounded-lg p-4">
          <legend className="text-xs font-medium px-2">
            Select area for transport
          </legend>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">
                Transport Area:
              </label>
              <select className="select select-xs select-bordered flex-grow">
                <option value="">Select Area</option>
                <option>Area 1</option>
                <option>Area 2</option>
              </select>
            </div>

            <div className="flex justify-center gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transportType"
                  value="oneWay"
                  checked={transportDetails.type === "oneWay"}
                  onChange={() => {
                    /* handle change */
                  }}
                  className="radio radio-xs"
                />
                <span className="text-xs">One Way</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transportType"
                  value="twoWay"
                  checked={transportDetails.type === "twoWay"}
                  onChange={() => {
                    /* handle change */
                  }}
                  className="radio radio-xs"
                />
                <span className="text-xs">Two Way</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Amount:</label>
              <input
                type="number"
                className="input input-xs input-bordered flex-grow"
                value={transportDetails.amount}
                onChange={() => {
                  /* handle change */
                }}
              />
            </div>
          </div>
        </fieldset>

        {/* Regular Fees Table */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-sm mb-2">Select Fee</h4>
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th>Fee Name</th>
                <th>Amount</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {fees.regular.map((fee) => (
                <tr key={fee.id}>
                  <td>{fee.name}</td>
                  <td className="text-right">{fee.amount.toLocaleString()}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={fee.selected}
                      onChange={() => {
                        /* handle change */
                      }}
                      className="checkbox checkbox-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Other Fees Table */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-sm mb-2">Other Fees</h4>
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th>Fee Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {fees.other.map((fee) => (
                <tr key={fee.id}>
                  <td>{fee.name}</td>
                  <td className="text-right">{fee.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeSelection;

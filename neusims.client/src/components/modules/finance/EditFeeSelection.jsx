import { useState } from "react";

const EditFeeSelection = () => {
  const [students] = useState([
    { id: 1, admNo: "ADM001", name: "John Doe", sponsored: true },
    { id: 2, admNo: "ADM002", name: "Jane Smith", sponsored: false },
  ]);

  const [transportDetails, setTransportDetails] = useState({
    area: "",
    type: "oneWay",
    amount: 0,
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Panel - Students Table */}
      <div className="border rounded-lg p-4">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th className="w-12">#</th>
              <th>ADM No</th>
              <th>Student Name</th>
              <th>Sponsored</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-100 cursor-pointer">
                <td className="number-column"></td>
                <td>{student.admNo}</td>
                <td>{student.name}</td>
                <td>{student.sponsored ? "Yes" : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Panel - Transport Details */}
      <div className="border rounded-lg p-4">
        <div className="space-y-6">
          {/* Transport Area Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-32">Transport Area:</label>
            <select
              value={transportDetails.area}
              onChange={(e) =>
                setTransportDetails((prev) => ({
                  ...prev,
                  area: e.target.value,
                }))
              }
              className="select select-xs select-bordered w-48"
            >
              <option value="">Select Area</option>
              <option value="area1">Area 1</option>
              <option value="area2">Area 2</option>
            </select>
          </div>

          {/* Radio Buttons - Centered */}
          <div className="flex justify-center gap-8">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="transportType"
                value="oneWay"
                checked={transportDetails.type === "oneWay"}
                onChange={(e) =>
                  setTransportDetails((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setTransportDetails((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="radio radio-xs"
              />
              <span className="text-xs">Two Way</span>
            </label>
          </div>

          {/* Amount Field */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-32">Amount:</label>
            <input
              type="number"
              value={transportDetails.amount}
              onChange={(e) =>
                setTransportDetails((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
              className="input input-xs input-bordered w-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeeSelection;

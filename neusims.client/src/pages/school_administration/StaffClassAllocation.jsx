import { useState } from "react";
import PropTypes from "prop-types";

const StaffClassAllocation = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffList, setStaffList] = useState([
    { id: "ACA0382003", name: "Rita Mueni Masila" },
    { id: "ACA0552003", name: "Severino K Muruki" },
    { id: "ACA0452005", name: "Stephen Mbugua" },
    { id: "ACA1342007", name: "Salome Gathoni Kariuki" },
  ]);

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className="tab tab-xs tab-active">
          Staff Class Allocation
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Left Panel */}
        <div className="border rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-sm">Search Staff</h3>
          <input
            type="text"
            placeholder="Search Staff"
            className="input input-xs w-full border border-gray-300 rounded mb-2"
          />
          <div className="overflow-y-auto max-h-[60vh]">
            <table className="table table-xs table-zebra w-full text-xs">
              <thead>
                <tr>
                  <th className="border">#</th>
                  <th className="border">Staff No</th>
                  <th className="border">Name</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr
                    key={staff.id}
                    className={`cursor-pointer ${
                      selectedStaff?.id === staff.id ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleStaffSelect(staff)}
                  >
                    <td className="border">{index + 1}</td>
                    <td className="border">{staff.id}</td>
                    <td className="border">{staff.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="border rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2 text-sm">Class Allocation</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs w-24">Academic Year</label>
              <select className="select select-xs select-bordered flex-grow">
                <option>2025</option>
                <option>2026</option>
              </select>
              <button className="btn btn-xs">OK</button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs w-24">Class</label>
              <select className="select select-xs select-bordered flex-grow">
                <option>Grade 10</option>
                <option>Grade 11</option>
              </select>
              <button className="btn btn-xs">OK</button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs w-24">Stream</label>
              <select className="select select-xs select-bordered flex-grow">
                <option>Blue</option>
                <option>Red</option>
              </select>
              <button className="btn btn-xs btn-error">Delete</button>
            </div>

            <fieldset className="border border-gray-300 p-2 rounded mt-4 mx-auto w-2/3">
              <legend className="text-xs font-medium px-2">
                Class Teacher
              </legend>
              <div className="flex gap-4 justify-center">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="classTeacher"
                    className="radio radio-xs border border-gray-500"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="classTeacher"
                    className="radio radio-xs border border-gray-300"
                  />
                  No
                </label>
              </div>
            </fieldset>
          </div>

          <h3 className="font-semibold mb-2 text-sm mt-4">
            Teachers Classwise
          </h3>
          <div className="overflow-y-auto max-h-[30vh]">
            <table className="table table-xs table-zebra w-full text-xs">
              <thead>
                <tr>
                  <th className="border">#</th>
                  <th className="border">Staff No</th>
                  <th className="border">Name</th>
                  <th className="border">Class Teacher</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff, index) => (
                  <tr key={staff.id}>
                    <td className="border">{index + 1}</td>
                    <td className="border">{staff.id}</td>
                    <td className="border">{staff.name}</td>
                    <td className="border flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-xs border border-gray-500"
                        checked={staff.isClassTeacher || false}
                        readOnly
                      />
                      {staff.isClassTeacher ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

StaffClassAllocation.propTypes = {
  staffList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isClassTeacher: PropTypes.bool,
    })
  ),
};

export default StaffClassAllocation;

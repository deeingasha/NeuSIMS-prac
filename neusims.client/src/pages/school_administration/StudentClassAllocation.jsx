import { useState } from "react";
import PropTypes from "prop-types";

const StudentClassAllocation = () => {
  const [activeTab, setActiveTab] = useState("promotion");

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab tab-xs ${
            activeTab === "promotion" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("promotion")}
        >
          Promotion
        </a>
        <a
          role="tab"
          className={`tab tab-xs ${activeTab === "edit" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Allocation
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "promotion" ? <PromotionTab /> : <EditAllocationTab />}
      </div>
    </div>
  );
};

// Promotion Tab Component
const PromotionTab = () => {
  const [students, setStudents] = useState(
    [...Array(10)].map((_, index) => ({
      id: index + 1,
      admNo: `ADM-${index + 100}`,
      name: `Student ${index + 1}`,
      selected: false,
    }))
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setStudents(
      students.map((student) => ({ ...student, selected: newSelectAll }))
    );
  };

  const handleSelectStudent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, selected: !student.selected }
          : student
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Side - Class Selection */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Select Class</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Academic Year</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Class</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Grade 10</option>
              <option>Grade 11</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Stream</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Blue</option>
              <option>Red</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Side - Promotion Details */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Promotion Details</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Academic Year</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>2026</option>
              <option>2027</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Class</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Stream</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Blue</option>
              <option>Red</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Selection Tables */}
      <StudentSelectionTables
        students={students}
        selectAll={selectAll}
        handleSelectAll={handleSelectAll}
        handleSelectStudent={handleSelectStudent}
        leftTableTitle="Select students to promote"
        rightTableTitle="Students’ List for the above Promotion"
      />
    </div>
  );
};

// Edit Allocation Tab Component
const EditAllocationTab = () => {
  const [students, setStudents] = useState(
    [...Array(10)].map((_, index) => ({
      id: index + 1,
      admNo: `ADM-${index + 100}`,
      name: `Student ${index + 1}`,
      selected: false,
    }))
  );
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setStudents(
      students.map((student) => ({ ...student, selected: newSelectAll }))
    );
  };

  const handleSelectStudent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, selected: !student.selected }
          : student
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Side - Class Selection */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Select Class</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Academic Year</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Class</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Grade 10</option>
              <option>Grade 11</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Stream</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Blue</option>
              <option>Red</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Side - Promotion Details */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-2 text-sm">Promotion Details</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Academic Year</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>2026</option>
              <option>2027</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Class</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs w-24">Stream</label>
            <select className="select select-xs select-bordered flex-grow">
              <option>Blue</option>
              <option>Red</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Selection Tables */}
      <StudentSelectionTables
        students={students}
        selectAll={selectAll}
        handleSelectAll={handleSelectAll}
        handleSelectStudent={handleSelectStudent}
        leftTableTitle="Students’ List for above Class"
        rightTableTitle=""
      />
    </div>
  );
};

// Reusable Student Selection Tables Component
const StudentSelectionTables = ({
  students,
  selectAll,
  handleSelectAll,
  handleSelectStudent,
  leftTableTitle,
  rightTableTitle,
}) => {
  return (
    <div className="col-span-2 flex gap-4">
      {/* Left Table */}
      <div className="border rounded-lg p-4 shadow w-1/2">
        <h3 className="font-semibold text-xs text-center">{leftTableTitle}</h3>
        <table className="table table-xs table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>ADM No</th>
              <th>Student Name</th>
              <th>
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />{" "}
                Select All
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.admNo}</td>
                <td>{student.name}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs"
                    checked={student.selected}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Table */}
      <div className="border rounded-lg p-4 shadow w-1/2">
        {rightTableTitle && (
          <h3 className="font-semibold text-xs text-center">
            {rightTableTitle}
          </h3>
        )}
        <table className="table table-xs table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>ADM No</th>
              <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) => student.selected)
              .map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.admNo}</td>
                  <td>{student.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Define PropTypes for StudentSelectionTables
StudentSelectionTables.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      admNo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  selectAll: PropTypes.bool.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleSelectStudent: PropTypes.func.isRequired,
  leftTableTitle: PropTypes.string.isRequired,
  rightTableTitle: PropTypes.string,
};

export default StudentClassAllocation;

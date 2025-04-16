import { useState } from "react";
import PropTypes from "prop-types";

const StudentList = ({ students = [], onSelect }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    onSelect(student);
  };

  return (
    <div className="border rounded-lg p-4 shadow w-1/3 bg-gray-50">
      <h2 className="font-semibold text-lg mb-4">Active Students</h2>
      {/* <div className="space-y-4 mb-4"> */}
      <input
        type="text"
        placeholder="Search Student"
        className="input input-xs w-full border border-gray-300 rounded mb-2"
      />
      {/* <div className="overflow-y-auto max-h-[60vh]">
        <table className="table table-xs table-zebra w-full text-xs">
          <thead>
            <tr>
              <th className="border-t border-b">#</th>
              <th className="border-t border-b">Adm No</th>
              <th className="border-t border-b">Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.admNo}
                className={`cursor-pointer ${
                  selectedStudent?.admNo === student.admNo ? "bg-blue-200" : ""
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                <td className="border">{index + 1}</td>
                <td className="border">{student.admNo}</td>
                <td className="border">{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="table-container">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th className="w-12">#</th>
              <th>Adm No</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.admNo}
                className={`hover:bg-gray-100 cursor-pointer ${
                  selectedStudent?.admNo === student.admNo ? "bg-blue-50" : ""
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                <td className="text-center">{index + 1}</td>
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

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      admNo: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentList;

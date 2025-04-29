import { useState, useMemo } from "react";
import PropTypes from "prop-types";

const StudentList = ({
  students = [],
  onSelect,
  isLoading,
  error,
  selectedStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Use prop for selectedStudent
  const handleStudentSelect = (student) => {
    onSelect(student);
  };
  const handleNewStudent = () => {
    onSelect(null); // Pass null to parent
  };

  // Memoize filtered students
  const filteredStudents = useMemo(
    () =>
      students.filter(
        (student) =>
          `${student.fName} ${student.mName} ${student.lName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.entityNo?.toString().includes(searchTerm)
      ),
    [students, searchTerm] // Only recompute when these change
  );

  return (
    // <div className="flex flex-col h-full border rounded p-4 shadow w-1/3 bg-gray-50">
    <div className="flex flex-col w-1/3 h-full overflow-hidden">
      {" "}
      {/* Base container */}
      <div className="flex flex-col h-full p-4 bg-gray-50 border rounded shadow">
        {" "}
        {/* Content container */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg mb-2">Active Students</h2>
          <button onClick={handleNewStudent} className="btn btn-primary btn-sm">
            New Student
          </button>
        </div>
        {/* <div className="space-y-4 mb-4"> */}
        <input
          type="text"
          placeholder="Search by name or number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        {/* <div className="flex-1 overflow-auto min-h-0"> */}
        <div className="flex-1 overflow-auto">
          {" "}
          {/* Table container */}
          {isLoading ? (
            <div className="text-center py-4">Loading students...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-600">
              <div className="mb-2">❌</div>
              {error}
            </div>
          ) : (
            <table className="table table-xs table-zebra">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr>
                  <th className="w-6">#</th>
                  <th>STD No</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody className="overflow-auto">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.entityNo}
                    className={`hover cursor-pointer ${
                      selectedStudent?.entityNo === student.entityNo
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{student.entityNo}</td>
                    <td>
                      {`${student.fName} ${student.mName} ${student.lName}`.trim()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

StudentList.propTypes = {
  // students: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     entityNo: PropTypes.number.isRequired,
  //     fName: PropTypes.string,
  //     mName: PropTypes.string,
  //     lName: PropTypes.string,
  //   })
  // ).isRequired,
  students: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string, // Add error prop type
  selectedStudent: PropTypes.object,
};
export default StudentList;

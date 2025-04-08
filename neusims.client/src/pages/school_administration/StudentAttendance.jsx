import { useState } from "react";

const StudentAttendance = () => {
  const [filters, setFilters] = useState({
    studentName: "",
    academicPeriod: "2024-2025",
    class: "Grade 10",
    date: "",
    stream: "Blue",
    term: "Term 1",
  });

  // Mock data for attendance table
  const [students, setStudents] = useState([
    {
      id: 1,
      admNo: "ADM001",
      name: "John Doe",
      isPresent: true,
      reason: "",
      remarks: "",
    },
    {
      id: 2,
      admNo: "ADM002",
      name: "Jane Smith",
      isPresent: true,
      reason: "",
      remarks: "",
    },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttendanceChange = (studentId, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, [field]: value } : student
      )
    );
  };

  const handleSave = () => {
    console.log("Saving attendance:", { filters, students });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Top Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel */}
        <div className="border rounded-lg p-4 shadow">
          <fieldset className="border rounded-md p-4">
            <legend className="text-sm font-medium px-2">Filter by</legend>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-20">Name:</label>
              <input
                type="text"
                name="studentName"
                value={filters.studentName}
                onChange={handleFilterChange}
                className="input input-xs input-bordered flex-grow"
                placeholder="Search by student name..."
              />
            </div>
          </fieldset>
        </div>

        {/* Right Panel */}
        <div className="border rounded-lg p-4 shadow">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">
                Academic Period:
              </label>
              <select
                name="academicPeriod"
                value={filters.academicPeriod}
                onChange={handleFilterChange}
                className="select select-xs select-bordered w-36"
              >
                <option>2024-2025</option>
                <option>2023-2024</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-20">Class:</label>
              <select
                name="class"
                value={filters.class}
                onChange={handleFilterChange}
                className="select select-xs select-bordered w-36"
              >
                <option>Grade 10</option>
                <option>Grade 11</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Date:</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="input input-xs input-bordered w-36"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-20">Stream:</label>
              <select
                name="stream"
                value={filters.stream}
                onChange={handleFilterChange}
                className="select select-xs select-bordered w-36"
              >
                <option>Blue</option>
                <option>Red</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Term:</label>
              <select
                name="term"
                value={filters.term}
                onChange={handleFilterChange}
                className="select select-xs select-bordered w-36"
              >
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border rounded-lg p-4 shadow">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <div className="table-container">
              <table className="table table-xs w-full">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Adm No</th>
                    <th>Student Name</th>
                    <th className="w-24">Present</th>
                    <th>Reason</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{student.admNo}</td>
                      <td>{student.name}</td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={student.isPresent}
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.id,
                              "isPresent",
                              e.target.checked
                            )
                          }
                          className="checkbox checkbox-xs"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={student.reason}
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.id,
                              "reason",
                              e.target.value
                            )
                          }
                          className="input input-xs input-bordered w-full"
                          disabled={student.isPresent}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={student.remarks}
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.id,
                              "remarks",
                              e.target.value
                            )
                          }
                          className="input input-xs input-bordered w-full"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={handleSave} className="btn btn-xs btn-primary ml-4">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;

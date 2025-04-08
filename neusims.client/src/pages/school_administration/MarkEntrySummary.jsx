import { useState } from "react";

const MarkEntrySummary = () => {
  // State for filters
  const [filters, setFilters] = useState({
    academicYear: "2024-2025",
    term: "Term 1",
    class: "Grade 10",
    stream: "Blue",
    examType: "Mid Term",
  });

  // Mock data for staff and subjects table
  const [staffSubjects] = useState([
    {
      id: 1,
      assignmentStatus: "P",
      staffName: "John Doe",
      subjectName: "Mathematics",
    },
    {
      id: 2,
      assignmentStatus: "A",
      staffName: "Jane Smith",
      subjectName: "English",
    },
    {
      id: 3,
      assignmentStatus: "P",
      staffName: "Bob Wilson",
      subjectName: "Physics",
    },
  ]);

  // Mock data for students marks table
  const [studentMarks] = useState([
    { id: 1, admNo: "ADM001", name: "Alex Johnson", marks: 85 },
    { id: 2, admNo: "ADM002", name: "Sarah Williams", marks: 92 },
    { id: 3, admNo: "ADM003", name: "Mike Brown", marks: 78 },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Filters Section */}
      <div className="border rounded-lg p-4 shadow max-w-3xl">
        <div className="space-y-4">
          {/* Academic Year and Term on same line */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-24">Academic Year:</label>
              <select
                name="academicYear"
                value={filters.academicYear}
                onChange={handleFilterChange}
                className="select select-xs select-bordered w-36"
              >
                <option>2024-2025</option>
                <option>2023-2024</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-20">Term:</label>
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
          {/* Class and Stream on same line */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-24">Class:</label>
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
          </div>
          {/* Exam/Assignment on its own line */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-24">Exam/Assignment:</label>
            <select
              name="examType"
              value={filters.examType}
              onChange={handleFilterChange}
              className="select select-xs select-bordered w-36"
            >
              <option>Mid Term</option>
              <option>End Term</option>
              <option>Assignment 1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Staff and Subjects Table */}

        <div className="table-container">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th className="w-20">A</th>
                <th>Staff Name</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {staffSubjects.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.assignmentStatus}</td>
                  <td>{item.staffName}</td>
                  <td>{item.subjectName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Marks Table */}

        <div className="table-container">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th>Adm No</th>
                <th>Student Name</th>
                <th className="w-24">Marks</th>
              </tr>
            </thead>
            <tbody>
              {studentMarks.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="text-center">{index + 1}</td>
                  <td>{student.admNo}</td>
                  <td>{student.name}</td>
                  <td className="text-center">{student.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarkEntrySummary;

import { useState } from "react";
import SubjectList from "@components/modules/subjectAllocation/SubjectList";

const StaffSubjectAllocation = () => {
  const [filters, setFilters] = useState({
    academicYear: "2024-2025",
    classGroup: "Secondary",
    class: "Grade 10",
    stream: "Blue",
  });

  const [searchStaff, setSearchStaff] = useState("");

  // Mock data for staff
  const [staffList] = useState([
    { id: 1, staffNo: "STF001", name: "John Doe" },
    { id: 2, staffNo: "STF002", name: "Jane Smith" },
  ]);

  // Mock data for subjects
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", shortName: "MATH", selected: false },
    { id: 2, name: "English", shortName: "ENG", selected: false },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefresh = () => {
    console.log("Refreshing with filters:", filters);
  };

  const toggleAllSubjects = (e) => {
    setSubjects((prev) =>
      prev.map((subject) => ({
        ...subject,
        selected: e.target.checked,
      }))
    );
  };

  const toggleSubject = (subjectId) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === subjectId
          ? { ...subject, selected: !subject.selected }
          : subject
      )
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Filters Section */}
      <div className="border rounded-lg p-4 shadow max-w-3xl">
        <div className="space-y-4">
          <div className="flex gap-4">
            {/* Left side - Filter Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-1">
                <label className="text-xs font-medium w-24">
                  Academic Year:
                </label>
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
              <div className="flex items-center gap-1">
                <label className="text-xs font-medium w-24">Class Group:</label>
                <select
                  name="classGroup"
                  value={filters.classGroup}
                  onChange={handleFilterChange}
                  className="select select-xs select-bordered w-36"
                >
                  <option>Secondary</option>
                  <option>Primary</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
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
              <div className="flex items-center gap-1">
                <label className="text-xs font-medium w-24">Stream:</label>
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

            {/* Right side - Refresh Button */}
            <div className="flex items-center ml-4">
              <button
                onClick={handleRefresh}
                className="btn btn-xs btn-primary"
              >
                Refresh Screen
              </button>
            </div>
          </div>
          {/* Search Staff Field */}
          <div className="flex items-center gap-1">
            <label className="text-xs font-medium w-24">Search Staff:</label>
            <input
              type="text"
              value={searchStaff}
              onChange={(e) => setSearchStaff(e.target.value)}
              className="input input-xs input-bordered w-72"
              placeholder="Search staff..."
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Staff List Table */}

        <div className="table-container">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th>Staff No</th>
                <th>Staff Name</th>
              </tr>
            </thead>
            <tbody>
              {staffList
                .filter(
                  (staff) =>
                    staff.staffNo
                      .toLowerCase()
                      .includes(searchStaff.toLowerCase()) ||
                    staff.name.toLowerCase().includes(searchStaff.toLowerCase())
                )
                .map((staff, index) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{staff.staffNo}</td>
                    <td>{staff.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Subjects Table */}
        <SubjectList
          subjects={subjects}
          onToggleAll={toggleAllSubjects}
          onToggleOne={toggleSubject}
        />
      </div>
    </div>
  );
};

export default StaffSubjectAllocation;

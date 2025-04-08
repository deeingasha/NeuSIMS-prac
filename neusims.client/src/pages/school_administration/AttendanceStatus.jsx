import { useState } from "react";

const AttendanceStatus = () => {
  const [filters, setFilters] = useState({
    year: "2024-2025",
    term: "Term 1",
    class: "Grade 10",
    stream: "Blue",
    fromDate: "",
    toDate: ""
  });

  // Mock data for missing dates
  const [missingDates] = useState([
    "2024-04-01",
    "2024-04-03",
    "2024-04-05"
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOk = () => {
    console.log('Filtering with:', filters);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Filters Section */}
      <div className="border rounded-lg p-4 shadow">
        <div className="grid grid-cols-3 gap-4">
          {/* Year */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-20">Year:</label>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="select select-xs select-bordered w-36"
            >
              <option>2024-2025</option>
              <option>2023-2024</option>
            </select>
          </div>

          {/* Term */}
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

          {/* Class */}
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

          {/* Stream */}
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

          {/* From Date */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-20">From:</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleFilterChange}
              className="input input-xs input-bordered w-36"
            />
          </div>

          {/* To Date */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium w-20">To:</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleFilterChange}
              className="input input-xs input-bordered w-36"
            />
          </div>
        </div>

        {/* OK Button */}
        <div className="flex justify-end mt-4">
          <button 
            onClick={handleOk}
            className="btn btn-xs btn-primary"
          >
            OK
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg p-4 shadow">
        <div className="mb-2">
          <h3 className="text-red-600 font-bold text-sm">
            Attendance Missing Dates
          </h3>
        </div>
        <div className="table-container">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th>Missing Dates</th>
              </tr>
            </thead>
            <tbody>
              {missingDates.map((date, index) => (
                <tr key={date}>
                  <td className="text-center">{index + 1}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatus;
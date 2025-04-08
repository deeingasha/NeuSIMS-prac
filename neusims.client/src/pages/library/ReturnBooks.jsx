import { useState } from "react";

const ReturnBooks = () => {
  // States for filters and form data
  const [filters, setFilters] = useState({
    readerType: "student",
    year: "2025",
    term: "Term 1",
    class: "Grade 10",
    stream: "Blue",
    staffSearch: "",
  });

  const [returnDetails, setReturnDetails] = useState({
    barcode: "",
    searchBook: "",
    bookStatus: "",
    remarks: "",
  });

  // Mock data for staff/students table (same as IssueBooks)
  const [readers] = useState([
    { staffNo: "STF001", name: "John Doe" },
    { staffNo: "STF002", name: "Jane Smith" },
  ]);

  // Mock data for issued books table
  const [issuedBooks] = useState([
    {
      bookNo: "BK001",
      serialNo: "SER001",
      bookName: "Introduction to Physics",
      issueDate: "2024-04-07",
      dueDate: "2024-04-21",
    },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReturnDetailsChange = (e) => {
    const { name, value } = e.target;
    setReturnDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel - Identical to IssueBooks */}
        <div className="border rounded-lg p-4 shadow">
          <div className="space-y-4">
            {/* Reader Type Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Reader Type:</label>
              <select
                name="readerType"
                value={filters.readerType}
                onChange={handleFilterChange}
                className="select select-xs select-bordered w-48"
              >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {/* Year and Term Filters */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-20">Year:</label>
                <select
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="select select-xs select-bordered w-36"
                >
                  <option>2025</option>
                  <option>2024</option>
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

            {/* Class and Stream Filters */}
            <div className="grid grid-cols-2 gap-2">
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

            {/* Search Field */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Search:</label>
              <input
                type="text"
                name="staffSearch"
                value={filters.staffSearch}
                onChange={handleFilterChange}
                className="input input-xs input-bordered flex-grow"
                placeholder="Search staff/student..."
              />
            </div>

            {/* Staff/Students Table */}
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
                  {readers.map((reader, index) => (
                    <tr
                      key={reader.staffNo}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="text-center">{index + 1}</td>
                      <td>{reader.staffNo}</td>
                      <td>{reader.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Panel - Simplified for Returns */}
        <div className="border rounded-lg p-4 shadow">
          <div className="space-y-4">
            {/* Barcode Search */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Barcode:</label>
              <input
                type="text"
                name="barcode"
                value={returnDetails.barcode}
                onChange={handleReturnDetailsChange}
                className="input input-xs input-bordered flex-grow"
              />
            </div>

            {/* Spacer */}
            <div className="h-4"></div>

            {/* Search Book */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Search Book:</label>
              <input
                type="text"
                name="searchBook"
                value={returnDetails.searchBook}
                onChange={handleReturnDetailsChange}
                className="input input-xs input-bordered flex-grow"
                placeholder="Search by book name or number..."
              />
            </div>

            {/* Issued Books Table */}
            <div className="table-container">
              <table className="table table-xs w-full">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Book No</th>
                    <th>Book Name</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((book, index) => (
                    <tr
                      key={book.bookNo}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="text-center">{index + 1}</td>
                      <td>{book.bookNo}</td>
                      <td>{book.bookName}</td>
                      <td>{book.issueDate}</td>
                      <td>{book.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Book Status */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">Book Status:</label>
              <select
                name="bookStatus"
                value={returnDetails.bookStatus}
                onChange={handleReturnDetailsChange}
                className="select select-xs select-bordered w-48"
              >
                <option value="">Select Status</option>
                <option value="good">Good</option>
                <option value="damaged">Damaged</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="flex items-start gap-2">
              <label className="text-xs font-medium w-32 mt-2">Remarks:</label>
              <textarea
                name="remarks"
                value={returnDetails.remarks}
                onChange={handleReturnDetailsChange}
                rows="3"
                className="textarea textarea-xs textarea-bordered flex-grow"
              />
            </div>

            {/* Return Button */}
            <div className="flex justify-end">
              <button className="btn btn-xs btn-primary">Return Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnBooks;

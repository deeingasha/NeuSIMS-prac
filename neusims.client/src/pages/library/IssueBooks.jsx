import { useState } from "react";

const IssueBooks = () => {
  // States for filters and form data
  const [filters, setFilters] = useState({
    readerType: "student",
    year: "2025",
    term: "Term 1",
    class: "Grade 10",
    stream: "Blue",
    staffSearch: "",
  });

  const [bookDetails, setBookDetails] = useState({
    barcode: "",
    bookSearch: "",
    isbn: "",
    author: "",
    serialNumber: "",
  });

  // Mock data for staff/students table
  const [readers] = useState([
    { staffNo: "STF001", name: "John Doe" },
    { staffNo: "STF002", name: "Jane Smith" },
  ]);

  // Mock data for books table
  const [selectedBooks, setSelectedBooks] = useState([
    {
      bookNo: "BK001",
      serialNo: "SER001",
      bookName: "Introduction to Physics",
    },
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookDetailsChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSerial = () => {
    // TODO: Implement add serial logic
    console.log("Adding serial:", bookDetails.serialNumber);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel */}
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

        {/* Right Panel */}
        <div className="border rounded-lg p-4 shadow">
          <div className="space-y-4">
            {/* Barcode Search */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-32">
                Barcode Search:
              </label>
              <input
                type="text"
                name="barcode"
                value={bookDetails.barcode}
                onChange={handleBookDetailsChange}
                className="input input-xs input-bordered flex-grow"
              />
            </div>

            {/* Book Search Fields */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-32">Search Book:</label>
                <input
                  type="text"
                  name="bookSearch"
                  value={bookDetails.bookSearch}
                  onChange={handleBookDetailsChange}
                  className="input input-xs input-bordered flex-grow"
                />
              </div>

              {/* ISBN and Author on same line */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-20">ISBN:</label>
                  <input
                    type="text"
                    name="isbn"
                    value={bookDetails.isbn}
                    onChange={handleBookDetailsChange}
                    className="input input-xs input-bordered w-36"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-20">Author:</label>
                  <input
                    type="text"
                    name="author"
                    value={bookDetails.author}
                    onChange={handleBookDetailsChange}
                    className="input input-xs input-bordered w-36"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-32">
                  Serial Number:
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={bookDetails.serialNumber}
                  onChange={handleBookDetailsChange}
                  className="input input-xs input-bordered flex-grow"
                />
                <button onClick={handleAddSerial} className="btn btn-xs">
                  Add
                </button>
              </div>
            </div>

            {/* Books Table */}
            <div className="table-container">
              <table className="table table-xs w-full">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Book No</th>
                    <th>Serial No</th>
                    <th>Book Name</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBooks.map((book, index) => (
                    <tr key={book.bookNo}>
                      <td className="text-center">{index + 1}</td>
                      <td>{book.bookNo}</td>
                      <td>{book.serialNo}</td>
                      <td>{book.bookName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <button className="btn btn-xs btn-primary">Issue Book</button>
              <button className="btn btn-xs btn-error">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueBooks;

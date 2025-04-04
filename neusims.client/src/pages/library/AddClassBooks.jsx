import { useState } from "react";
import PropTypes from "prop-types";

const AddClassBooks = () => {
  // State for filter and active tab
  const [selectedSubject, setSelectedSubject] = useState("");
  const [activeTab, setActiveTab] = useState("addBooks");

  // State for books table
  const [books, setBooks] = useState([
    {
      id: 1,
      isbn: "978-0-123456-47-2",
      name: "Introduction to Physics",
      description: "Comprehensive physics textbook",
      year: "2023",
      publisher: "Academic Press",
      copies: 5,
    },
    {
      id: 2,
      isbn: "978-0-234567-89-1",
      name: "Advanced Chemistry",
      description: "Advanced level chemistry concepts",
      year: "2024",
      publisher: "Science Books Ltd",
      copies: 3,
    },
    {
      id: 3,
      isbn: "978-0-345678-12-3",
      name: "Biology Essentials",
      description: "Foundation biology textbook",
      year: "2023",
      publisher: "Education Press",
      copies: 7,
    },
  ]);

  // State for form data
  const [formData, setFormData] = useState({
    isbn: "",
    bookName: "",
    description: "",
    yearOfPublication: "",
    publisher: "",
    copies: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  // Add selection state
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Add row click handler
  const handleRowClick = (book) => {
    setSelectedBookId(book.id);
    setFormData({
      isbn: book.isbn,
      bookName: book.name,
      description: book.description,
      yearOfPublication: book.year,
      publisher: book.publisher,
      copies: book.copies.toString(),
    });
    setIsEditing(true);
  };

  // Update clear handler
  const handleClear = () => {
    setFormData({
      isbn: "",
      bookName: "",
      description: "",
      yearOfPublication: "",
      publisher: "",
      copies: "",
    });
    setErrors({});
    setSelectedBookId(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Validation
    const newErrors = {};
    if (!formData.isbn) newErrors.isbn = "ISBN is required";
    if (!formData.bookName) newErrors.bookName = "Book name is required";
    if (!formData.copies) newErrors.copies = "Number of copies is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selectedBookId) {
      // Update existing book
      setBooks(
        books.map((book) =>
          book.id === selectedBookId
            ? {
                ...book,
                isbn: formData.isbn,
                name: formData.bookName,
                description: formData.description,
                year: formData.yearOfPublication,
                publisher: formData.publisher,
                copies: parseInt(formData.copies),
              }
            : book
        )
      );
    } else {
      // Add new book
      // Save logic here
      const newBook = {
        id: books.length + 1,
        isbn: formData.isbn,
        name: formData.bookName,
        description: formData.description,
        year: formData.yearOfPublication,
        publisher: formData.publisher,
        copies: parseInt(formData.copies),
      };
      setBooks((prev) => [...prev, newBook]);
    }

    handleClear();
  };
  // Add this with the other handler functions, before the return statement
  const handleNew = () => {
    setFormData({
      isbn: "",
      bookName: "",
      description: "",
      yearOfPublication: "",
      publisher: "",
      copies: "",
    });
    setErrors({});
    setSelectedBookId(null);
    setIsEditing(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Top Filter */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium w-32">Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="select select-xs select-bordered w-48"
        >
          <option value="">Select Subject</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel - Books Table */}
        <div className="border rounded-lg p-4 shadow">
          <div className="table-container">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>ISBN</th>
                  <th>Book Name</th>
                  <th>Copies</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book.id}
                    onClick={() => handleRowClick(book)}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      selectedBookId === book.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{book.isbn}</td>
                    <td>{book.name}</td>
                    <td className="text-center">{book.copies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Form with Tabs */}
        <div className="border rounded-lg p-4 shadow">
          {/* Tabs */}
          <div className="tabs tabs-bordered mb-4">
            <button
              className={`tab tab-xs ${
                activeTab === "addBooks" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("addBooks")}
            >
              Add Books
            </button>
            <button
              className={`tab tab-xs ${
                activeTab === "addCopies" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("addCopies")}
            >
              Add Book Copies
            </button>
          </div>

          {/* Add Books Form */}
          {activeTab === "addBooks" && (
            <div className="space-y-4">
              {/* Form Fields Container */}
              <div className="w-full space-y-4">
                {/* ISBN Code */}
                <div className="flex items-center gap-2">
                  <label className="w-48 font-medium text-xs">
                    ISBN Code:<span className="text-red-500">*</span>
                  </label>
                  <div className="w-[300px]">
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      className={`input input-xs w-full border-2 ${
                        errors.isbn ? "border-red-500" : "border-gray-300"
                      } ${!isEditing && "bg-gray-100"}`}
                      disabled={!isEditing}
                    />
                    {errors.isbn && (
                      <span className="text-red-500 text-xs">
                        {errors.isbn}
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Name */}
                <div className="flex items-center gap-2">
                  <label className="w-48 font-medium text-xs">
                    Material/Book Name:<span className="text-red-500">*</span>
                  </label>
                  <div className="w-[300px]">
                    <input
                      type="text"
                      name="bookName"
                      value={formData.bookName}
                      onChange={handleChange}
                      className={`input input-xs w-full border-2 ${
                        errors.bookName ? "border-red-500" : "border-gray-300"
                      } ${!isEditing && "bg-gray-100"}`}
                      disabled={!isEditing}
                    />
                    {errors.bookName && (
                      <span className="text-red-500 text-xs">
                        {errors.bookName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-2">
                  <label className="w-48 font-medium text-xs mt-2">
                    Description:
                  </label>
                  <div className="w-[300px]">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className={`textarea textarea-xs w-full border-2 ${
                        !isEditing ? "bg-gray-100" : "border-gray-300"
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Year of Publication */}
                <div className="flex items-center gap-2">
                  <label className="w-48 font-medium text-xs">
                    Year of Publication:
                  </label>
                  <div className="w-[300px]">
                    <input
                      type="text"
                      name="yearOfPublication"
                      value={formData.yearOfPublication}
                      onChange={handleChange}
                      className={`input input-xs w-full border-2 ${
                        !isEditing ? "bg-gray-100" : "border-gray-300"
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Publisher */}
                <div className="flex items-center gap-2">
                  <label className="w-48 font-medium text-xs">Publisher:</label>
                  <div className="w-[300px]">
                    <input
                      type="text"
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className={`input input-xs w-full border-2 ${
                        !isEditing ? "bg-gray-100" : "border-gray-300"
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Number of Copies */}
                <div className="flex items-center gap-2">
                  <label className="w-48 font-medium text-xs">
                    No. of Copies:<span className="text-red-500">*</span>
                  </label>
                  <div className="w-[300px]">
                    <input
                      type="number"
                      name="copies"
                      value={formData.copies}
                      onChange={handleChange}
                      className={`input input-xs w-full border-2 ${
                        errors.copies ? "border-red-500" : "border-gray-300"
                      } ${!isEditing && "bg-gray-100"}`}
                      disabled={!isEditing}
                    />
                    {errors.copies && (
                      <span className="text-red-500 text-xs">
                        {errors.copies}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  className="btn btn-xs"
                  onClick={handleNew}
                  disabled={isEditing}
                >
                  New
                </button>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={handleSave}
                  disabled={!isEditing}
                >
                  {selectedBookId ? "Save" : "Create"}
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={handleClear}
                  disabled={!isEditing}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Add Book Copies Tab Content */}
          {activeTab === "addCopies" && (
            <div className="text-center text-gray-500 py-8">
              Add Book Copies functionality coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddClassBooks;

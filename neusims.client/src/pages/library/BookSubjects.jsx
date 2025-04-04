// src/pages/Library/BookSubjects.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const BookSubjects = () => {
  // State management
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Chemistry" },
    { id: 4, name: "Biology" },
  ]);

  const [formData, setFormData] = useState({
    subject: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [errors, setErrors] = useState({});

  // Handlers
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

  const handleRowClick = (subject) => {
    setSelectedSubjectId(subject.id);
    setFormData({ subject: subject.name });
    setIsEditing(true);
  };

  const handleNew = () => {
    setSelectedSubjectId(null);
    setFormData({ subject: "" });
    setIsEditing(true);
    setErrors({});
  };

  const handleSave = () => {
    // Validation
    const newErrors = {};
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selectedSubjectId) {
      // Update existing subject
      setSubjects(
        subjects.map((subject) =>
          subject.id === selectedSubjectId
            ? { ...subject, name: formData.subject }
            : subject
        )
      );
    } else {
      // Add new subject
      setSubjects([
        ...subjects,
        { id: subjects.length + 1, name: formData.subject },
      ]);
    }

    setIsEditing(false);
    setSelectedSubjectId(null);
    setFormData({ subject: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedSubjectId(null);
    setFormData({ subject: "" });
    setErrors({});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel - Subjects Table */}
        <div className="border rounded-lg p-4 shadow">
          <div className="overflow-x-auto">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr
                    key={subject.id}
                    onClick={() => handleRowClick(subject)}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      selectedSubjectId === subject.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{subject.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Subject Form */}
        <div className="border rounded-lg p-4 shadow">
          <div className="space-y-4">
            {/* Subject Input */}
            <div className="flex items-center gap-2">
              <label className="w-32 font-medium text-xs">
                Book Subject:<span className="text-red-500">*</span>
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`input input-xs w-full border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  } ${!isEditing && "bg-gray-100"}`}
                  disabled={!isEditing}
                />
                {errors.subject && (
                  <span className="text-red-500 text-xs">{errors.subject}</span>
                )}
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
                {selectedSubjectId ? "Save" : "Create"}
              </button>
              <button
                className="btn btn-xs btn-error"
                onClick={handleCancel}
                disabled={!isEditing}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSubjects;

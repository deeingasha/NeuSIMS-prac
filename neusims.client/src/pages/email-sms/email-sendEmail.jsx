import { useState } from "react";
import { Tab } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import { FaUpload, FaPaperPlane, FaTimes } from "react-icons/fa";

const SendEmail = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [emailConfig, setEmailConfig] = useState({
    academicYear: "",
    class: "",
    stream: "",
    senderEmail: "",
    password: "",
    host: "",
    port: "",
    useSSL: true,
  });
  const [emailContent, setEmailContent] = useState({
    subject: "",
    body: "",
    attachments: [],
  });

  // Mock data TODO - replace with API call
  const students = [
    { id: 1, name: "John Doe", regNo: "2023001", email: "john@example.com" },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "2023002",
      email: "jane.smith@school.com",
    },
    {
      id: 3,
      name: "Michael Johnson",
      regNo: "2023003",
      email: "michael.j@school.com",
    },
    {
      id: 4,
      name: "Sarah Williams",
      regNo: "2023004",
      email: "sarah.w@school.com",
    },
    {
      id: 5,
      name: "James Brown",
      regNo: "2023005",
      email: "james.b@school.com",
    },
  ];

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmailConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Select all students
      setSelectedStudents(students.map((student) => student.id));
    } else {
      // Deselect all students
      setSelectedStudents([]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Top Configuration Section */}
      <div className="flex gap-4">
        {/* Left Panel - Academic Settings - Takes up 1/3 of space */}
        <div className="border rounded-lg p-4 shadow w-1/3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-24">Academic Year:</label>
              <select
                name="academicYear"
                value={emailConfig.academicYear}
                onChange={handleConfigChange}
                className="select select-xs select-bordered w-36"
              >
                <option value="">Select Year</option>
                <option>2024-2025</option>
                <option>2023-2024</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-24">Class:</label>
              <select
                name="class"
                value={emailConfig.class}
                onChange={handleConfigChange}
                className="select select-xs select-bordered w-36"
              >
                <option value="">Select Class</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-24">Stream:</label>
              <select
                name="stream"
                value={emailConfig.stream}
                onChange={handleConfigChange}
                className="select select-xs select-bordered w-36"
              >
                <option value="">Select Stream</option>
                <option>Blue</option>
                <option>Red</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Panel - Email Settings - Takes up 2/3 of space */}
        <div className="border rounded-lg p-4 shadow w-2/3">
          <div className="flex gap-4">
            {/* Email and Password Fields */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-24">
                  Sender Email:
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  value={emailConfig.senderEmail}
                  onChange={handleConfigChange}
                  className="input input-xs input-bordered w-36"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium w-24">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={emailConfig.password}
                  onChange={handleConfigChange}
                  className="input input-xs input-bordered w-36"
                />
              </div>
            </div>

            {/* SMTP Details Fieldset */}
            <div className="space-y-2">
              <fieldset className="border rounded p-2">
                <legend className="text-xs font-medium px-2">
                  SMTP Details
                </legend>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium w-16">Host:</label>
                    <input
                      type="text"
                      name="host"
                      value={emailConfig.host}
                      onChange={handleConfigChange}
                      className="input input-xs input-bordered w-36"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium w-16">Port:</label>
                    <input
                      type="text"
                      name="port"
                      value={emailConfig.port}
                      onChange={handleConfigChange}
                      className="input input-xs input-bordered w-36"
                    />
                  </div>
                </div>
              </fieldset>
              {/* SSL Checkbox below fieldset */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="useSSL"
                  checked={emailConfig.useSSL}
                  onChange={handleConfigChange}
                  className="checkbox checkbox-xs"
                />
                <label className="text-xs">
                  Use SSL/Email Security Certificate
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab tab-xs ${activeTab === "send" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("send")}
        >
          Send Email
        </a>
        <a
          role="tab"
          className={`tab tab-xs ${activeTab === "view" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View Sent Emails
        </a>
      </div>

      {activeTab === "send" && (
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side - Search and Recipients Table */}
          <div className="border rounded-lg p-4 shadow">
            <div className="flex items-center gap-2 mb-4">
              <label className="text-xs font-medium w-24">
                Search Students:
              </label>
              <input
                type="text"
                placeholder="Search by name..."
                className="input input-xs input-bordered flex-grow"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="table table-xs w-full">
                <thead>
                  <tr>
                    <th className="w-10">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="checkbox checkbox-xs"
                      />
                    </th>
                    <th>Name</th>
                    <th>Reg No</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                          className="checkbox checkbox-xs"
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.regNo}</td>
                      <td>{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Email Content */}
          <div className="border rounded-lg p-4 shadow space-y-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-20">Subject:</label>
              <input
                type="text"
                value={emailContent.subject}
                onChange={(e) =>
                  setEmailContent((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                className="input input-xs input-bordered flex-grow"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium w-20">
                Attachments:
                <FaUpload className="inline ml-1" />
              </label>
              <input
                type="file"
                multiple
                className="file-input file-input-xs file-input-bordered flex-grow"
                onChange={(e) => {
                  /* Handle file upload */
                }}
              />
            </div>
            <Editor
              apiKey="your-tinymce-key"
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content) =>
                setEmailContent((prev) => ({ ...prev, body: content }))
              }
            />

            <div className="flex justify-end gap-2">
              <button className="btn btn-xs">Cancel</button>
              <button className="btn btn-xs btn-primary">Send Email</button>
            </div>
          </div>
        </div>
      )}
      {activeTab === "view" && (
        <div className="border  rounded-lg p-4 shadow">
          {/* Implement sent emails view */}
          <p className="text-sm">Sent emails will be displayed here</p>
        </div>
      )}
    </div>
  );
};

export default SendEmail;

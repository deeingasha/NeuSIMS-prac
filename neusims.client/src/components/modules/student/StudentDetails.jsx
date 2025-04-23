import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FamilyGuardianTab from "./FamilyGuardianTab";
import PersonalDetailsTab from "./PersonalDetailsTab";
import MedicalInfoTab from "./MedicalInfoTab";
import PrevInstituteTab from "./PrevInstituteTab";
import { studentService } from "@services/studentService";

const StudentDetails = ({ student, onSave }) => {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    status: "",
    country: "",
    nationality: "",
    remarks: "",
    academicYear: "",
    dateOfJoining: "",
    classAllocation: "",
    statusDate: "",
    isBoarding: false,
    isSponsored: false,
    busNo: "",
    transportArea: "",
    house: "",
    nemisNo: "",
    isStaffParent: false,
    payrollNo: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (student) {
      const nameParts = student.name.split(" ");
      setFormData({
        title: student.title || "",
        firstName: student.firstName || "",
        middleName: student.middleName || "",
        lastName: student.lastName || "",
        dob: student.dob || "",
        gender: student.gender || "",
        status: student.status || "",
        country: student.country || "",
        nationality: student.nationality || "",
        remarks: student.remarks || "",
        academicYear: student.academicYear || "",
        dateOfJoining: student.dateOfJoining || "",
        classAllocation: student.classAllocation || "",
        statusDate: student.statusDate || "",
        isBoarding: student.isBoarding || false,
        isSponsored: student.isSponsored || false,
        busNo: student.busNo || "",
        transportArea: student.transportArea || "",
        house: student.house || "",
        nemisNo: student.nemisNo || "",
        isStaffParent: student.isStaffParent || false,
        payrollNo: student.payrollNo || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const studentData = {
        ...formData,
        entityNo: student?.admNo || 0, // For new vs existing students
        updatedUser: "currentUser", // TODO: Get from auth context
      };
      // Just pass data to parent i.e Student.jsx
      if (onSave) {
        await onSave(studentData);
      }
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Details":
        return (
          <PersonalDetailsTab formData={formData} handleChange={handleChange} />
        );
      case "Guardian Info":
        return (
          <FamilyGuardianTab formData={formData} handleChange={handleChange} />
        );
      case "Prev Institute":
        return (
          <PrevInstituteTab formData={formData} handleChange={handleChange} />
        );
      case "Medical Info":
        return (
          <MedicalInfoTab formData={formData} handleChange={handleChange} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-2/3 p-2">
      {student ? (
        <form onSubmit={handleSave} className="border rounded p-4">
          <div className="border rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg mb-4">{student.name}</h2>
                <p>Admission No: {student.admNo}</p>
              </div>
              <div className="w-24 h-24 border rounded bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
            </div>

            <div className="mt-4">
              <ul className="flex border-b">
                {[
                  "Personal Details",
                  "Guardian Info",
                  "Medical Info",
                  "Prev Institute",
                ].map((tab) => (
                  <li
                    key={tab}
                    className={`p-2 cursor-pointer ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500"
                        : "hover:border-b-2 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
              <div className="p-4">{renderTabContent()}</div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary btn-sm"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-500">Select a student to view details.</p>
      )}
    </div>
  );
};

StudentDetails.propTypes = {
  student: PropTypes.shape({
    admNo: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    dob: PropTypes.string,
    gender: PropTypes.string,
    status: PropTypes.string,
    country: PropTypes.string,
    nationality: PropTypes.string,
    remarks: PropTypes.string,
    academicYear: PropTypes.string,
    dateOfJoining: PropTypes.string,
    classAllocation: PropTypes.string,
    statusDate: PropTypes.string,
    isBoarding: PropTypes.bool,
    isSponsored: PropTypes.bool,
    busNo: PropTypes.string,
    transportArea: PropTypes.string,
    house: PropTypes.string,
    nemisNo: PropTypes.string,
    isStaffParent: PropTypes.bool,
    payrollNo: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default StudentDetails;

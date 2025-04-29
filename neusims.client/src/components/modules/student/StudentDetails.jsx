import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FamilyGuardianTab from "./FamilyGuardianTab";
import PersonalDetailsTab from "./PersonalDetailsTab";
import MedicalInfoTab from "./MedicalInfoTab";
import PrevInstituteTab from "./PrevInstituteTab";
import { studentService } from "@services/studentService";

const StudentDetails = ({ student = null, onSave }) => {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [formData, setFormData] = useState({
    // Match database fields
    entityNo: 0,
    entityType: "STD",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    idType: "STD",
    idNo: "",
    dob: "",
    gender: "",
    disability: "",
    nationality: "",
    poBox: "",
    address1: "",
    address2: "",
    phoneNo2: "",
    emailId: "",
    remarks: "",
    academicYear: "",
    dateOfJoining: "",
    isBoarding: false,
    isSponsored: false,
    transport: "N",
    busNo: "",
    transportArea: "",
    house: "",
    nemisNo: "",
    status: "Active",
    statusCode: 1,
    // Guardian fields
    guardian1: "",
    guardian1Firstname: "",
    guardian1Lastname: "",
    relation1: "",
    guardian1IdNo: "",
    guardian1Tel1: "",
    guardian1WTel: "",
    guardianPhone1: "",
    guardian1Email: "",
    guardian1Email2: "",
    guardian1Occupation: "",
    guardian1Company: "",
    guardian1CompanyAddress: "",
    guardian1Fax: "",
    guardian1Residence: "",
    guardian2: "",
    guardian2Firstname: "",
    guardian2Lastname: "",
    relation2: "",
    guardian2IdNo: "",
    guardian2Tel1: "",
    guardian2WTel: "",
    guardianPhone2: "",
    guardian2Email: "",
    guardian2Email2: "",
    guardian2Occupation: "",
    guardian2Company: "",
    guardian2CompanyAddress: "",
    guardian2Fax: "",
    guardian2Residence: "",
    // Emergency contact fields
    emergencyName: "",
    emergencyRelation: "",
    emergencyHomePhone: "",
    emergencyWorkPhone: "",
    // Previous Institute fields
    prevInstitute: "",
    lastAttended: "",
    prevRemark: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (student) {
      // Reset to Personal Details tab when creating new student or changing students
      if (student.entityNo === 0 || !student.entityNo) {
        setActiveTab("Personal Details");
      }

      setFormData({
        entityNo: student.entityNo || 0,
        entityType: student.entityType || "STD",
        title: student.title || "",
        firstName: student.fName || "",
        middleName: student.mName || "",
        lastName: student.lName || "",
        idType: student.idType || "STD",
        idNo: student.idNo || "",
        dob: student.dob
          ? new Date(student.dob).toISOString().split("T")[0]
          : "",
        gender: student.sex || "",
        nationality: student.nationality || "",
        poBox: student.poBox || "",
        address1: student.address1 || "",
        address2: student.address2 || "",
        phoneNo2: student.phoneNo2 || "",
        emailId: student.emailId || "",

        remark: student.remark || "",
        academicYear: student.year || "",
        dateOfJoining: student.doj
          ? new Date(student.doj).toISOString().split("T")[0]
          : "",
        isBoarding: student.boarding === "Y",
        isSponsored: student.sponsored === "Y",
        transport: student.transport || "N",
        busNo: student.busNo?.toString() || "",
        transportArea: student.transportArea || "",
        house: student.house || "",
        nemisNo: student.nemisNo || "",
        status: student.statusCode === 1 ? "Active" : "Inactive",
        statusCode: student.statusCode || 1,
        isStaffParent: student.isStaffParent || false,
        payrollNo: student.payrollNo || "", //TODO show
        // guardian fields
        guardian1: student.guardian1 || "",
        guardian1Firstname: student.guardian1Firstname || "",
        guardian1Lastname: student.guardian1Lastname || "",
        relation1: student.relation1 || "",
        guardian1IdNo: student.guardian1IdNo || "",
        guardian1Tel1: student.guardian1Tel1 || "",
        guardian1WTel: student.guardian1WTel || "",
        guardianPhone1: student.guardianPhone1 || "",
        guardian1Residence: student.guardian1Residence || "",
        guardian2: student.guardian2 || "",
        guardian2Firstname: student.guardian2Firstname || "",
        guardian2Lastname: student.guardian2Lastname || "",
        relation2: student.relation2 || "",
        guardian2IdNo: student.guardian2IdNo || "",
        guardian2Residence: student.guardian2Residence || "",
        emergencyName: student.emgName || "",
        emergencyRelation: student.emgRelation || "",
        emergencyHomePhone: student.emgHomePhone || "",
        emergencyWorkPhone: student.emgWorkPhone || "",

        //previous institute fields
        prevInstitute: student.prevInstitute || "",
        lastAttended: student.lastAttended || "",
        prevRemark: student.prevRemark || "",

        // medical information fields
        disability: student.disability || "",
        // ...student
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
    setSaveSuccess(false);

    try {
      const studentData = {
        ...formData,
        entityNo: formData.entityNo || 0, // Use existing entityNo for updates
        updatedUser: "currentUser", // TODO: Get from auth context
      };
      // Just pass data to parent i.e Student.jsx
      if (onSave) {
        await onSave(studentData);
        setSaveSuccess(true);
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
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
      {/* Show messages at the top of the form */}
      {/* {(saveSuccess || saveError) && (
        <div
          className={`mb-4 p-4 rounded-md ${
            saveSuccess
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{saveSuccess ? "✅" : "❌"}</span>
            <span className={saveSuccess ? "text-green-700" : "text-red-700"}>
              {saveSuccess ? "Student saved successfully!" : saveError}
            </span>
          </div>
        </div>
      )} */}

      {student ? (
        <form onSubmit={handleSave} className="border rounded p-4">
          <div className="border rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  {`${formData.firstName || ""} ${formData.middleName || ""} ${
                    formData.lastName || ""
                  }`.trim() || "New Student"}
                </h2>
                <p>Student No: {formData.entityNo || "Pending"}</p>
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
            <button
              type="submit"
              disabled={isSaving}
              className={`btn btn-primary btn-sm ${
                isSaving ? "opacity-50" : ""
              }`}
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner"></span>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p>Select a student to view details</p>
          <p>or click &quot;New Student&quot; to add one.</p>
        </div>
      )}

      {/* Move messages to fixed position at bottom */}
      {(saveSuccess || saveError) && (
        <div
          className={`fixed bottom-4 right-4 max-w-md p-4 rounded-md shadow-lg ${
            saveSuccess
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{saveSuccess ? "✅" : "❌"}</span>
            <span className={saveSuccess ? "text-green-700" : "text-red-700"}>
              {saveSuccess ? "Student saved successfully!" : saveError}
            </span>
            {/* Close button */}
            <button
              onClick={() => {
                setSaveSuccess(false);
                setSaveError(null);
              }}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

StudentDetails.propTypes = {
  student: PropTypes.shape({
    entityNo: PropTypes.number,
    entityType: PropTypes.string,
    title: PropTypes.string,
    fName: PropTypes.string,
    mName: PropTypes.string,
    lName: PropTypes.string,
    idType: PropTypes.string,
    idNo: PropTypes.string,
    dob: PropTypes.string,
    sex: PropTypes.string,
    disability: PropTypes.string,
    nationality: PropTypes.string,
    poBox: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.string,
    phoneNo2: PropTypes.string,
    emailId: PropTypes.string,
    remark: PropTypes.string,
    year: PropTypes.string,
    doj: PropTypes.string,
    boarding: PropTypes.string,
    transport: PropTypes.string,
    busNo: PropTypes.number,
    sponsored: PropTypes.string,
    transportArea: PropTypes.string,
    house: PropTypes.string,
    nemisNo: PropTypes.string,
    statusCode: PropTypes.number,
    // Guardian fields
    guardian1: PropTypes.string,
    guardian1Firstname: PropTypes.string,
    guardian1Lastname: PropTypes.string,
    relation1: PropTypes.string,
    guardian1IdNo: PropTypes.string,
    guardian1Tel1: PropTypes.string,
    guardian1WTel: PropTypes.string,
    guardianPhone1: PropTypes.string,
    guardian1Email: PropTypes.string,
    guardian1Email2: PropTypes.string,
    guardian1Occupation: PropTypes.string,
    guardian1Company: PropTypes.string,
    guardian1CompanyAddress: PropTypes.string,
    guardian1Fax: PropTypes.string,
    guardian1Residence: PropTypes.string,
    // Guardian 2 fields
    guardian2: PropTypes.string,
    guardian2Firstname: PropTypes.string,
    guardian2Lastname: PropTypes.string,
    relation2: PropTypes.string,
    guardian2IdNo: PropTypes.string,
    guardian2Tel1: PropTypes.string,
    guardian2WTel: PropTypes.string,
    guardianPhone2: PropTypes.string,
    guardian2Email: PropTypes.string,
    guardian2Email2: PropTypes.string,
    guardian2Occupation: PropTypes.string,
    guardian2Company: PropTypes.string,
    guardian2CompanyAddress: PropTypes.string,
    guardian2Fax: PropTypes.string,
    guardian2Residence: PropTypes.string,
    // Emergency contact fields
    emergencyName: PropTypes.string,
    emergencyRelation: PropTypes.string,
    emergencyHomePhone: PropTypes.string,
    emergencyWorkPhone: PropTypes.string,
    // Previous Institute fields
    prevInstitute: PropTypes.string,
    lastAttended: PropTypes.string,
    prevRemark: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default StudentDetails;

import api from "./api";

export const studentService = {
  saveStudent: async (studentData) => {
    try {
      const response = await api.post("/Entity/SaveEntity", {
        // Personal Details Tab
        EntityNo: studentData.entityNo || 0,
        EntityType: "STD",
        Title: studentData.title || "",
        FName: studentData.firstName || "",
        MName: studentData.middleName || "",
        LName: studentData.lastName || "",
        DOB: studentData.dob || null, // Default to null if not provided TODO
        Sex: studentData.gender || "",
        Year: studentData.academicYear || "",
        DOJ: studentData.dateOfJoining || new Date(),
        StatusCode: studentData.status === "Active" ? 1 : 0,
        Nationality: studentData.nationality || "",
        Transport: studentData.busNo ? "Y" : "N",
        BusNo: parseInt(studentData.busNo) || 0,
        TransportArea: studentData.transportArea || "",
        Boarding: studentData.isBoarding ? "Y" : "N",
        Sponsored: studentData.isSponsored ? "Y" : "N",
        House: studentData.house || "",
        NemisNo: studentData.nemisNo || "",
        StaffNo: studentData.staffNo || "",
        Remark: studentData.remarks || "",

        // Family & Guardian Tab
        Guardian1: studentData.guardian1 || "",
        Guardian1Firstname: studentData.guardian1Firstname || "",
        Guardian1Lastname: studentData.guardian1Lastname || "",
        Relation1: studentData.relation1 || "",
        Guardian1IdNo: studentData.guardian1IdNo || "",
        Guardian1Tel1: studentData.guardian1Tel1 || "",
        Guardian1WTel: studentData.guardian1WTel || "",
        GuardianPhone1: studentData.guardianPhone1 || "",
        Guardian1Email: studentData.guardian1Email || "",
        Guardian1Email2: studentData.guardian1Email2 || "",
        Guardian1Occupation: studentData.guardian1Occupation || "",
        Guardian1Company: studentData.guardian1Company || "",
        Guardian1CompanyAddress: studentData.guardian1CompanyAddress || "",
        Guardian1Fax: studentData.guardian1Fax || "",
        Guardian1Residence: studentData.guardian1Residence || "",

        Guardian2: studentData.guardian2 || "",
        Guardian2Firstname: studentData.guardian2Firstname || "",
        Guardian2Lastname: studentData.guardian2Lastname || "",
        Relation2: studentData.relation2 || "",
        Guardian2IdNo: studentData.guardian2IdNo || "",
        Guardian2Tel1: studentData.guardian2Tel1 || "",
        Guardian2WTel: studentData.guardian2WTel || "",
        GuardianPhone2: studentData.guardianPhone2 || "",
        Guardian2Email: studentData.guardian2Email || "",
        Guardian2Email2: studentData.guardian2Email2 || "",
        Guardian2Occupation: studentData.guardian2Occupation || "",
        Guardian2Company: studentData.guardian2Company || "",
        Guardian2CompanyAddress: studentData.guardian2CompanyAddress || "",
        Guardian2Fax: studentData.guardian2Fax || "",
        Guardian2Residence: studentData.guardian2Residence || "",

        EmgName: studentData.emergencyName || "",
        EmgRelation: studentData.emergencyRelation || "",
        EmgHomePhone: studentData.emergencyHomePhone || "",
        EmgWorkPhone: studentData.emergencyWorkPhone || "",

        // Medical Info Tab TODO
        Disability: studentData.disability || "",
        // MedicalProblems: studentData.medicalProblems || "",
        // MedicalDetails: studentData.medicalDetails || "",
        // Hospital: studentData.hospital || "",
        // HospitalTel: studentData.hospitalTel || "",
        // FamilyDoctor: studentData.familyDoctor || "",
        // DoctorMobile: studentData.doctorMobile || "",
        // DoctorAddress: studentData.doctorAddress || "",

        // Previous Institute Tab
        PrevInstitute: studentData.prevInstitute || "",
        LastAttended: studentData.lastAttended || "",
        PrevRemark: studentData.prevRemark || "",

        // Metadata
        UpdatedUser: studentData.updatedUser || "currentUser",
        UpdatedDate: new Date(), // Current date and time

        //not captured in student TODO
        IdType: "STD", // Can be added later
        IdNo: studentData.nemisNo || "", // Use NEMIS number or empty string,
        PoBox: "",
        Address1: "",
        Address2: "",
        PhoneNo2: "",
        EmailId: "",
        CountryNo: 0, // Hardcoded for now
        ProvinceNo: 0,
        AreaNo: 0,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to save student"
      );
    }
  },

  getStudentsList: async () => {
    try {
      const response = await api.get("/Entity/GetEntities");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch students list"
      );
    }
  },

  getStudent: async (entityNo) => {
    try {
      const response = await api.get(`/Entity/GetEntity/${entityNo}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch student details"
      );
    }
  },
};

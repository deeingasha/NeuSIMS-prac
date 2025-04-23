import { useState } from "react";
import StudentList from "@components/modules/student/StudentList";
import StudentDetails from "@components/modules/student/StudentDetails";
import { studentService } from "../../services/studentService"; // Adjust the import path as necessary

const Student = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  // const [students, setStudents] = useState([/* initial data */]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy Student Data (Replace with API later)
  const students = [
    {
      admNo: 1160,
      name: "Ethan Leon Mwaniki",
      title: "Mr.",
      firstName: "Ethan",
      middleName: "Leon",
      lastName: "Mwaniki",
      dob: "2010-03-08",
      gender: "male",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Excellent student",
      academicYear: "2025",
      dateOfJoining: "2015-01-10",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: false,
      isSponsored: false,
      busNo: "12",
      transportArea: "Area 1",
      house: "Red",
      nemisNo: "123456789",
      isStaffParent: false,
      payrollNo: "",
    },
    {
      admNo: 1524,
      name: "Zachary Kinyua Njora",
      title: "Mr.",
      firstName: "Zachary",
      middleName: "Kinyua",
      lastName: "Njora",
      dob: "2011-07-15",
      gender: "male",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Good in sports",
      academicYear: "2025",
      dateOfJoining: "2016-02-20",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: true,
      isSponsored: false,
      busNo: "15",
      transportArea: "Area 2",
      house: "Blue",
      nemisNo: "987654321",
      isStaffParent: true,
      payrollNo: "456789",
    },
    {
      admNo: 1549,
      name: "Jesse Osteen Awuor",
      title: "Mr.",
      firstName: "Jesse",
      middleName: "Osteen",
      lastName: "Awuor",
      dob: "2012-01-20",
      gender: "male",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Needs improvement in math",
      academicYear: "2025",
      dateOfJoining: "2017-03-15",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: false,
      isSponsored: true,
      busNo: "10",
      transportArea: "Area 1",
      house: "Green",
      nemisNo: "112233445",
      isStaffParent: false,
      payrollNo: "",
    },
    {
      admNo: 1557,
      name: "Sheila Muthoni Karanja",
      title: "Miss",
      firstName: "Sheila",
      middleName: "Muthoni",
      lastName: "Karanja",
      dob: "2011-05-10",
      gender: "female",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Excellent in arts",
      academicYear: "2025",
      dateOfJoining: "2016-04-25",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: true,
      isSponsored: false,
      busNo: "8",
      transportArea: "Area 3",
      house: "Yellow",
      nemisNo: "556677889",
      isStaffParent: false,
      payrollNo: "",
    },
    {
      admNo: 1601,
      name: "Aiden James Mwangi",
      title: "Mr.",
      firstName: "Aiden",
      middleName: "James",
      lastName: "Mwangi",
      dob: "2010-11-22",
      gender: "male",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Very punctual",
      academicYear: "2025",
      dateOfJoining: "2015-05-10",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: false,
      isSponsored: false,
      busNo: "14",
      transportArea: "Area 2",
      house: "Red",
      nemisNo: "223344556",
      isStaffParent: false,
      payrollNo: "",
    },
    {
      admNo: 1623,
      name: "Olivia Grace Njeri",
      title: "Miss",
      firstName: "Olivia",
      middleName: "Grace",
      lastName: "Njeri",
      dob: "2011-02-14",
      gender: "female",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Excellent in science",
      academicYear: "2025",
      dateOfJoining: "2016-03-12",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: true,
      isSponsored: false,
      busNo: "9",
      transportArea: "Area 1",
      house: "Blue",
      nemisNo: "334455667",
      isStaffParent: false,
      payrollNo: "",
    },
    {
      admNo: 1645,
      name: "Liam Michael Otieno",
      title: "Mr.",
      firstName: "Liam",
      middleName: "Michael",
      lastName: "Otieno",
      dob: "2012-06-30",
      gender: "male",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Needs improvement in English",
      academicYear: "2025",
      dateOfJoining: "2017-08-20",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: false,
      isSponsored: true,
      busNo: "11",
      transportArea: "Area 3",
      house: "Green",
      nemisNo: "445566778",
      isStaffParent: false,
      payrollNo: "",
    },
    {
      admNo: 1678,
      name: "Sophia Rose Wanjiku",
      title: "Miss",
      firstName: "Sophia",
      middleName: "Rose",
      lastName: "Wanjiku",
      dob: "2011-09-05",
      gender: "female",
      status: "Active",
      country: "Kenya",
      nationality: "Kenyan",
      remarks: "Very creative",
      academicYear: "2025",
      dateOfJoining: "2016-11-15",
      classAllocation: "PP1R",
      statusDate: "",
      isBoarding: true,
      isSponsored: false,
      busNo: "13",
      transportArea: "Area 2",
      house: "Yellow",
      nemisNo: "556677889",
      isStaffParent: false,
      payrollNo: "",
    },
  ];
  // Add save handler without modifying the dummy data
  const handleSave = async (studentData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Log the data being sent to API
      console.log("Attempting to save student:", studentData);

      // Call your save API
      const response = await studentService.saveStudent(studentData);
      console.log("Save response:", response);

      // Show success message (you can add a toast notification here)
      alert("Student saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      setError(error.message || "Failed to save student");
      throw error; // Propagate error back to child component
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex p-4 h-full">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {isLoading && <div className="text-blue-500 mb-4">Saving...</div>}
      <StudentList students={students} onSelect={setSelectedStudent} />
      <StudentDetails student={selectedStudent} onSave={handleSave} />
    </div>
  );
};

export default Student;

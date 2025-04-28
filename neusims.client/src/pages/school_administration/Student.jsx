import { useState, useEffect } from "react";
import StudentList from "@components/modules/student/StudentList";
import StudentDetails from "@components/modules/student/StudentDetails";
import { studentService } from "../../services/studentService"; // Adjust the import path as necessary

const Student = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await studentService.getStudentsList();
      setStudents(response);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setError("Failed to load students list");
    } finally {
      setIsLoading(false);
    }
  };
  const handleStudentSelect = async (student) => {
    try {
      setIsLoading(true);
      const fullStudentData = await studentService.getStudent(student.entityNo);
      setSelectedStudent(fullStudentData);
    } catch (error) {
      console.error("Failed to fetch student details:", error);
      setError("Failed to load student details");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSave = async (studentData) => {
    try {
      setIsLoading(true);
      setError(null);
      await studentService.saveStudent(studentData);
      fetchStudents(); // Refresh list after save
    } catch (error) {
      console.error("Save error:", error);
      setError(error.message || "Failed to save student");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 h-full">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2 text-red-600">
            <span>❌</span>
            <span>{error}</span>
          </div>
        </div>
      )}
      <div className="flex flex-1">
        <StudentList
          students={students}
          onSelect={handleStudentSelect}
          isLoading={isLoading}
          error={error} // Pass error to StudentList
        />
        <StudentDetails
          student={selectedStudent || null} //always show StudentDetails even if null
          onSave={handleSave}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Student;

import { useState } from "react";
import PropTypes from "prop-types";
import StudentList from "./StudentList";
import SubjectList from "./SubjectList";

const EditSubjectAllocationTab = ({ filters }) => {
  const [students, setStudents] = useState([
    { id: 1, admNo: "ADM001", name: "John Doe", selected: false },
    { id: 2, admNo: "ADM002", name: "Jane Smith", selected: false },
  ]);

  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", shortName: "MATH", selected: false },
    { id: 2, name: "English", shortName: "ENG", selected: false },
  ]);

  const toggleAllSubjects = (e) => {
    setSubjects((prev) =>
      prev.map((subject) => ({
        ...subject,
        selected: e.target.checked,
      }))
    );
  };

  const toggleSubject = (subjectId) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === subjectId
          ? { ...subject, selected: !subject.selected }
          : subject
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <StudentList students={students} showSelect={false} />
      <SubjectList
        subjects={subjects}
        onToggleAll={toggleAllSubjects}
        onToggleOne={toggleSubject}
      />
    </div>
  );
};

EditSubjectAllocationTab.propTypes = {
  filters: PropTypes.shape({
    academicYear: PropTypes.string,
    classGroup: PropTypes.string,
    class: PropTypes.string,
    stream: PropTypes.string,
  }).isRequired,
};

export default EditSubjectAllocationTab;

import PropTypes from "prop-types";

const StudentList = ({
  students,
  onToggleAll,
  onToggleOne,
  showSelect = true,
}) => {
  return (
    <div className="table-container">
      <table className="table table-xs w-full">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th>Adm No</th>
            <th>Name</th>
            {showSelect && (
              <th className="w-20">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    onChange={onToggleAll}
                    className="checkbox checkbox-xs"
                  />
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="text-center">{index + 1}</td>
              <td>{student.admNo}</td>
              <td>{student.name}</td>
              {showSelect && (
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={student.selected}
                    onChange={() => onToggleOne(student.id)}
                    className="checkbox checkbox-xs"
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      admNo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ).isRequired,
  onToggleAll: PropTypes.func,
  onToggleOne: PropTypes.func,
  showSelect: PropTypes.bool,
};

export default StudentList;

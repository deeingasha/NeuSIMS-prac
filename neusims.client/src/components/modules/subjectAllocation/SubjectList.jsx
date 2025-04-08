import PropTypes from "prop-types";

const SubjectList = ({ subjects, onToggleAll, onToggleOne }) => {
  return (
    <div className="table-container">
      <table className="table table-xs w-full">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th>Subject Name</th>
            <th>Short Name</th>
            <th className="w-20">
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  onChange={onToggleAll}
                  className="checkbox checkbox-xs"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.id}>
              <td className="text-center">{index + 1}</td>
              <td>{subject.name}</td>
              <td>{subject.shortName}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={subject.selected}
                  onChange={() => onToggleOne(subject.id)}
                  className="checkbox checkbox-xs"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SubjectList.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      shortName: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleAll: PropTypes.func.isRequired,
  onToggleOne: PropTypes.func.isRequired,
};

export default SubjectList;

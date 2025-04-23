import React from "react";
import PropTypes from "prop-types";

const FamilyGuardianTab = ({ formData, handleChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs">
      {/* Guardian 1 Section */}
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Guardian 1 Details
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            name="guardian1Firstname"
            value={formData.guardian1Firstname || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Middle Name</label>
          <input
            type="text"
            name="guardian1"
            value={formData.guardian1 || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            name="guardian1Lastname"
            value={formData.guardian1Lastname || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Relation</label>
          <select
            name="relation1"
            value={formData.relation1 || ""}
            onChange={handleChange}
            className="select select-bordered select-xs w-full"
          >
            <option value="">Select Relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block">ID No./Passport</label>
          <input
            type="text"
            name="guardian1IdNo"
            value={formData.guardian1IdNo || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Residence</label>
          <input
            type="text"
            name="guardian1Residence"
            value={formData.guardian1Residence || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Tel</label>
          <input
            type="text"
            name="guardian1Tel1"
            value={formData.guardian1Tel1 || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Work Tel</label>
          <input
            type="text"
            name="guardian1WTel"
            value={formData.guardian1WTel || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Mobile</label>
          <input
            type="text"
            name="guardianPhone1"
            value={formData.guardianPhone1 || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
      </div>
      {/* Guardian 2 Section */}
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Guardian 2 Details
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            name="guardian2Firstname"
            value={formData.guardian2Firstname || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Middle Name</label>
          <input
            type="text"
            name="guardian2"
            value={formData.guardian2 || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            name="guardian2Lastname"
            value={formData.guardian2Lastname || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Relation</label>
          <select
            name="relation2"
            value={formData.relation2 || ""}
            onChange={handleChange}
            className="select select-bordered select-xs w-full"
          >
            <option value="">Select Relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block">ID No./Passport</label>
          <input
            type="text"
            name="guardian2IdNo"
            value={formData.guardian2IdNo || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Residence</label>
          <input
            type="text"
            name="guardian2Residence"
            value={formData.guardian2Residence || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
      </div>
      {/* Emergency Contact Section */}
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Other Emergency Contact
      </h2>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="emergencyName"
            value={formData.emergencyName || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Relationship</label>
          <input
            type="text"
            name="emergencyRelation"
            value={formData.emergencyRelation || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Home Phone</label>
          <input
            type="text"
            name="emergencyHomePhone"
            value={formData.emergencyHomePhone || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Work Phone</label>
          <input
            type="text"
            name="emergencyWorkPhone"
            value={formData.emergencyWorkPhone || ""}
            onChange={handleChange}
            className="input input-bordered input-xs w-full"
          />
        </div>
      </div>
    </div>
  );
};

FamilyGuardianTab.propTypes = {
  formData: PropTypes.shape({
    guardian1: PropTypes.string,
    guardian1Firstname: PropTypes.string,
    guardian1Lastname: PropTypes.string,
    relation1: PropTypes.string,
    guardian1IdNo: PropTypes.string,
    guardian1Residence: PropTypes.string,
    guardian1Tel1: PropTypes.string,
    guardian1WTel: PropTypes.string,
    guardianPhone1: PropTypes.string,
    guardian2Firstname: PropTypes.string,
    guardian2: PropTypes.string,
    guardian2Lastname: PropTypes.string,
    relation2: PropTypes.string,
    guardian2IdNo: PropTypes.string,
    guardian2Residence: PropTypes.string,
    emergencyName: PropTypes.string,
    emergencyRelation: PropTypes.string,
    emergencyHomePhone: PropTypes.string,
    emergencyWorkPhone: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FamilyGuardianTab;

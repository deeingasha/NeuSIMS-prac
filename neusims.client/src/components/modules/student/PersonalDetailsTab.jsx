import React from "react";
import PropTypes from "prop-types";

const PersonalDetailsTab = ({ formData, handleChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs border border-gray-300">
      <h2 className="text-sm font-semibold mb-2">Student Information</h2>

      {/* Grid Layout for Compact Form */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">
              Academic Year<span className="text-red-500">*</span>:
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
              required
            >
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">
              Title<span className="text-red-500">*</span>:
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
              required
            >
              <option>Mr.</option>
              <option>Miss</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">
              First Name<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">
              Last Name<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">
              Gender<span className="text-red-500">*</span>:
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div
            className="border border-gray-300 rounded-md p-2 relative mx-auto mt-18"
            style={{ width: "80%", height: "70px" }}
          >
            <legend className="absolute -top-3 left-2 bg-white px-1 text-gray-600 text-xs">
              Class Allocation
            </legend>

            <div className="flex items-center justify-center h-full">
              {/* Class Text (Styled Like a Button/Link) */}
              <a href="#" className="text-blue-500 text-xs underline">
                Joined in class {formData.classAllocation}
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
            >
              <option>Active</option>
              <option>Alumni</option>
            </select>
          </div>

          <div className="flex-1 border border-gray-300 rounded-md p-2 relative">
            <legend className="absolute -top-3 left-2 bg-white px-1 text-gray-600 text-xs">
              Status Date
            </legend>

            <div className="flex items-center gap-2">
              {/* Date Label */}
              <label className="text-gray-600 text-xs">Date:</label>

              {/* Date Picker (Matching Select Input Width) */}
              <input
                type="date"
                name="statusDate"
                value={formData.statusDate}
                onChange={handleChange}
                className="input input-xs w-full border border-gray-300 bg-gray-100 text-gray-500 disabled:cursor-not-allowed"
                disabled // Modify behavior later
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">
              Country<span className="text-red-500">*</span>:
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
              required
            >
              <option>Kenya</option>
              <option>Uganda</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Nationality:</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <fieldset className="border border-gray-300 p-3 rounded w-3/4 mx-auto">
            <legend className="text-xs font-medium px-2">
              Indicate if Required
            </legend>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="isBoarding"
                  checked={formData.isBoarding}
                  onChange={handleChange}
                  className="checkbox checkbox-xs border border-gray-300"
                />
                Boarding
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="isSponsored"
                  checked={formData.isSponsored}
                  onChange={handleChange}
                  className="checkbox checkbox-xs border border-gray-300"
                />
                Sponsored
              </label>
            </div>
          </fieldset>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Bus No.:</label>
            <input
              type="text"
              name="busNo"
              value={formData.busNo}
              onChange={handleChange}
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">Transport Area:</label>
            <select
              name="transportArea"
              value={formData.transportArea}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
            >
              <option>Area 1</option>
              <option>Area 2</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40 font-medium">House:</label>
            <select
              name="house"
              value={formData.house}
              onChange={handleChange}
              className="select select-xs w-full border border-gray-300"
            >
              <option>Red</option>
              <option>Blue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Full-Width Fields */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <label className="w-40 font-medium">Remarks:</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="textarea textarea-xs w-full border border-gray-300"
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <label className="w-40 font-medium">Nemis No.:</label>
          <input
            type="text"
            name="nemisNo"
            value={formData.nemisNo}
            onChange={handleChange}
            className="input input-xs w-full border border-gray-300"
          />
        </div>

        {/* Parent is Staff (Checkbox Toggles Payroll No) */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isStaffParent"
              checked={formData.isStaffParent}
              onChange={handleChange}
              className="checkbox checkbox-xs border border-gray-300"
            />
            Parent is Staff
          </label>

          {/* Floating Label Payroll No (Appears When Checked) */}
          {formData.isStaffParent && (
            <div className="flex items-center gap-2 mt-2">
              <label className="w-40 font-medium">Payroll No:</label>
              <input
                type="text"
                name="payrollNo"
                value={formData.payrollNo}
                onChange={handleChange}
                className="input input-xs w-full border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PersonalDetailsTab.propTypes = {
  formData: PropTypes.shape({
    academicYear: PropTypes.string,
    dateOfJoining: PropTypes.string,
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
  handleChange: PropTypes.func.isRequired,
};

export default PersonalDetailsTab;

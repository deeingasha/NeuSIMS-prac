import React from "react";
import PropTypes from "prop-types";
import { useAcademic } from "@hooks/useAcademic";

const PersonalDetailsTab = ({ formData, handleChange }) => {
  const { academicYears, classes, streams, loading, error } = useAcademic();

  //Add debug logging
  console.log("PeronalDetailTab render:", {
    academicYears,
    classes,
    streams,
    loading,
    error,
    formData,
  });
  console.log("Stream Debug:", {
    formDataStreamNo: formData.streamNo,
    formDataStreamName: formData.streamName,
    formDataClassName: formData.className,
    availableStreams: formData.classNo ? streams[formData.classNo] : null,
    streamsType: typeof formData.streamNo,
  });

  if (loading) return <div>Loading academic data...</div>;
  if (error) return <div>Error loading academic data: {error}</div>;

  // Add empty state checks
  const hasAcademicYears =
    Array.isArray(academicYears) && academicYears.length > 0;
  const hasClasses = Array.isArray(classes) && classes.length > 0;
  // const hasStreams = formData.classNo && streams[formData.classNo]?.length > 0;
  // Modified hasStreams check to handle initial load
  const hasStreams =
    formData.classNo &&
    streams[formData.classNo] &&
    Array.isArray(streams[formData.classNo]) &&
    streams[formData.classNo].length > 0;

  // Update the academic year select
  const academicYearSelect = (
    <select
      name="academicYear"
      value={formData.academicYear || ""}
      onChange={handleChange}
      className="select select-xs w-full border border-gray-300"
      required
    >
      <option value="">Select Year</option>
      {hasAcademicYears ? (
        academicYears.map((year) => (
          <option key={year.yearId} value={year.yearId}>
            {year.yearName}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No academic years available
        </option>
      )}
    </select>
  );

  // Update the class select
  const classSelect = (
    <select
      name="classNo"
      value={formData.classNo || ""}
      onChange={handleChange}
      className="select select-xs select-bordered flex-grow"
    >
      <option value="">Select Class</option>
      {hasClasses ? (
        classes.map((cls) => (
          <option key={cls.classNo} value={cls.classNo}>
            {cls.className}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No classes available
        </option>
      )}
    </select>
  );

  // Update the stream select
  const streamSelect = (
    <select
      name="streamNo"
      value={formData.streamNo || ""}
      onChange={handleChange}
      className="select select-xs select-bordered flex-grow"
      disabled={!formData.classNo}
    >
      {/* <option value="">Select Stream</option>
      {hasStreams ? (
        streams[formData.classNo].map((stream) => (
          <option key={stream.streamNo} value={stream.streamNo}>
            {stream.streamName}
          </option>
        ))
      ) : (
        <option value="" disabled>
          {formData.classNo ? "No streams available" : "Select a class first"}
        </option>
      )} */}
      <option value="">Select Stream</option>

      {/* Show DB value first if it exists
      {formData.streamNo && (
        <option key="db-value" value={formData.streamNo}>
          {formData.streamName}
        </option>
      )} */}

      {/* Then show other streams for selected class */}
      {/* {hasStreams &&
        streams[formData.classNo].map(
          (stream) =>
            // Only show if not the current DB value
            stream.streamNo !== formData.streamNo && (
              <option key={stream.streamNo} value={stream.streamNo}>
                {stream.streamName}
              </option>
            )
        )} */}

      {/* Show all streams for selected class */}
      {/* Inject DB value if it's not in the current stream list */}
      {/* {formData.streamNo &&
        (!hasStreams ||
          !streams[formData.classNo].some(
            (stream) => stream.streamNo === formData.streamNo
          )) && (
          <option key="db-value" value={formData.streamNo}>
            {formData.streamName || `Stream ${formData.streamNo}`}
          </option>
        )} */}

      {/* Normal stream list */}
      {hasStreams &&
        streams[formData.classNo].map((stream) => (
          <option key={stream.streamNo} value={stream.streamNo}>
            {stream.streamName}
          </option>
        ))}

      {/* Loading and empty states */}
      {!hasStreams && formData.classNo && (
        <option value="" disabled>
          Loading streams...
        </option>
      )}
      {!formData.classNo && (
        <option value="" disabled>
          Select a class first
        </option>
      )}
    </select>
  );
  // const matchingStreamExists =
  //   hasStreams &&
  //   streams[formData.classNo].some(
  //     (stream) =>
  //       String(stream.streamNo) === String(formData.streamNo) &&
  //       stream.streamName === formData.streamName
  //   );
  // const streamSelect = (
  //   <select
  //     name="streamNo"
  //     value={String(formData.streamNo || "")}
  //     onChange={(e) => {
  //       const selectedStreamNo = e.target.value;
  //       const selectedStream = streams[formData.classNo]?.find(
  //         (stream) => String(stream.streamNo) === selectedStreamNo
  //       );

  //       handleChange({
  //         target: {
  //           name: "streamNo",
  //           value: selectedStreamNo,
  //         },
  //       });

  //       handleChange({
  //         target: {
  //           name: "streamName",
  //           value: selectedStream?.streamName || "",
  //         },
  //       });
  //     }}
  //     className="select select-xs select-bordered flex-grow"
  //     disabled={!formData.classNo}
  //   >
  //     <option value="">Select Stream</option>

  //     {/* Inject the DB stream if not yet in the stream list */}
  //     {/* {formData.streamNo &&
  //       (!hasStreams ||
  //         !streams[formData.classNo]?.some(
  //           (stream) =>
  //             String(stream.streamNo) === String(formData.streamNo) &&
  //             stream.streamName === formData.streamName
  //         )) && (
  //         <option key="db-injected" value={String(formData.streamNo)}>
  //           {formData.streamName || `Stream ${formData.streamNo}`}
  //         </option>
  //       )} */}
  //     {formData.streamNo && !matchingStreamExists && (
  //       <option key="db-injected" value={String(formData.streamNo)}>
  //         {formData.streamName || `Stream ${formData.streamNo}`}
  //       </option>
  //     )}

  //     {/* Now render the available streams */}
  //     {hasStreams &&
  //       streams[formData.classNo].map((stream) => (
  //         <option key={stream.streamNo} value={String(stream.streamNo)}>
  //           {stream.streamName}
  //         </option>
  //       ))}

  //     {!hasStreams && formData.classNo && (
  //       <option value="" disabled>
  //         No streams available
  //       </option>
  //     )}
  //     {!formData.classNo && (
  //       <option value="" disabled>
  //         Select a class first
  //       </option>
  //     )}
  //   </select>
  // );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs border border-gray-300">
      <h2 className="text-sm font-semibold mb-2">Student Information</h2>

      {/* Grid Layout for Compact Form */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {/* Academic Year Selection */}
            <label className="w-40 font-medium">
              Academic Year<span className="text-red-500">*</span>:
            </label>
            {academicYearSelect}
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
              // required
            >
              <option value="">Select Title</option>
              <option>Miss</option>
              <option>Mr</option>
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
            <div className="space-y-2">
              {/* Class Selection */}
              <div className="flex items-center gap-2">
                <label className="text-xs w-20">Class:</label>
                {classSelect}
              </div>
              {/* Stream Selection */}
              <div className="flex items-center gap-2">
                <label className="text-xs w-20">Stream:</label>
                {streamSelect}
              </div>
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
                disabled // TODO: Modify behavior later
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
              <option value="">Select</option>
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
              <option value="">Select</option>
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
    classNo: PropTypes.number,
    streamNo: PropTypes.number,
    currentStreamName: PropTypes.string,
    streamName: PropTypes.string,
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

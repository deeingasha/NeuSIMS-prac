import React from "react";

const PrevInstituteTab = () => {
  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-md bg-white text-xs">
      <div className="grid grid-cols-1 gap-4">
        {/* Previous Institute */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Prev. Institute
          </label>
          <input
            type="text"
            className="input input-xs w-full border border-gray-300 rounded-md"
            placeholder="Enter previous institute name"
          />
        </div>

        {/* Class Last Attended */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Class Last Attended
          </label>
          <input
            type="text"
            className="input input-xs w-full border border-gray-300 rounded-md"
            placeholder="Enter last attended class"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Remarks
          </label>
          <textarea
            className="textarea textarea-xs w-full border border-gray-300 rounded-md"
            rows="4"
            placeholder="Enter any remarks"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PrevInstituteTab;

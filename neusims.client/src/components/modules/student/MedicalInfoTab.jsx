import React from "react";

const MedicalInfoTab = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs">
      <h2 className="text-sm font-semibold mb-2">Medical Information</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="w-40">Disability:</label>
            <input
              type="text"
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40">Medical Problems:</label>
            <select className="select select-xs w-full border border-gray-300">
              <option>None</option>
              <option>Asthma</option>
              <option>Diabetes</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40">Hospital (Emergency):</label>
            <input
              type="text"
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40">Family Doctor:</label>
            <input
              type="text"
              className="input input-xs w-full border border-gray-300"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="w-40">Details:</label>
            <textarea className="textarea textarea-xs w-full border border-gray-300"></textarea>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40">Tel:</label>
            <input
              type="text"
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40">Dr. Mobile No.:</label>
            <input
              type="text"
              className="input input-xs w-full border border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-40">Physical Address:</label>
            <textarea className="textarea textarea-xs w-full border border-gray-300"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoTab;

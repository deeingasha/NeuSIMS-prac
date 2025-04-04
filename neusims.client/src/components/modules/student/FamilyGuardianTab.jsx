import React from "react";

const FamilyGuardianTab = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-xs">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Guardian 1 Details
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div>
          <label className="block">First Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Middle Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Relation</label>
          <select className="select select-bordered select-xs w-full">
            <option>Father</option>
            <option>Mother</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block">ID No./Passport</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Residence</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">If other, please specify</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Tel</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Mobile</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Work Tel</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Occupation</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Company</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Company Address</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Email 1</label>
          <input
            type="email"
            className="input input-bordered input-xs w-full"
          />
        </div>
        <div>
          <label className="block">Email 2</label>
          <input
            type="email"
            className="input input-bordered input-xs w-full"
          />
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Guardian 2 Details
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Repeat same fields for Guardian 2 */}
        <div>
          <label className="block">First Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Middle Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Relation</label>
          <select className="select select-bordered select-xs w-full">
            <option>Mother</option>
            <option>Father</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block">ID No./Passport</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Residence</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-2">
        Other Emergency Contact
      </h2>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block">Name</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Relationship</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Home Phone</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
        <div>
          <label className="block">Work Phone</label>
          <input type="text" className="input input-bordered input-xs w-full" />
        </div>
      </div>
    </div>
  );
};

export default FamilyGuardianTab;

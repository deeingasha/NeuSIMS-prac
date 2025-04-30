/**
 * TransportAreas Component
 *
 * Purpose:
 * - Manages transport zones and their fee structures
 * - Configures one-way/two-way transport rates
 *
 * Connections:
 * - Parent: FinanceSettings.jsx
 * - Used by: StudentFeeSelection.jsx, EditFeeSelection.jsx
 *
 * Features:
 * - Zone CRUD operations
 * - Rate configuration
 * - Distance-based pricing
 *
 * To Modify:
 * 1. TODO: put actual transport zones and details
 */
import { useState } from "react";

const TransportArea = () => {
  const [formData, setFormData] = useState({
    transportArea: "",
    description: "",
  });

  // Add state for managing edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for transport areas list
  const [transportAreas] = useState([
    {
      area: "Westlands and surrounding areas",
      description: "Zone A transport route",
    },
    { area: "Kilimani and Kileleshwa", description: "Zone B transport route" },
    { area: "Lavington and Karen", description: "Zone C transport route" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add handler for row clicks
  const handleRowClick = (area) => {
    setIsEditing(true);
    setFormData({
      transportArea: area.area,
      description: area.description || "", // Handle possible undefined description
    });
  };

  // Add handler for New button
  const handleNew = () => {
    setIsEditing(true);
    setFormData({
      transportArea: "",
      description: "",
    });
  };

  // Add handleSave function
  const handleSave = () => {
    // TODO: Add save logic here
    setIsEditing(false);
  };

  // Add handleCancel function to reset form
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      transportArea: "",
      description: "",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Panel - Transport Areas Table */}
      <div className="border rounded-lg p-4 shadow">
        <div className="overflow-x-auto">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="number-column">#</th>
                <th>Transport Area</th>
              </tr>
            </thead>
            <tbody>
              {transportAreas.map((area) => (
                <tr
                  key={area.area}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(area)}
                >
                  <td className="number-column"></td>
                  <td>{area.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel - Transport Area Form */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-4 text-sm">Transport Area Details</h3>
        <div className="space-y-4">
          {/* Transport Area Input */}
          <div className="flex items-center gap-2">
            <label className="w-32 font-medium text-xs">
              Transport Area:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="transportArea"
              value={formData.transportArea}
              onChange={handleChange}
              className={`input input-xs w-full border border-gray-300 ${
                !isEditing && "bg-gray-100"
              }`}
              disabled={!isEditing}
            />
          </div>

          {/* Description Textarea */}
          <div className="flex items-start gap-2">
            <label className="w-32 font-medium text-xs mt-2">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`textarea textarea-xs w-full border  border-gray-300 ${
                !isEditing && "bg-gray-100"
              }`}
              disabled={!isEditing}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              className="btn btn-xs"
              onClick={handleNew}
              disabled={isEditing}
            >
              New
            </button>
            <button
              className="btn btn-xs btn-primary"
              onClick={handleSave}
              disabled={!isEditing}
            >
              Save
            </button>
            <button
              className="btn btn-xs btn-error"
              onClick={handleCancel}
              disabled={!isEditing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportArea;

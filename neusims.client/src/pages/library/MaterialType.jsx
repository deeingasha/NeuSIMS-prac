import { useState } from "react";

const MaterialType = () => {
  // State management
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: "Story Books",
      description: "Fiction and non-fiction books",
    },
    {
      id: 2,
      name: "Journals",
      description: "Academic journals and periodicals",
    },
    { id: 3, name: "Syllabuses", description: "Course syllabi and guides" },
  ]);

  const [formData, setFormData] = useState({
    materialType: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [errors, setErrors] = useState({});

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRowClick = (material) => {
    setSelectedMaterialId(material.id);
    setFormData({
      materialType: material.name,
      description: material.description,
    });
    setIsEditing(true);
  };

  const handleNew = () => {
    setSelectedMaterialId(null);
    setFormData({ materialType: "", description: "" });
    setIsEditing(true);
    setErrors({});
  };

  const handleSave = () => {
    // Validation
    const newErrors = {};
    if (!formData.materialType.trim()) {
      newErrors.materialType = "Material type is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selectedMaterialId) {
      // Update existing material
      setMaterials(
        materials.map((material) =>
          material.id === selectedMaterialId
            ? {
                ...material,
                name: formData.materialType,
                description: formData.description,
              }
            : material
        )
      );
    } else {
      // Add new material
      setMaterials([
        ...materials,
        {
          id: materials.length + 1,
          name: formData.materialType,
          description: formData.description,
        },
      ]);
    }

    setIsEditing(false);
    setSelectedMaterialId(null);
    setFormData({ materialType: "", description: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedMaterialId(null);
    setFormData({ materialType: "", description: "" });
    setErrors({});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel - Materials Table */}
        <div className="border rounded-lg p-4 shadow">
          <div className="table-container">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>Material Type</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr
                    key={material.id}
                    onClick={() => handleRowClick(material)}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      selectedMaterialId === material.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{material.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Material Form */}
        <div className="border rounded-lg p-4 shadow">
          <div className="space-y-4">
            {/* Material Type Input */}
            <div className="flex items-center gap-2">
              <label className="w-32 font-medium text-xs">
                Material Type:<span className="text-red-500">*</span>
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  name="materialType"
                  value={formData.materialType}
                  onChange={handleChange}
                  className={`input input-xs w-full border ${
                    errors.materialType ? "border-red-500" : "border-gray-300"
                  } ${!isEditing && "bg-gray-100"}`}
                  disabled={!isEditing}
                />
                {errors.materialType && (
                  <span className="text-red-500 text-xs">
                    {errors.materialType}
                  </span>
                )}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex items-start gap-2">
              <label className="w-32 font-medium text-xs mt-2">
                Description:
              </label>
              <div className="flex-1">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`textarea textarea-xs w-full border ${
                    !isEditing ? "bg-gray-100" : "border-gray-300"
                  }`}
                  disabled={!isEditing}
                />
              </div>
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
                {selectedMaterialId ? "Save" : "Create"}
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
    </div>
  );
};

export default MaterialType;

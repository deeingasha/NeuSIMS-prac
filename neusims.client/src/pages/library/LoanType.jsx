import { useState } from "react";

const LoanType = () => {
  // State management
  const [loanTypes, setLoanTypes] = useState([
    { id: 1, name: "Long Duration", days: 14, amount: 50 },
    { id: 2, name: "Short Duration", days: 7, amount: 100 },
  ]);

  const [formData, setFormData] = useState({
    loanType: "",
    duration: "",
    amount: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
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

  const handleRowClick = (loan) => {
    setSelectedLoanId(loan.id);
    setFormData({
      loanType: loan.name,
      duration: loan.days,
      amount: loan.amount,
    });
    setIsEditing(true);
  };

  const handleNew = () => {
    setSelectedLoanId(null);
    setFormData({ loanType: "", duration: "", amount: "" });
    setIsEditing(true);
    setErrors({});
  };

  const handleSave = () => {
    // Validation
    const newErrors = {};
    if (!formData.loanType.trim()) {
      newErrors.loanType = "Loan type is required";
    }
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }
    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (selectedLoanId) {
      // Update existing loan type
      setLoanTypes(
        loanTypes.map((loan) =>
          loan.id === selectedLoanId
            ? {
                ...loan,
                name: formData.loanType,
                days: formData.duration,
                amount: formData.amount,
              }
            : loan
        )
      );
    } else {
      // Add new loan type
      setLoanTypes([
        ...loanTypes,
        {
          id: loanTypes.length + 1,
          name: formData.loanType,
          days: formData.duration,
          amount: formData.amount,
        },
      ]);
    }

    setIsEditing(false);
    setSelectedLoanId(null);
    setFormData({ loanType: "", duration: "", amount: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedLoanId(null);
    setFormData({ loanType: "", duration: "", amount: "" });
    setErrors({});
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Panel - Loan Types Table */}
        <div className="border rounded-lg p-4 shadow">
          <div className="table-container">
            <table className="table table-xs w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>Loan Type</th>
                </tr>
              </thead>
              <tbody>
                {loanTypes.map((loan, index) => (
                  <tr
                    key={loan.id}
                    onClick={() => handleRowClick(loan)}
                    className={`hover:bg-gray-100 cursor-pointer ${
                      selectedLoanId === loan.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{loan.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel - Loan Type Form */}
        <div className="border rounded-lg p-4 shadow">
          <div className="space-y-4">
            {/* Loan Type Input */}
            <div className="flex items-center gap-2">
              <label className="w-32 font-medium text-xs">
                Loan Type:<span className="text-red-500">*</span>
              </label>
              <div className="flex-1">
                <input
                  type="text"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  className={`input input-xs w-full border-2 ${
                    errors.loanType ? "border-red-500" : "border-gray-300"
                  } ${!isEditing && "bg-gray-100"}`}
                  disabled={!isEditing}
                />
                {errors.loanType && (
                  <span className="text-red-500 text-xs">
                    {errors.loanType}
                  </span>
                )}
              </div>
            </div>

            {/* Days/Duration Input */}
            <div className="flex items-center gap-2">
              <label className="w-32 font-medium text-xs">
                Days/Duration:<span className="text-red-500">*</span>
              </label>
              <div className="flex-1">
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`input input-xs w-full border-2 ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  } ${!isEditing && "bg-gray-100"}`}
                  disabled={!isEditing}
                />
                {errors.duration && (
                  <span className="text-red-500 text-xs">
                    {errors.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Applicable Amount Input */}
            <div className="flex items-center gap-2">
              <label className="w-32 font-medium text-xs">
                Applicable Amount (per day):
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1 flex-1">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`input input-xs w-full border-2 ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } ${!isEditing && "bg-gray-100"}`}
                  disabled={!isEditing}
                />
                <span className="text-xs">KShs.</span>
                {errors.amount && (
                  <span className="text-red-500 text-xs">{errors.amount}</span>
                )}
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
                {selectedLoanId ? "Save" : "Create"}
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

export default LoanType;

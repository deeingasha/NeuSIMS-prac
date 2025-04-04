import { useState, useEffect } from "react";
import { feeService } from "@services/feeService";
import LoadingSpinner from "@components/LoadingSpinner";
import PropTypes from "prop-types";

const FeeNames = () => {
  // State for form data with empty initial values
  const [formData, setFormData] = useState({
    feeName: "",
    payFrequency: "",
    isMandatory: true,
    isRefundable: false,
  });

  // State to track UI state mangement
  const [isEditing, setIsEditing] = useState(false);
  const [isNewMode, setIsNewMode] = useState(false);
  const [selectedFeeId, setSelectedFeeId] = useState(null);

  // Mock data for the table
  const [feeList, setFeeList] = useState([
    {
      id: 1,
      feeName: "Tuition Fee",
      payFrequency: "Termly",
      mandatory: "Yes",
      refundable: "No",
    },
    {
      id: 2,
      feeName: "Development Fee",
      payFrequency: "Yearly",
      mandatory: "Yes",
      refundable: "No",
    },
    {
      id: 3,
      feeName: "Library Fee",
      payFrequency: "Termly",
      mandatory: "Yes",
      refundable: "No",
    },
    {
      id: 4,
      feeName: "Caution Money",
      payFrequency: "Once",
      mandatory: "Yes",
      refundable: "Yes",
    },
  ]);

  {
    /**API changes uncommennt when API connected */
  }
  // States for API handling
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // State for tracking changes
  // const [pendingChanges, setPendingChanges] = useState({
  //   creates: [],
  //   updates: [],
  //   deletes: [],
  // });

  //  // Fetch fees on component mount
  // useEffect(() => {
  //   fetchFees();
  // }, []);

  // const fetchFees = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await feeService.getAllFees();
  //     setFeeList(data);
  //   } catch (err) {
  //     setError("Failed to fetch fees");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "yes" : value,
    }));
    //clear errors when field is filled
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle row click in table
  const handleRowClick = (fee) => {
    setFormData({
      feeName: fee.feeName,
      payFrequency: fee.payFrequency.toLowerCase(),
      isMandatory: fee.mandatory === "Yes",
      isRefundable: fee.refundable === "Yes",
    });
    setSelectedFeeId(fee.id);
    setIsNewMode(false);
    setIsEditing(true);
  };

  // Handle New button click
  // 1. Clear the form
  // 2. Enable the fields
  // 3. Allow user to enter new fee details
  // 4. Save button should create a new record
  const handleNew = () => {
    setFormData({
      feeName: "",
      payFrequency: "",
      isMandatory: true,
      isRefundable: false,
    });
    setSelectedFeeId(null);
    setIsNewMode(true);
    setIsEditing(true); // Enable the form fields
  };
  // Add a save handler
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      if (isNewMode) {
        // Add new fee
        const newFee = {
          //id: `temp_${Date.now()}`, // Temp ID for new fee
          id: feeList.length + 1, // In real app, this would come from backend
          feeName: formData.feeName,
          payFrequency: formData.payFrequency,
          mandatory: formData.isMandatory ? "Yes" : "No",
          refundable: formData.isRefundable ? "Yes" : "No",
        };
        // In real app, you'd make an API call here as
        // add to pending creates
        // setPendingChanges((prev) => ({
        //   ...prev,
        //   creates: [...prev.creates, newFee],
        // }));
        // //optimistically update ui
        // setFeeList(prev => [...prev, newFee]);

        setFeeList([...feeList, newFee]);
      } else {
        // Update existing fee

        const updatedFeeList = feeList.map((fee) =>
          fee.id === selectedFeeId
            ? {
                ...fee,
                feeName: formData.feeName,
                payFrequency: formData.payFrequency,
                mandatory: formData.isMandatory ? "Yes" : "No",
                refundable: formData.isRefundable ? "Yes" : "No",
              }
            : fee
        );
        //  API call here
        // // Optimistically update the list
        // const updatedFee = {
        //   id: selectedFeeId,
        //   feeName: formData.feeName,
        //   payFrequency: formData.payFrequency,
        //   mandatory: formData.isMandatory ? "Yes" : "No",
        //   refundable: formData.isRefundable ? "Yes" : "No"
        // };

        // // Add to pending updates
        // setPendingChanges(prev => ({
        //   ...prev,
        //   updates: [...prev.updates, updatedFee]
        // }));

        // // Update UI immediately
        // setFeeList(prev =>
        //   prev.map(fee => fee.id === selectedFeeId ? updatedFee : fee)
        // );

        setFeeList(updatedFeeList);
      }
      setIsNewMode(false);
      setIsEditing(false);
      setSelectedFeeId(null);

      //update form ...remove on api call
      setFormData({
        feeName: formData.feeName,
        payFrequency: formData.payFrequency,
        isMandatory: formData.isMandatory,
        isRefundable: formData.isRefundable,
      });
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };
  // New method to handle batch saving of all changes
  // const handleBatchSave = async () => {
  //   try {
  //     setLoading(true);
  //     await feeService.batchUpdateFees(pendingChanges);

  //     // Clear pending changes after successful save
  //     setPendingChanges({
  //       creates: [],
  //       updates: [],
  //       deletes: []
  //     });

  //     // Refresh the fee list
  //     await fetchFees();
  //   } catch (error) {
  //     setError("Failed to save changes");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Add validation state
  const [errors, setErrors] = useState({
    feeName: "",
    payFrequency: "",
  });
  // Add validation function
  const validateForm = () => {
    const newErrors = {
      feeName: !formData.feeName.trim() ? "Fee Name is required" : "",
      payFrequency: !formData.payFrequency ? "Pay Frequency is required" : "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // // Modified delete handler
  // const handleDelete = async () => {
  //   if (!selectedFeeId) return;

  //   try {
  //     // Add to pending deletes
  //     setPendingChanges((prev) => ({
  //       ...prev,
  //       deletes: [...prev.deletes, selectedFeeId],
  //     }));

  //     // Optimistically remove from UI
  //     setFeeList((prev) => prev.filter((fee) => fee.id !== selectedFeeId));

  //     // Reset form
  //     setFormData({
  //       feeName: "",
  //       payFrequency: "",
  //       isMandatory: true,
  //       isRefundable: false,
  //     });
  //     setSelectedFeeId(null);
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Failed to delete:", error);
  //   }
  // };
  // // Add a header with pending changes indicator and batch save button
  // const renderHeader = () => (
  //   <div className="flex justify-between items-center mb-4">
  //     <h3 className="font-semibold text-sm">Fee Names List</h3>
  //     {(pendingChanges.creates.length > 0 ||
  //       pendingChanges.updates.length > 0 ||
  //       pendingChanges.deletes.length > 0) && (
  //       <button
  //         className="btn btn-sm btn-primary"
  //         onClick={handleBatchSave}
  //         disabled={loading}
  //       >
  //         Save All Changes
  //       </button>
  //     )}
  //   </div>
  // );
  // if (loading) return <LoadingSpinner />;
  // if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Add the header with batch save button */}
      {/*{renderHeader()}*/}

      {/* Left Panel - Fee Names Table */}
      <div className="border rounded-lg p-4 shadow">
        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra w-full">
            <thead>
              <tr>
                <th className="border">Fee Name</th>
                <th className="border">Pay Frequency</th>
                <th className="border">Mandatory</th>
                <th className="border">Refundable</th>
              </tr>
            </thead>
            <tbody>
              {feeList.map((fee) => (
                <tr
                  key={fee.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(fee)}
                >
                  <td className="border">{fee.feeName}</td>
                  <td className="border">{fee.payFrequency}</td>
                  <td className="border">{fee.mandatory}</td>
                  <td className="border">{fee.refundable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel - Fee Details Form */}
      <div className="border rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-4 text-sm">Fee Details</h3>
        <div className="space-y-4">
          {/* Fee Name Input */}
          <div className="flex items-center gap-2">
            <label className="w-32 font-medium text-xs">
              Fee Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="feeName"
              value={formData.feeName}
              onChange={handleChange}
              className={`input input-xs w-full border ${
                errors.feeName ? "border-red-500" : "border-gray-300"
              } ${!isEditing && "bg-gray-100"}`}
              disabled={!isEditing}
            />
            {errors.feeName && (
              <span className="text-red-500 text-xs">{errors.feeName}</span>
            )}
          </div>

          {/* Pay Frequency Dropdown */}
          <div className="flex items-center gap-2">
            <label className="w-32 font-medium text-xs">
              Pay Frequency:<span className="text-red-500">*</span>
            </label>
            <select
              name="payFrequency"
              value={formData.payFrequency}
              onChange={handleChange}
              className={`select select-xs w-full border ${
                errors.payFrequency ? "border-red-500" : "border-gray-300"
              } ${!isEditing && "bg-gray-100"}`}
              disabled={!isEditing}
            >
              <option value="">Select Frequency</option>
              <option value="termly">Termly</option>
              <option value="yearly">Yearly</option>
              <option value="once">Once</option>
              <option value="monthly">Monthly</option>
            </select>
            {errors.payFrequency && (
              <span className="text-red-500 text-xs">
                {errors.payFrequency}
              </span>
            )}
          </div>

          {/* Mandatory Fieldset */}
          <fieldset className="border border-gray-300 p-4 rounded w-1/2 mx-auto">
            <legend className="text-xs font-medium px-2">Mandatory Fee</legend>
            <div className="flex justify-center gap-10">
              <label className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  name="isMandatory"
                  value="yes"
                  checked={formData.isMandatory}
                  onChange={handleChange}
                  className="checkbox checkbox-xs"
                  disabled={!isEditing}
                />
                <span className="text-xs">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isMandatory"
                  value="no"
                  checked={!formData.isMandatory}
                  onChange={handleChange}
                  className="radio radio-xs"
                  disabled={!isEditing}
                />
                <span className="text-xs">No</span>
              </label>
            </div>
          </fieldset>
          {/* Refundable Fieldset */}
          <fieldset className="border border-gray-300 p-4 rounded w-1/2 mx-auto">
            <legend className="text-xs font-medium px-2">Refundable</legend>
            <div className="flex justify-center gap-10">
              <label className="flex items-center gap-1">
                <input
                  // type="radio"
                  type="checkbox"
                  name="isRefundable"
                  value="yes"
                  checked={formData.isRefundable}
                  onChange={handleChange}
                  // className="radio radio-xs"
                  className="checkbox checkbox-xs"
                  disabled={!isEditing}
                />
                <span className="text-xs">Yes</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isRefundable"
                  value="no"
                  checked={!formData.isRefundable}
                  onChange={handleChange}
                  className="radio radio-xs"
                  disabled={!isEditing}
                />
                <span className="text-xs">No</span>
              </label>
            </div>
          </fieldset>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              className="btn btn-xs"
              onClick={handleNew}
              disabled={isNewMode}
            >
              New
            </button>
            <button
              className="btn btn-xs btn-primary"
              onClick={handleSave}
              disabled={!isEditing}
            >
              {isNewMode ? "Create" : "Save"}
            </button>
            <button
              className="btn btn-xs btn-error"
              disabled={!isEditing || isNewMode}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeNames;

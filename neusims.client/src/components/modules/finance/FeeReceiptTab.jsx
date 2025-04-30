/**
 * FeeReceiptTab Component
 *
 * Purpose:
 * - Handles fee payment receipt generation and management
 * - Processes different payment modes (cash/mpesa/bank)
 *
 * Connections:
 * - Parent: FeeReceiptDetails.jsx
 * - Uses: FeeStructure.jsx for fee amounts
 *  - Uses: StudentFeeSelection for student fees
 * - Service: receiptService.js for API operations
 *
 * Key Features:
 * - Student fee payment processing
 * - Multiple payment modes support
 * - Receipt generation and cancellation
 * - Balance tracking and calculations
 *
 * To Modify:
 * 1. Integrate payment gateway APIs
 * 2. Add receipt printing functionality
 * 3. Implement error handling and validation
 */
import { useState } from "react";
import PropTypes from "prop-types";

const FeeReceiptTab = ({ topFilters }) => {
  // State for receipt filters
  const [receiptFilters, setReceiptFilters] = useState({
    studentSearch: "",
    invoiceAmount: "",
    receiptNo: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setReceiptFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelReceipt = () => {
    // TODO: Implement cancel receipt logic
    console.log("Cancelling receipt:", receiptFilters.receiptNo);
  };

  // Receipt state
  const [receiptData, setReceiptData] = useState({
    currentAmount: 0,
    previousBalance: 0,
    amountReceived: 0,
    paidBy: "",
    receivedDate: "",
    milk: 0,
    trip: 0,
    club: 0,
    paymentMode: "mpesa",
    mpesaRef: "",
  });

  // Mock data for the table
  const [receiptDetails] = useState([
    { id: 1, date: "2025-01-01", receiptNo: "REC001", amount: 25000 },
    { id: 2, date: "2025-01-15", receiptNo: "REC002", amount: 15000 },
  ]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceiptData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Receipt Filters */}
      <div className="grid grid-cols-4 gap-6 items-center">
        <div className="flex items-center">
          <label className="text-xs font-medium w-32">Search Student:</label>
          <input
            type="text"
            name="studentSearch"
            value={receiptFilters.studentSearch}
            onChange={handleFilterChange}
            className="input input-xs input-bordered w-48"
            placeholder="Enter student name/number"
          />
        </div>

        <div className="flex items-center">
          <label className="text-xs font-medium w-32">Invoice Amount:</label>
          <input
            type="number"
            name="invoiceAmount"
            value={receiptFilters.invoiceAmount}
            onChange={handleFilterChange}
            className="input input-xs input-bordered w-48"
          />
        </div>

        <div className="flex items-center">
          <label className="text-xs font-medium w-32">Receipt No:</label>
          <input
            type="text"
            name="receiptNo"
            value={receiptFilters.receiptNo}
            onChange={handleFilterChange}
            className="input input-xs input-bordered w-48"
          />
        </div>

        <div className="flex items-center">
          <button
            onClick={handleCancelReceipt}
            className="btn btn-xs btn-error w-48"
          >
            Cancel Receipt
          </button>
        </div>
      </div>
      {/* Receipt Content */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Side - Table */}
        <div className="border rounded-lg p-4">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th className="number-column">#</th>
                <th>Date</th>
                <th>Receipt No</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {receiptDetails.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-100">
                  <td className="number-column"></td>
                  <td>{receipt.date}</td>
                  <td>{receipt.receiptNo}</td>
                  <td className="text-right">
                    {receipt.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right Side - Fee Payment Panel */}
        <div className="border rounded-lg p-4">
          <fieldset className="border rounded p-4">
            <legend className="text-sm font-medium px-2">Fee Payment</legend>
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-32">
                    Current Amount:
                  </label>
                  <input
                    type="number"
                    name="currentAmount"
                    value={receiptData.currentAmount}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-48"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-32">
                    Current Amount + Previous Balance:
                  </label>
                  <input
                    type="number"
                    name="previousBalance"
                    value={receiptData.previousBalance}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-48"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-32">
                    Total Amount Due:
                  </label>
                  <span className="text-red-500 font-bold">
                    {(
                      receiptData.currentAmount + receiptData.previousBalance
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-32">
                    Amount Received:
                  </label>
                  <input
                    type="number"
                    name="amountReceived"
                    value={receiptData.amountReceived}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-48"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-32">Paid By:</label>
                  <input
                    type="text"
                    name="paidBy"
                    value={receiptData.paidBy}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-48"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-32">
                    Received Date:
                  </label>
                  <input
                    type="date"
                    name="receivedDate"
                    value={receiptData.receivedDate}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-48"
                  />
                </div>

                <div className="flex gap-2 justify-end mt-4">
                  <button className="btn btn-xs btn-primary">
                    Update Receipt
                  </button>
                  <button className="btn btn-xs btn-error">Cancel</button>
                </div>
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-20">Milk:</label>
                  <input
                    type="number"
                    name="milk"
                    value={receiptData.milk}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-32"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-20">Trip:</label>
                  <input
                    type="number"
                    name="trip"
                    value={receiptData.trip}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-32"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium w-20">Club:</label>
                  <input
                    type="number"
                    name="club"
                    value={receiptData.club}
                    onChange={handleInputChange}
                    className="input input-xs input-bordered w-32"
                  />
                  <button className="btn btn-xs">Calc</button>
                </div>
                {/* Mode of Payment */}
                <fieldset className="border rounded p-2 mt-4">
                  <legend className="text-xs font-medium px-2">
                    Mode of Payment
                  </legend>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="mpesa"
                        checked={receiptData.paymentMode === "mpesa"}
                        onChange={handleInputChange}
                        className="radio radio-xs"
                      />
                      <span className="text-xs">Mpesa</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="cheque"
                        checked={receiptData.paymentMode === "cheque"}
                        onChange={handleInputChange}
                        className="radio radio-xs"
                      />
                      <span className="text-xs">Cheque</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="bank"
                        checked={receiptData.paymentMode === "bank"}
                        onChange={handleInputChange}
                        className="radio radio-xs"
                      />
                      <span className="text-xs">Bank</span>
                    </label>
                  </div>
                </fieldset>
                {/* Bank Details */}
                <fieldset className="border rounded p-2">
                  <legend className="text-xs font-medium px-2">
                    Bank Details
                  </legend>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Mpesa Payment</label>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium w-20">
                        Ref No:
                      </label>
                      <input
                        type="text"
                        name="mpesaRef"
                        value={receiptData.mpesaRef}
                        onChange={handleInputChange}
                        className="input input-xs input-bordered w-32"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

FeeReceiptTab.propTypes = {
  topFilters: PropTypes.shape({
    academicYear: PropTypes.string,
    term: PropTypes.string,
    class: PropTypes.string,
  }).isRequired,
};

export default FeeReceiptTab;

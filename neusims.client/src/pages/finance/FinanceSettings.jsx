import { useState } from "react";
import FeeNames from "@components/modules/finance/FeeNames";
import FeeStructure from "@components/modules/finance/FeeStructure";
import TransportArea from "@components/modules/finance/TransportArea";
import TransportFeeStructure from "@components/modules/finance/TransportFeeStructure";
// import FeeNames from "../../components/finance/FeeNames";
// import FeeStructure from "../../components/finance/FeeStructure";
// import TransportArea from "../../components/finance/TransportArea";
// import TransportFeeStructure from "../../components/finance/TransportFeeStructure";

const FinanceSettings = () => {
  const [activeTab, setActiveTab] = useState("feeNames");

  const renderTabContent = () => {
    switch (activeTab) {
      case "feeNames":
        return <FeeNames />;
      case "feeStructure":
        return <FeeStructure />;
      case "transportArea":
        return <TransportArea />;
      case "transportFeeStructure":
        return <TransportFeeStructure />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab tab-xs ${
            activeTab === "feeNames" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("feeNames")}
        >
          Fee Names
        </a>
        <a
          role="tab"
          className={`tab tab-xs ${
            activeTab === "feeStructure" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("feeStructure")}
        >
          Fee Structure
        </a>
        <a
          role="tab"
          className={`tab tab-xs ${
            activeTab === "transportArea" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("transportArea")}
        >
          Transport Area
        </a>
        <a
          role="tab"
          className={`tab tab-xs ${
            activeTab === "transportFeeStructure" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("transportFeeStructure")}
        >
          Transport Fee Structure
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
};

export default FinanceSettings;

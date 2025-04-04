import React from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-200">
        <h1 className="text-2xl font-bold">Welcome to the School Management System</h1>
        <p className="mt-4">Select an option from the sidebar.</p>
      </div>
    </div>
  );
};

export default Home;

// const Dashboard = () => {
//     return (
//       <div className="p-4">
//         <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
//         <p>This is the main dashboard page.</p>
//       </div>
//     );
//   };

//   export default Dashboard;
const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to the School Management System
        </h1>
        <p className="text-gray-600 text-lg">
          Select an option from the sidebar to manage your school resources.
        </p>
      </div>

      {/* Dashboard content grid can be added here later */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add dashboard cards/widgets here */}
      </div>
    </div>
  );
};

export default Dashboard;

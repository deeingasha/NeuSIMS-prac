import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentClassAllocation from "./pages/StudentClassAllocation";
import StaffClassAllocation from "./pages/StaffClassAllocation";
import FinanceSettings from "./pages/FinanceSettings";
import FeeSelection from "./pages/FeeSelection";
import FeeReceipt from "./pages/FeeReceiptDetails";
import PocketMoney from "./pages/PocketMoney";
import BookSubjects from "./pages/Library/BookSubjects";
import MaterialType from "./pages/Library/MaterialType";
import LoanType from "./pages/Library/LoanType";
import AddClassBooks from "./pages/Library/AddClassBooks";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes that use MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="registration/student" element={<Student />} />
          <Route
            path="class-allocation/student"
            element={<StudentClassAllocation />}
          />
          <Route
            path="class-allocation/staff"
            element={<StaffClassAllocation />}
          />
          <Route
            path="finance-settings/finance-settings"
            element={<FinanceSettings />}
          />
          <Route
            path="fee-and-receipt-processing/fee-selection"
            element={<FeeSelection />}
          />
          <Route
            path="fee-and-receipt-processing/fee-receipt/details"
            element={<FeeReceipt />}
          />
          <Route
            path="/pocket-money-processing/pocket-money"
            element={<PocketMoney />}
          />
          <Route
            path="/library-settings/book-subjects"
            element={<BookSubjects />}
          />
          <Route
            path="/library-settings/add-material"
            element={<MaterialType />}
          />
          <Route path="/library-settings/loan-type" element={<LoanType />} />
          <Route
            path="/library-class-books/add-class-books"
            element={<AddClassBooks />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

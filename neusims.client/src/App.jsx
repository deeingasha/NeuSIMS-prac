import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/school_administration/Student";
import StudentClassAllocation from "./pages/school_administration/StudentClassAllocation";
import StaffClassAllocation from "./pages/school_administration/StaffClassAllocation";
import FinanceSettings from "./pages/finance/FinanceSettings";
import FeeSelection from "./pages/finance/FeeSelection";
import FeeReceipt from "./pages/finance/FeeReceiptDetails";
import PocketMoney from "./pages/finance/PocketMoney";
import BookSubjects from "./pages/library/BookSubjects";
import MaterialType from "./pages/library/MaterialType";
import LoanType from "./pages/library/LoanType";
import AddClassBooks from "./pages/library/AddClassBooks";

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

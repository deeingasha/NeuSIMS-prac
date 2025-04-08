import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/school_administration/Student";
import StudentClassAllocation from "./pages/school_administration/StudentClassAllocation";
import StaffClassAllocation from "./pages/school_administration/StaffClassAllocation";
import StudentSubjectAllocation from "./pages/school_administration/StudentSubjectAllocation";
import StaffSubjectAllocation from "./pages/school_administration/StaffSubjectAllocation";
import MarkEntrySummary from "./pages/school_administration/MarkEntrySummary";
import StudentAttendance from "./pages/school_administration/StudentAttendance";
import AttendanceStatus from "./pages/school_administration/AttendanceStatus";
import FinanceSettings from "./pages/finance/FinanceSettings";
import FeeSelection from "./pages/finance/FeeSelection";
import FeeReceipt from "./pages/finance/FeeReceiptDetails";
import PocketMoney from "./pages/finance/PocketMoney";
import BookSubjects from "./pages/library/BookSubjects";
import MaterialType from "./pages/library/MaterialType";
import LoanType from "./pages/library/LoanType";
import AddClassBooks from "./pages/library/AddClassBooks";
import IssueBooks from "./pages/library/IssueBooks";
import ReturnBooks from "./pages/library/ReturnBooks";
import ComingSoon from "./pages/ComingSoon";

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
            path="subject-allocation/student"
            element={<StudentSubjectAllocation />}
          />
          <Route
            path="subject-allocation/staff"
            element={<StaffSubjectAllocation />}
          />
          <Route
            path="exam/mark-entry-summary"
            element={<MarkEntrySummary />}
          />
          <Route path="attendance/attendance" element={<StudentAttendance />} />
          <Route
            path="attendance/attendance-status"
            element={<AttendanceStatus />}
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
            path="fee-and-receipt-processing/fee-receipt-details"
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
          <Route
            path="/library-class-books/issue-books"
            element={<IssueBooks />}
          />
          <Route
            path="/library-class-books/return-books"
            element={<ReturnBooks />}
          />
          {/* Catch-all route for unimplemented features */}
          <Route path="*" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

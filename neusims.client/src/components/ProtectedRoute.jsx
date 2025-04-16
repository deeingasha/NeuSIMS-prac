import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { authService } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    // Redirect to login but don't include /login in the history stack
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

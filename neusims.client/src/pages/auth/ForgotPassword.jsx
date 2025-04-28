import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@services/authService";
import LoadingSpinner from "@components/LoadingSpinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    entityNo: "",
    secretword: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await authService.updatePassword(
        formData.entityNo,
        formData.secretword,
        formData.password
      );
      navigate("/login");
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-8">
        {/* Add some background design */}
      </div>
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="card w-96 bg-white shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Reset Password
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Entity Number</label>
              <input
                type="text"
                name="entityNo"
                value={formData.entityNo}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Secret Word</label>
              <input
                type="password"
                name="secretword"
                value={formData.secretword}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="btn btn-primary w-1/2"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : "Reset Password"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 text-sm hover:underline"
                disabled={isLoading}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

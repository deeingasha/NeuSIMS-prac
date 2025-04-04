// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Logging in with:", formData);
//     navigate("/"); // Redirect to dashboard after login
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left Side */}
//       <div className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-8">
//         <div className="text-white text-center">
//           <h1 className="text-4xl font-bold mb-4">Welcome to NeuSMIS</h1>
//           <p className="text-lg">
//             NeuSMIS is a premier school management system designed to streamline
//             administrative tasks and enhance the learning experience.
//           </p>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-1/2 flex justify-center items-center bg-gray-100">
//         <div className="card w-96 bg-white shadow-xl p-6">
//           <h2 className="text-2xl font-bold text-center mb-4">
//             <span className="text-blue-700">Neu</span>
//             <span className="text-red-700">SMIS</span>
//           </h2>
//           <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>
//             <div className="flex justify-between items-center mb-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   name="remember"
//                   checked={formData.remember}
//                   onChange={handleChange}
//                   className="checkbox"
//                 />
//                 <span className="text-sm">Remember Me</span>
//               </label>
//               <a href="#" className="text-blue-600 text-sm">
//                 Forgot password?
//               </a>
//             </div>
//             <div className="flex justify-center">
//               <button type="submit" className="btn btn-primary w-1/4">
//                 Login
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@components/LoadingSpinner";
import { authService } from "@services/authService";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import { authService } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setIsLoading(true);

  //   try {
  //     if (isLogin) {
  //       await authService.login({
  //         email: formData.email,
  //         password: formData.password,
  //       });
  //     } else {
  //       await authService.signup({
  //         username: formData.username,
  //         email: formData.email,
  //         password: formData.password,
  //       });
  //     }
  //     navigate("/");
  //   } catch (err) {
  //     setError(
  //       err.message ||
  //         `${isLogin ? "Login" : "Signup"} failed. Please try again.`
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await authService.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        console.log("Attempting signup with:", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        const response = await authService.signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        console.log("Signup response:", response);
      }
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          `${isLogin ? "Login" : "Signup"} failed. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      remember: false,
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Keep existing code */}
      <div className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-8">
        {/* ...existing code... */}
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="card w-96 bg-white shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            <span className="text-blue-700">Neu</span>
            <span className="text-red-700">SMIS</span>
          </h2>
          <h2 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
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
            {isLogin && (
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="checkbox"
                    disabled={isLoading}
                  />
                  <span className="text-sm">Remember Me</span>
                </label>
                <a href="#" className="text-blue-600 text-sm">
                  Forgot password?
                </a>
              </div>
            )}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="btn btn-primary w-1/2"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : isLogin ? "Login" : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-600 text-sm hover:underline"
                disabled={isLoading}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

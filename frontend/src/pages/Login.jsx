import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiOutlineCloseCircle } from "react-icons/ai"; // Icons for loading and error
import { motion } from "framer-motion"; // For animations

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.replace("/"); // Navigate to the home page after successful login
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Invalid email or password. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Side Content */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600 p-12 w-1/2 space-y-4">
        <motion.h2
          className="text-4xl text-white font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to Our Platform
        </motion.h2>
        <motion.p
          className="text-lg text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Log in to access personalized content, recommendations, and more!
        </motion.p>
        <motion.div
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <img src="login.avif" alt="Illustration" className="w-32 h-32 mb-4 mx-auto" />
          <p>Enhance your experience by logging in!</p>
        </motion.div>
      </div>

      {/* Login Form Section */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 bg-opacity-80 backdrop-blur-md">
        <motion.h2
          className="text-3xl font-semibold text-center text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Login
        </motion.h2>

        {error && (
          <div className="flex items-center text-red-600 bg-red-100 p-2 rounded-md">
            <AiOutlineCloseCircle className="text-xl mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 border-t-2 border-gray-200 pt-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full text-white p-3 rounded-md transition-all duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
            aria-label="Login Button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin inline-block" />
            ) : (
              "Login"
            )}
            {loading && " Logging in..."}
          </motion.button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

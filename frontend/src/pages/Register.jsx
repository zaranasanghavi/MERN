import { useState } from "react";
import axios from "axios";
import { AiOutlineLoading3Quarters, AiOutlineCloseCircle } from "react-icons/ai"; // Icons for loading and error
import { motion } from "framer-motion"; // For animations

const Register = () => {
  const [name, setName] = useState("");
  const [sapId, setSapId] = useState("");
  const [department, setDepartment] = useState("Computer Science"); // Default value
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Form submitted with values:", { name, sapId, department, phone, email, password });

    // Validate fields before sending the request
    if (!name || !sapId || !department || !phone || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      // console.error("Validation error: All fields are required.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, sapId, department, phone, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.replace("/"); // Navigate to the home page after successful registration
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error during registration. Please try again.";
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
          Register to start accessing personalized content, recommendations, and more!
        </motion.p>
        <motion.div
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <img src="register.avif" alt="Illustration" className="w-32 h-32 mb-4 mx-auto" />
          <p>Get started by creating your account today!</p>
        </motion.div>
      </div>

      {/* Register Form Section */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6 bg-opacity-80 backdrop-blur-md">
        <motion.h2
          className="text-3xl font-semibold text-center text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Register
        </motion.h2>

        {error && (
          <div className="flex items-center text-red-600 bg-red-100 p-2 rounded-md mb-4">
            <AiOutlineCloseCircle className="text-xl mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Full Name"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="sapId" className="block text-sm font-medium text-gray-700">SAP ID</label>
            <input
              id="sapId"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              value={sapId}
              onChange={(e) => setSapId(e.target.value)}
              required
              aria-label="SAP ID"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <select
              id="department"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="Electronics">Electronics</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-label="Phone Number"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <motion.button
              type="submit"
              className={`w-full text-white p-3 rounded-md transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
              aria-label="Register Button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin inline-block" />
              ) : (
                "Register"
              )}
              {loading && " Registering..."}
            </motion.button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

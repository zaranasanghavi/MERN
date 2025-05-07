import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 bg-gradient-to-r from-blue-500 to-teal-500">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center px-4 py-12 md:py-20 text-white text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">About Campus Lost & Found</h1>
        <p className="mt-4 text-base sm:text-lg">Connecting students to help them reclaim what’s lost</p>
      </section>

      {/* About Content Section */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        <motion.div
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-semibold text-blue-600">Our Mission</h3>
          <p className="mt-4 text-gray-600">
            We aim to create a seamless platform for students to easily report lost or found items. Our mission is to help
            individuals reunite with their belongings quickly and efficiently.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h3 className="text-xl font-semibold text-blue-600">Our Vision</h3>
          <p className="mt-4 text-gray-600">
            We envision a campus community where students can easily find their lost belongings and contribute to the well-being
            of others by helping return items to their rightful owners.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <h3 className="text-xl font-semibold text-blue-600">How It Works</h3>
          <p className="mt-4 text-gray-600">
            Students can report lost or found items with ease. The platform allows for quick searching, item categorization,
            and contact between finders and owners.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Key Features</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
          Our platform offers a variety of features designed to make the lost and found process easier for everyone.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-blue-600">📲 Easy Reporting</h3>
            <p className="mt-4 text-gray-600">
              Easily report lost and found items using our intuitive user interface. Attach images and descriptions to make your
              item easy to identify.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-blue-600">🔍 Advanced Search</h3>
            <p className="mt-4 text-gray-600">
              Quickly search for lost items using various filters like item type, location, and keywords.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-blue-600">⚡ Real-Time Notifications</h3>
            <p className="mt-4 text-gray-600">
              Get notified when someone finds an item that matches your report. Our system ensures you're always updated.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Meet the Team</h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
          Our team consists of passionate developers and designers who believe in creating value for students.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div
            className="p-6 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-lg font-semibold text-blue-600">Zarana Sanghvi</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </motion.div>

          <motion.div
            className="p-6 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h3 className="text-lg font-semibold text-blue-600">Tithi Solanki</h3>
            <p className="text-gray-600">Backend Developer</p>
          </motion.div>

          <motion.div
            className="p-6 bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          >
            <h3 className="text-lg font-semibold text-blue-600">Vaishnavi Kamble</h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 text-white py-6 text-center">
        <p className="text-sm sm:text-base">© 2025 Campus Lost & Found | Built for students, by students.</p>
      </footer>
    </div>
  );
};

export default About;

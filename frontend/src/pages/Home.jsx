import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import SearchFilter from "../components/SearchFilter";
import CollegeCarousel from "../components/CollegeCarousel";
import { motion } from "framer-motion";

const Home = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Lost Phone", description: "Black iPhone lost in library" },
    { id: 2, title: "Found Watch", description: "Silver watch found in cafeteria" },
  ]);

  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (query) => {
    setFilteredItems(
      items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-500 via-blue-400 to-teal-500">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-300 via-indigo-200 to-teal-200 flex flex-col-reverse md:flex-row items-center justify-center px-4 py-16 md:py-24 gap-8">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center w-full md:w-1/2"
        >
          <img
            src="/lnf.webp"
            alt="Lost and Found"
            className="w-64 h-64 sm:w-80 sm:h-80 object-cover shadow-xl"
            style={{
              maskImage: "url('/amoeba-mask.svg')",
              WebkitMaskImage: "url('/amoeba-mask.svg')",
              maskSize: "cover",
              maskRepeat: "no-repeat"
            }}
          />
        </motion.div>

        {/* Right Side - Text & Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left w-full md:w-1/2"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">Campus Lost & Found</h1>
          <p className="mt-3 text-lg sm:text-xl text-gray-700 font-medium">
            "One campus. One community. One place to reunite."
          </p>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Helping students find what matters — from gadgets to notebooks, and everything in between.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="/report-lost" className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-transform hover:scale-105">
              Report Lost Item
            </a>
            <a href="/report-found" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-transform hover:scale-105">
              Report Found Item
            </a>
          </div>
        </motion.div>
      </section>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <CollegeCarousel />
      </motion.div>

      {/* Why Choose Us Section */}
      <section className="mt-16 text-center px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us?
        </motion.h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto text-base sm:text-lg italic">
          Your lost moments deserve a second chance.
        </p>
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <div className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold">🔍 Smart Search</h3>
            <p className="mt-2 text-gray-600">Advanced filters help you pinpoint exactly what you're looking for.</p>
          </div>
          <div className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold">📸 Visual Proof</h3>
            <p className="mt-2 text-gray-600">Upload images and clues to make identification easier.</p>
          </div>
          <div className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold">📍 Campus Smart</h3>
            <p className="mt-2 text-gray-600">Items are location-tagged so you can know where to check first.</p>
          </div>
        </motion.div>
      </section>

      {/* Slogan Divider */}
      <div className="w-full bg-gradient-to-r from-indigo-300 via-blue-200 to-teal-200 mt-12 py-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          💡 Lost Something? Find It Here.
        </h2>
        <p className="text-gray-700 mt-2">
          Bridging gaps between lost items and hopeful hearts.
        </p>
      </div>

      {/* Testimonials */}
      <section className="mt-16 px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold">What Students Say</h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto text-base sm:text-lg">
          Because happy endings aren't just for movies.
        </p>
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition">
            <p className="text-gray-600 italic">"I lost my laptop charger in the library, and within hours, someone reported it. This platform is a lifesaver!"</p>
            <h4 className="mt-2 font-bold">- Rahul S.</h4>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition">
            <p className="text-gray-600 italic">"Found a wallet in the cafeteria and returned it through this site. Super easy and helpful!"</p>
            <h4 className="mt-2 font-bold">- Priya M.</h4>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="mt-16 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">FAQs – Got Questions?</h2>
        <div className="mt-6 max-w-3xl mx-auto space-y-4">
          {[ 
            ["❓ How do I report a lost item?", "Click the 'Report Lost Item' button, enter details, and submit."],
            ["❓ What happens after I report an item?", "It goes live on the site. Anyone who finds it can contact you."],
            ["❓ Is this platform free to use?", "Absolutely free for students and staff."],
          ].map(([q, a], idx) => (
            <motion.div
              key={idx}
              className="p-4 bg-gray-100 rounded-lg shadow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              <h3 className="font-bold">{q}</h3>
              <p className="text-gray-600">{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contributors Section */}
      <section className="mt-16 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">Meet the Contributors</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[
            ["Zarana Sanghvi", "Frontend Developer", "Worked on UI/UX design and responsive React components."],
            ["Tithi Solanki", "Backend Developer", "Built Express.js routes, MongoDB database and login system."],
            ["Vaishnavi Kamble", "UI/UX Designer", "Designed intelligent AI-based item categorization tools."],
          ].map(([name, role, desc], idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow text-center hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-gray-600 text-sm">{role}</p>
              <p className="text-sm mt-2 text-gray-500">{desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-white py-6 text-center">
        <p className="text-sm sm:text-base">© 2025 Campus Lost & Found | Built with ❤️ for every student out there.</p>
      </footer>
    </div>
  );
};

export default Home;

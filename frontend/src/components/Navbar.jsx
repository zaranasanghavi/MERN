import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white hover:shadow-2xl transition-colors duration-200 font-serif italic tracking-wide"
        >
          Lost &amp; Found
        </Link>



        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/lostnfound" className="hover:underline">Items</Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/notifications" className="hover:underline">Notifications</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-current cursor-pointer"
            viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col px-4 pt-2 pb-4 bg-blue-700 space-y-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:underline">Home</Link>
          <Link to="/lostnfound" onClick={() => setIsMenuOpen(false)} className="hover:underline">Items</Link>

          {!token ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:underline">Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="hover:underline">Dashboard</Link>
              <Link to="/notifications" onClick={() => setIsMenuOpen(false)} className="hover:underline">Notifications</Link>
              <button onClick={handleLogout}  className="hover:underline text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

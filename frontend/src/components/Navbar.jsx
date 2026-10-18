import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top shadow-sm mb-4">
      <div className="container py-1">
        {/* Brand Logo & Name */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/" onClick={closeNavbar}>
          <span className="badge bg-primary text-white p-2 rounded-3 shadow-sm hover-elevate">BP</span>
          <span className="tracking-tight fs-5">BrightPath College</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none p-2"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2 mt-3 mt-lg-0 align-items-lg-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`}
                to="/"
                onClick={closeNavbar}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`}
                to="/about"
                onClick={closeNavbar}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`}
                to="/login"
                onClick={closeNavbar}
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0 pb-2 pb-lg-0">
              <Link
                className="btn btn-light text-primary btn-sm fw-bold px-4 py-2 rounded-pill shadow-sm d-block text-center hover-elevate"
                to="/register"
                onClick={closeNavbar}
              >
                Sign Up &rarr;
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
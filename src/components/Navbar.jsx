import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top shadow-sm mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span className="badge bg-primary text-white p-2 rounded-3 shadow-sm">BP</span>
          <span className="tracking-tight">BrightPath College</span>
        </Link>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`} to="/students">
                Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`} to="/add-student">
                Add Student
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? "active" : ""}`} to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
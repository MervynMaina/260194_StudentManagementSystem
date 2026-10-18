import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-5">
      <div className="hero-banner p-5 shadow-lg rounded-4 mb-4 bg-primary text-white">
        <div className="col-lg-8 py-3">
          <span className="badge bg-white text-primary fw-bold mb-3 px-3 py-2 rounded-pill">
            BrightPath College Academic Portal
          </span>
          <h1 className="display-4 fw-bold mb-3">Centralized Student Management System</h1>
          <p className="fs-5 opacity-90 mb-4">
            A secure platform designed to transition academic records into an efficient, role-based web interface for administrators and teaching staff.
          </p>
          <div className="d-flex gap-3">
            <Link to="/login" className="btn btn-light text-primary btn-lg fw-bold px-4 rounded-3 shadow-sm">
              Staff Login &rarr;
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg fw-semibold px-4 rounded-3">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
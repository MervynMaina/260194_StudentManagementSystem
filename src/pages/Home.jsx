import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-3">
      <div className="hero-banner p-5 shadow-lg mb-4">
        <div className="col-lg-8 py-2">
          <span className="badge bg-white text-primary fw-bold mb-3 px-3 py-2 rounded-pill">
            Academic Portal
          </span>
          <h1 className="display-4 fw-bold mb-3">BrightPath Student Portal</h1>
          <p className="fs-5 opacity-90 mb-4">
            Manage student records, review enrollment tracks, and access full profiles seamlessly.
          </p>
          <Link to="/students" className="btn btn-light text-primary btn-lg fw-bold px-4 rounded-3 shadow-sm">
            Browse Student Directory &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
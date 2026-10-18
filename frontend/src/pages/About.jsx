import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container py-4">
      {/* Hero Header Card */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-primary text-white overflow-hidden hover-elevate">
        <div className="card-body p-5 position-relative">
          <span className="badge bg-white text-primary fw-bold mb-3 px-3 py-2 rounded-pill shadow-sm">
            Institutional Overview
          </span>
          <h1 className="display-5 fw-bold mb-3">About BrightPath Portal</h1>
          <p className="fs-5 opacity-90 mb-0 lh-base col-lg-10">
            A secure, role-based single-page web application engineered to transition academic records from legacy spreadsheets into an efficient, real-time administrative interface.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Core Architecture & Features */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 mb-4 hover-elevate">
            <div className="card-body p-4 p-md-5">
              <h3 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-cpu text-primary"></i> System Architecture & Tech Stack
              </h3>
              <p className="text-muted mb-4">
                The application follows modern modular React design patterns, separating concerns across reusable UI components, centralized REST API configuration endpoints, and custom data fetching hooks.
              </p>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 border border-light-subtle rounded-3 bg-light h-100">
                    <h6 className="fw-bold text-dark mb-1">
                      <i className="bi bi-code-slash text-primary me-2"></i> Frontend UI
                    </h6>
                    <p className="text-muted small mb-0">
                      Built with React.js, React Router DOM for seamless single-page navigation, and Bootstrap 5 powered by custom micro-animations.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 border border-light-subtle rounded-3 bg-light h-100">
                    <h6 className="fw-bold text-dark mb-1">
                      <i className="bi bi-hdd-stack text-success me-2"></i> Backend & CRUD
                    </h6>
                    <p className="text-muted small mb-0">
                      Powered by a RESTful JSON server integration supporting complete create, read, update, and delete lifecycle actions.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 border border-light-subtle rounded-3 bg-light h-100">
                    <h6 className="fw-bold text-dark mb-1">
                      <i className="bi bi-shield-lock text-warning me-2"></i> Role-Based Access
                    </h6>
                    <p className="text-muted small mb-0">
                      Isolated dashboard layouts providing tailored access control for administrators, teaching faculty, and public visitors.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 border border-light-subtle rounded-3 bg-light h-100">
                    <h6 className="fw-bold text-dark mb-1">
                      <i className="bi bi-bell text-info me-2"></i> Feedback & UX
                    </h6>
                    <p className="text-muted small mb-0">
                      Dynamic Toast notification popups, real-time table filtering, sticky headers, and responsive layout containers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Developer Profile Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100 hover-elevate">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-primary-subtle text-primary rounded-circle p-3 d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: "60px", height: "60px" }}>
                    MK
                  </div>
                  <div>
                    <h5 className="fw-bold text-dark mb-0">Mervyn Maina Kamau</h5>
                    <span className="text-muted small">Full-Stack Developer</span>
                  </div>
                </div>

                <hr className="text-muted opacity-25" />

                <div className="mb-4">
                  <div className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span className="text-muted small fw-semibold">Primary Language</span>
                    <span className="fw-semibold small text-dark">JavaScript</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span className="text-muted small fw-semibold">Specialization</span>
                    <span className="fw-semibold small text-dark">Full-Stack Web & Mobile</span>
                  </div>
                  <div className="d-flex justify-content-between py-2 border-bottom border-light">
                    <span className="text-muted small fw-semibold">Institution</span>
                    <span className="fw-semibold small text-dark">Institute of Software Technology</span>
                  </div>
                  <div className="d-flex justify-content-between py-2">
                    <span className="text-muted small fw-semibold">Student ID</span>
                    <span className="fw-semibold small text-dark">260194</span>
                  </div>
                </div>
              </div>

              <div>
                <Link to="/" className="btn btn-outline-primary w-100 fw-semibold py-2 rounded-3 shadow-sm">
                  &larr; Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
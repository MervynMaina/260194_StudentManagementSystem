import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-4">
      {/* Hero Banner with Background Image & Gradient Overlay */}
      <div
        className="position-relative p-5 shadow-lg rounded-4 mb-5 text-white overflow-hidden hover-elevate"
        style={{
          background: "linear-gradient(135deg, rgba(13, 110, 253, 0.88), rgba(33, 37, 41, 0.92)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop') center/cover no-repeat",
          minHeight: "420px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div className="col-lg-8 py-3 position-relative" style={{ zIndex: 2 }}>
          <span className="badge bg-white text-primary fw-bold mb-3 px-3 py-2 rounded-pill shadow-sm">
            BrightPath College Academic Portal
          </span>
          <h1 className="display-4 fw-bold mb-3 tracking-tight">Centralized Student Management System</h1>
          <p className="fs-5 opacity-90 mb-4 lh-base">
            A secure platform designed to transition academic records into an efficient, role-based web interface for administrators and teaching staff.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/login" className="btn btn-light text-primary btn-lg fw-bold px-4 rounded-3 shadow-sm">
              Staff Portal Login &rarr;
            </Link>
            <Link to="/students" className="btn btn-outline-light btn-lg fw-semibold px-4 rounded-3">
              Browse Public Directory
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Carousel Section */}
      <div className="card border-0 shadow-sm rounded-4 mb-5 overflow-hidden hover-elevate">
        <div id="portalFeaturesCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#portalFeaturesCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#portalFeaturesCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#portalFeaturesCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active" data-bs-interval="5000">
              <div
                className="p-5 text-white d-flex align-items-center"
                style={{
                  background: "linear-gradient(90deg, rgba(13,110,253,0.92) 0%, rgba(13,110,253,0.7) 100%), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop') center/cover",
                  minHeight: "260px"
                }}
              >
                <div className="col-lg-8">
                  <span className="badge bg-white text-primary fw-bold mb-2">Role-Based Portals</span>
                  <h3 className="fw-bold mb-2">Dedicated Admin & Teacher Layouts</h3>
                  <p className="mb-0 opacity-90">
                    Custom-built sidebar layouts, context-aware navigation, and active tab highlights optimized for institutional workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item" data-bs-interval="5000">
              <div
                className="p-5 text-white d-flex align-items-center"
                style={{
                  background: "linear-gradient(90deg, rgba(25,135,84,0.92) 0%, rgba(25,135,84,0.7) 100%), url('https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop') center/cover",
                  minHeight: "260px"
                }}
              >
                <div className="col-lg-8">
                  <span className="badge bg-white text-success fw-bold mb-2">Complete Student Lifecycle</span>
                  <h3 className="fw-bold mb-2">Full CRUD Record Management</h3>
                  <p className="mb-0 opacity-90">
                    Add new admissions, inspect comprehensive profiles, edit enrollment details, and remove obsolete records with instant feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item" data-bs-interval="5000">
              <div
                className="p-5 text-white d-flex align-items-center"
                style={{
                  background: "linear-gradient(90deg, rgba(33,37,41,0.92) 0%, rgba(33,37,41,0.7) 100%), url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop') center/cover",
                  minHeight: "260px"
                }}
              >
                <div className="col-lg-8">
                  <span className="badge bg-white text-dark fw-bold mb-2">Real-Time Search</span>
                  <h3 className="fw-bold mb-2">Instant Filtering & Sticky Headers</h3>
                  <p className="mb-0 opacity-90">
                    Filter by course majors or search student and teacher directories by name or email with smooth, scroll-optimized tables.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#portalFeaturesCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#portalFeaturesCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Role Feature Grid */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white hover-elevate">
            <div className="mb-3 text-primary fs-2">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">Administrator Access</h4>
            <p className="text-muted small mb-0">
              Complete oversight over both student directory records and faculty teaching staff with full edit and deletion privileges.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white hover-elevate">
            <div className="mb-3 text-success fs-2">
              <i className="bi bi-person-badge-fill"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">Faculty Roster Management</h4>
            <p className="text-muted small mb-0">
              Teachers can manage class enrollment, view individual student profiles, and update academic details seamlessly.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white hover-elevate">
            <div className="mb-3 text-info fs-2">
              <i className="bi bi-search"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">Public Catalog</h4>
            <p className="text-muted small mb-0">
              Read-only directory access for guests and prospective students to explore course offerings and department rosters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
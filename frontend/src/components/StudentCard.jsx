import React from "react";
import { Link } from "react-router-dom";

const StudentCard = ({ student }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 modern-card shadow-sm border-0">
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-slate-800 mb-0">{student.name}</h5>
            <span className="badge bg-light text-secondary border rounded-pill px-2.5 py-1">
              #{student.id}
            </span>
          </div>

          <div className="mb-3">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-2 px-2.5 py-1">
              {student.course}
            </span>
          </div>

          <div className="text-secondary small mb-4 flex-grow-1">
            <div className="d-flex align-items-center mb-1">
              <span className="fw-medium text-dark me-2">Email:</span>
              <span className="text-truncate">{student.email}</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="fw-medium text-dark me-2">Age:</span>
              <span>{student.age} years old</span>
            </div>
          </div>

          <Link
            to={`/students/${student.id}`}
            className="btn btn-outline-primary w-100 fw-semibold rounded-3 py-2 mt-auto"
          >
            View Profile &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
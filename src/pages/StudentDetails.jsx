import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../config";
import StatusAlert from "../components/StatusAlert";

const StudentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine back link based on current path
  let backLink = "/students";
  let backLabel = "Back to Public Directory";

  if (location.pathname.startsWith("/admin")) {
    backLink = "/admin/students";
    backLabel = "Back to Manage Students";
  } else if (location.pathname.startsWith("/teacher")) {
    backLink = "/teacher/students";
    backLabel = "Back to Student Roster";
  }

  useEffect(() => {
    fetch(`${API_ENDPOINTS.STUDENTS}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student details.");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container py-4">
      <Link to={backLink} className="btn btn-outline-secondary btn-sm mb-3">
        &larr; {backLabel}
      </Link>

      <StatusAlert loading={loading} error={error} />

      {!loading && !error && student && (
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3" style={{ width: "70px", height: "70px" }}>
                {student.name.charAt(0)}
              </div>
              <div>
                <h2 className="fw-bold text-dark mb-1">{student.name}</h2>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1">
                  {student.course}
                </span>
              </div>
            </div>

            <hr className="text-muted my-4" />

            <div className="row g-3">
              <div className="col-md-6">
                <label className="text-muted small fw-semibold">Email Address</label>
                <p className="fs-6 fw-medium text-dark">{student.email}</p>
              </div>
              <div className="col-md-3">
                <label className="text-muted small fw-semibold">Age</label>
                <p className="fs-6 fw-medium text-dark">{student.age} years old</p>
              </div>
              <div className="col-md-3">
                <label className="text-muted small fw-semibold">Gender</label>
                <p className="fs-6 fw-medium text-dark">{student.gender}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
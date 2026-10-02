import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import StatusAlert from "../components/StatusAlert";
import { API_BASE_URL } from "../config";

const StudentDetails = () => {
  const { id } = useParams();
  const { data: student, loading, error } = useFetch(`${API_BASE_URL}/${id}`);

  return (
    <div className="container py-3">
      <Link to="/students" className="btn btn-outline-secondary btn-sm mb-4 rounded-2 px-3">
        &larr; Back to Directory
      </Link>

      <StatusAlert loading={loading} error={error} />

      {!loading && !error && student && (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="bg-primary p-4 text-white">
                <span className="badge bg-white text-primary fw-bold mb-2">Student File</span>
                <h2 className="mb-1 fw-bold">{student.name}</h2>
                <p className="mb-0 text-white-50">{student.course}</p>
              </div>

              <div className="card-body p-4 bg-white">
                <div className="row g-3">
                  <div className="col-6">
                    <small className="text-muted fw-bold text-uppercase d-block mb-1">Student ID</small>
                    <span className="fs-6 fw-semibold text-dark">#{student.id}</span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted fw-bold text-uppercase d-block mb-1">Gender</small>
                    <span className="fs-6 fw-semibold text-dark">{student.gender}</span>
                  </div>
                  <div className="col-12"><hr className="my-2 opacity-10" /></div>
                  <div className="col-12">
                    <small className="text-muted fw-bold text-uppercase d-block mb-1">Email Address</small>
                    <span className="fs-6 fw-semibold text-dark">{student.email}</span>
                  </div>
                  <div className="col-12"><hr className="my-2 opacity-10" /></div>
                  <div className="col-6">
                    <small className="text-muted fw-bold text-uppercase d-block mb-1">Enrolled Course</small>
                    <span className="fs-6 fw-semibold text-dark">{student.course}</span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted fw-bold text-uppercase d-block mb-1">Age</small>
                    <span className="fs-6 fw-semibold text-dark">{student.age} Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
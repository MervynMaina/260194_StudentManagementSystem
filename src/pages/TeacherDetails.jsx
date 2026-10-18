import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../config";
import StatusAlert from "../components/StatusAlert";

const TeacherDetails = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_ENDPOINTS.TEACHERS}/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch teacher details.");
                return res.json();
            })
            .then((data) => {
                setTeacher(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="container py-4">
            <Link to="/admin/teachers" className="btn btn-outline-secondary btn-sm mb-3">
                &larr; Back to Manage Teachers
            </Link>

            <StatusAlert loading={loading} error={error} />

            {!loading && !error && teacher && (
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-5">
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3" style={{ width: "70px", height: "70px" }}>
                                {teacher.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="fw-bold text-dark mb-1">{teacher.name}</h2>
                                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1">
                                    {teacher.department}
                                </span>
                            </div>
                        </div>

                        <hr className="text-muted my-4" />

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="text-muted small fw-semibold">Email Address</label>
                                <p className="fs-6 fw-medium text-dark">{teacher.email}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted small fw-semibold">Teacher ID / Record Ref</label>
                                <p className="fs-6 fw-medium text-dark">#TCH-{teacher.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherDetails;
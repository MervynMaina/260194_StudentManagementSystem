import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";
import Toast from "../../components/Toast";

const EditTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        fetch(`${API_ENDPOINTS.TEACHERS}/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch teacher data.");
                return res.json();
            })
            .then((data) => {
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    department: data.department || "",
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateTeacher = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        fetch(`${API_ENDPOINTS.TEACHERS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update teacher record.");
                return res.json();
            })
            .then(() => {
                setToast({ show: true, message: "Teacher record updated successfully!", type: "success" });
                setTimeout(() => navigate("/admin/teachers"), 1200);
            })
            .catch((err) => {
                setError(err.message);
                setSubmitting(false);
                setToast({ show: true, message: err.message, type: "danger" });
            });
    };

    return (
        <div className="container py-3">
            <div className="mb-4">
                <Link to="/admin/teachers" className="btn btn-outline-secondary btn-sm mb-2">
                    &larr; Back to Manage Teachers
                </Link>
                <h2 className="fw-bold text-dark mb-0">Edit Teacher Record</h2>
            </div>

            <StatusAlert loading={loading} error={error && loading ? error : null} />

            {!loading && (
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                            <div className="card-body p-4">
                                {error && !loading && <div className="alert alert-danger py-2 small">{error}</div>}

                                <form onSubmit={handleUpdateTeacher}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Department</label>
                                        <input
                                            type="text"
                                            name="department"
                                            className="form-control"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary px-4 fw-semibold py-2" disabled={submitting}>
                                            {submitting ? "Saving Changes..." : "Update Teacher"}
                                        </button>
                                        <Link to="/admin/teachers" className="btn btn-outline-secondary px-4 py-2">
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
        </div>
    );
};

export default EditTeacher;
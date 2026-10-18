import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "Female",
        course: "Software Development",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_ENDPOINTS.STUDENTS}/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch student details.");
                return res.json();
            })
            .then((data) => {
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    age: data.age || "",
                    gender: data.gender || "Female",
                    course: data.course || "Software Development",
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

    const handleUpdateStudent = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const payload = {
            ...formData,
            age: Number(formData.age),
        };

        fetch(`${API_ENDPOINTS.STUDENTS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update student record.");
                return res.json();
            })
            .then(() => {
                navigate("/admin/students");
            })
            .catch((err) => {
                setError(err.message);
                setSubmitting(false);
            });
    };

    return (
        <div className="container py-3">
            <div className="mb-4">
                <Link to="/admin/students" className="btn btn-outline-secondary btn-sm mb-2">
                    &larr; Back to Manage Students
                </Link>
                <h2 className="fw-bold text-dark mb-0">Edit Student Record</h2>
            </div>

            <StatusAlert loading={loading} error={error && loading ? error : null} />

            {!loading && (
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4">
                                {error && !loading && <div className="alert alert-danger py-2 small">{error}</div>}

                                <form onSubmit={handleUpdateStudent}>
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

                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label className="form-label small fw-semibold text-secondary">Age</label>
                                            <input
                                                type="number"
                                                name="age"
                                                className="form-control"
                                                min="16"
                                                max="100"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label small fw-semibold text-secondary">Gender</label>
                                            <select
                                                name="gender"
                                                className="form-select"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Course / Major</label>
                                        <select
                                            name="course"
                                            className="form-select"
                                            value={formData.course}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Software Development">Software Development</option>
                                            <option value="Networking">Networking</option>
                                            <option value="Data Analytics">Data Analytics</option>
                                            <option value="Cybersecurity">Cybersecurity</option>
                                            <option value="Business IT">Business IT</option>
                                        </select>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary px-4 fw-semibold py-2" disabled={submitting}>
                                            {submitting ? "Saving Changes..." : "Update Student"}
                                        </button>
                                        <Link to="/admin/students" className="btn btn-outline-secondary px-4 py-2">
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditStudent;
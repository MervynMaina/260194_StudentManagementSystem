import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Form state for adding a new teacher
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    // Fetch teachers on mount
    const fetchTeachers = () => {
        setLoading(true);
        fetch(API_ENDPOINTS.TEACHERS)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch teachers.");
                return res.json();
            })
            .then((data) => {
                setTeachers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddTeacher = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError(null);

        fetch(API_ENDPOINTS.TEACHERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to add teacher.");
                return res.json();
            })
            .then((newTeacher) => {
                setTeachers((prev) => [...prev, newTeacher]);
                setFormData({ name: "", email: "", department: "" });
                setSubmitting(false);
            })
            .catch((err) => {
                setFormError(err.message);
                setSubmitting(false);
            });
    };

    const handleDeleteTeacher = (id) => {
        if (!window.confirm("Are you sure you want to delete this teacher record?")) return;

        fetch(`${API_ENDPOINTS.TEACHERS}/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete teacher.");
                setTeachers((prev) => prev.filter((t) => t.id !== id));
            })
            .catch((err) => alert(err.message));
    };

    // Filter teachers by search term
    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <Link to="/admin" className="btn btn-outline-secondary btn-sm mb-2">
                        &larr; Back to Dashboard
                    </Link>
                    <h2 className="fw-bold text-dark mb-0">Manage Faculty & Teachers</h2>
                </div>
            </div>

            <div className="row">
                {/* Left Column: Add Teacher Form */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold text-dark mb-3">Add New Teacher</h5>
                            {formError && <div className="alert alert-danger py-2 small">{formError}</div>}

                            <form onSubmit={handleAddTeacher}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Dr. Jane Doe"
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
                                        placeholder="jane.doe@brightpath.edu"
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
                                        placeholder="Software Development"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 fw-semibold py-2" disabled={submitting}>
                                    {submitting ? "Saving..." : "Save Teacher"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Teacher List & Search */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body p-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search teachers by name or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <StatusAlert loading={loading} error={error} />

                    {!loading && !error && (
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-body p-4">
                                {/* Scrollable wrapper with max height and sticky header */}
                                <div className="table-responsive" style={{ maxHeight: "480px", overflowY: "auto" }}>
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light sticky-top" style={{ zIndex: 1 }}>
                                            <tr>
                                                <th>Name</th>
                                                <th>Department</th>
                                                <th>Email</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTeachers.length > 0 ? (
                                                filteredTeachers.map((teacher) => (
                                                    <tr key={teacher.id}>
                                                        <td className="fw-semibold">{teacher.name}</td>
                                                        <td>
                                                            <span className="badge bg-success-subtle text-success border border-success-subtle">
                                                                {teacher.department}
                                                            </span>
                                                        </td>
                                                        <td className="text-muted small">{teacher.email}</td>
                                                        <td className="text-end">
                                                            <div className="d-flex justify-content-end gap-1">
                                                                <Link
                                                                    to={`/admin/teachers/${teacher.id}`}
                                                                    className="btn btn-outline-primary btn-sm px-2 py-1"
                                                                >
                                                                    View
                                                                </Link>
                                                                <Link
                                                                    to={`/admin/teachers/edit/${teacher.id}`}
                                                                    className="btn btn-outline-secondary btn-sm px-2 py-1"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteTeacher(teacher.id)}
                                                                    className="btn btn-outline-danger btn-sm px-2 py-1"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center text-muted py-4">
                                                        No teachers found matching your search.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTeachers;
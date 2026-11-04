import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";
import Toast from "../../components/Toast";

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items to display per page

    // Form state for adding a new teacher
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "Software Development",
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

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

        // 1. Post to teachers resource
        fetch(API_ENDPOINTS.TEACHERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to add teacher record.");
                return res.json();
            })
            .then((newTeacher) => {
                // 2. Also provision a corresponding login user account in the users resource
                const newUserPayload = {
                    fullName: formData.name,
                    email: formData.email,
                    password: "password123", // Default temporary password
                    role: "teacher",
                    department: formData.department,
                };

                return fetch(API_ENDPOINTS.USERS, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newUserPayload),
                }).then(() => newTeacher);
            })
            .then((newTeacher) => {
                setTeachers((prev) => [...prev, newTeacher]);
                setFormData({ name: "", email: "", department: "Software Development" });
                setSubmitting(false);
                setToast({ show: true, message: "Teacher record & portal login provisioned successfully!", type: "success" });
            })
            .catch((err) => {
                setFormError(err.message);
                setSubmitting(false);
                setToast({ show: true, message: err.message, type: "danger" });
            });
    };

    const handleDeleteTeacher = (teacher) => {
        if (!window.confirm(`Are you sure you want to delete ${teacher.name}? This will also revoke their portal access.`)) return;

        // 1. Delete from teachers resource
        fetch(`${API_ENDPOINTS.TEACHERS}/${teacher.id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete teacher record.");

                // 2. Find and delete corresponding user account by email
                return fetch(API_ENDPOINTS.USERS);
            })
            .then((res) => res.json())
            .then((users) => {
                const matchingUser = users.find((u) => u.email.toLowerCase() === teacher.email.toLowerCase());
                if (matchingUser) {
                    return fetch(`${API_ENDPOINTS.USERS}/${matchingUser.id}`, {
                        method: "DELETE",
                    });
                }
            })
            .then(() => {
                setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
                setToast({ show: true, message: "Teacher record and portal account deleted.", type: "danger" });
            })
            .catch((err) => {
                alert(err.message);
                setToast({ show: true, message: err.message, type: "danger" });
            });
    };

    // Filter teachers by search term
    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset pagination to page 1 whenever search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTeachers = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);

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
                    <div className="card shadow-sm border-0 rounded-4 hover-elevate">
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
                                    <select
                                        name="department"
                                        className="form-select"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="Software Development">Software Development</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Data Analytics">Data Analytics</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Business IT">Business IT</option>
                                    </select>
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
                    <div className="card shadow-sm border-0 rounded-4 mb-4 hover-elevate">
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
                        <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                            <div className="card-body p-4 d-flex flex-column justify-content-between" style={{ minHeight: "420px" }}>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Name</th>
                                                <th>Department</th>
                                                <th>Email</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentTeachers.length > 0 ? (
                                                currentTeachers.map((teacher) => (
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
                                                                    onClick={() => handleDeleteTeacher(teacher)}
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

                                {/* Pagination Footer Controls */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center pt-3 mt-3 border-top">
                                        <small className="text-muted">
                                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTeachers.length)} of {filteredTeachers.length} entries
                                        </small>
                                        <nav aria-label="Teachers table pagination">
                                            <ul className="pagination pagination-sm mb-0">
                                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </button>
                                                </li>
                                                {[...Array(totalPages)].map((_, index) => {
                                                    const pageNum = index + 1;
                                                    return (
                                                        <li key={pageNum} className={`page-item ${currentPage === pageNum ? "active" : ""}`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() => setCurrentPage(pageNum)}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Global Toast Component */}
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
        </div>
    );
};

export default ManageTeachers;
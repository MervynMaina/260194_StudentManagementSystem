import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";
import Toast from "../../components/Toast";

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    // Form state for adding a new student
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "Female",
        course: "Software Development",
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const fetchStudents = () => {
        setLoading(true);
        fetch(API_ENDPOINTS.STUDENTS)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch students.");
                return res.json();
            })
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError(null);

        const payload = {
            ...formData,
            age: Number(formData.age),
        };

        fetch(API_ENDPOINTS.STUDENTS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to add student.");
                return res.json();
            })
            .then((newStudent) => {
                setStudents((prev) => [...prev, newStudent]);
                setFormData({ name: "", email: "", age: "", gender: "Female", course: "Software Development" });
                setSubmitting(false);
                setToast({ show: true, message: "Student record added successfully!", type: "success" });
            })
            .catch((err) => {
                setFormError(err.message);
                setSubmitting(false);
                setToast({ show: true, message: err.message, type: "danger" });
            });
    };

    const handleDeleteStudent = (id) => {
        if (!window.confirm("Are you sure you want to delete this student record?")) return;

        fetch(`${API_ENDPOINTS.STUDENTS}/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete student.");
                setStudents((prev) => prev.filter((s) => s.id !== id));
                setToast({ show: true, message: "Student record deleted successfully.", type: "danger" });
            })
            .catch((err) => {
                alert(err.message);
                setToast({ show: true, message: err.message, type: "danger" });
            });
    };

    // Filter students based on search term and selected course
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = selectedCourse === "" || student.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <Link to="/admin" className="btn btn-outline-secondary btn-sm mb-2">
                        &larr; Back to Dashboard
                    </Link>
                    <h2 className="fw-bold text-dark mb-0">Manage Students Directory</h2>
                </div>
            </div>

            <div className="row">
                {/* Left Column: Add Student Form */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                        <div className="card-body p-4">
                            <h5 className="fw-bold text-dark mb-3">Add New Student</h5>
                            {formError && <div className="alert alert-danger py-2 small">{formError}</div>}

                            <form onSubmit={handleAddStudent}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Jane Doe"
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
                                        placeholder="jane@brightpath.edu"
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
                                            placeholder="20"
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

                                <button type="submit" className="btn btn-primary w-100 fw-semibold py-2" disabled={submitting}>
                                    {submitting ? "Saving..." : "Save Student"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Search, Filter & Student Table */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 mb-4 hover-elevate">
                        <div className="card-body p-3">
                            <div className="row g-2">
                                <div className="col-md-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <select
                                        className="form-select"
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                    >
                                        <option value="">All Courses</option>
                                        <option value="Software Development">Software Development</option>
                                        <option value="Networking">Networking</option>
                                        <option value="Data Analytics">Data Analytics</option>
                                        <option value="Cybersecurity">Cybersecurity</option>
                                        <option value="Business IT">Business IT</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <StatusAlert loading={loading} error={error} />

                    {!loading && !error && (
                        <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                            <div className="card-body p-4">
                                <div className="table-responsive" style={{ maxHeight: "480px", overflowY: "auto" }}>
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light sticky-top" style={{ zIndex: 1 }}>
                                            <tr>
                                                <th>Name</th>
                                                <th>Course</th>
                                                <th>Age / Gender</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.length > 0 ? (
                                                filteredStudents.map((student) => (
                                                    <tr key={student.id}>
                                                        <td>
                                                            <div className="fw-semibold">{student.name}</div>
                                                            <small className="text-muted">{student.email}</small>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                                                                {student.course}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {student.age} yrs ({student.gender})
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex justify-content-end gap-1">
                                                                <Link
                                                                    to={`/admin/students/${student.id}`}
                                                                    className="btn btn-outline-primary btn-sm px-2 py-1"
                                                                >
                                                                    View
                                                                </Link>
                                                                <Link
                                                                    to={`/admin/students/edit/${student.id}`}
                                                                    className="btn btn-outline-secondary btn-sm px-2 py-1"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteStudent(student.id)}
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
                                                        No students found matching your criteria.
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

export default ManageStudents;
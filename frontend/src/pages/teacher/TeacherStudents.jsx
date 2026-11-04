import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";
import Toast from "../../components/Toast";

const TeacherStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    // Retrieve logged-in teacher details from localStorage
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const teacherDepartment = currentUser.department || "Software Development";
    const teacherId = currentUser.id;
    const teacherEmail = currentUser.email;

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items per page

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "Female",
        course: teacherDepartment, // Default to teacher's department
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    // Toast State
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const fetchStudents = () => {
        setLoading(true);
        fetch(API_ENDPOINTS.STUDENTS)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch students.");
                return res.json();
            })
            .then((data) => {
                // Filter students: must match teacher's department AND be assigned to this specific teacher (or fallback if unassigned)
                const assignedStudents = data.filter((student) => {
                    const matchesDept = student.course.toLowerCase() === teacherDepartment.toLowerCase();
                    const matchesTeacher =
                        student.teacherId === teacherId ||
                        student.teacherEmail?.toLowerCase() === teacherEmail?.toLowerCase() ||
                        (!student.teacherId && !student.teacherEmail); // Fallback for unassigned legacy records

                    return matchesDept && matchesTeacher;
                });

                setStudents(assignedStudents);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, [teacherDepartment, teacherId]);

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
            course: teacherDepartment, // Ensure course strictly matches teacher's department
            teacherId: teacherId,     // Stamp with current teacher's ID
            teacherEmail: teacherEmail, // Stamp with current teacher's email for relational lookup
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
                setFormData({ name: "", email: "", age: "", gender: "Female", course: teacherDepartment });
                setSubmitting(false);
                setToast({ show: true, message: `Student added to your roster successfully!`, type: "success" });
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

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = selectedCourse === "" || student.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    // Reset pagination to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCourse]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <Link to="/teacher" className="btn btn-outline-secondary btn-sm mb-2">
                        &larr; Back to Dashboard
                    </Link>
                    <h2 className="fw-bold text-dark mb-0">My Student Roster ({teacherDepartment})</h2>
                </div>
            </div>

            <div className="row">
                {/* Form Column */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                        <div className="card-body p-4">
                            <h5 className="fw-bold text-dark mb-3">Add Student to Roster</h5>
                            {formError && <div className="alert alert-danger py-2 small">{formError}</div>}

                            <form onSubmit={handleAddStudent}>
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Student Name"
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
                                        placeholder="student@brightpath.edu"
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
                                    <label className="form-label small fw-semibold text-secondary">Assigned Course</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light"
                                        value={teacherDepartment}
                                        disabled
                                        readOnly
                                    />
                                    <div className="form-text text-muted" style={{ fontSize: "0.75rem" }}>
                                        Locked to your department allocation.
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success w-100 fw-semibold py-2" disabled={submitting}>
                                    {submitting ? "Saving..." : "Save Record"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* List & Search Column */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 mb-4 hover-elevate">
                        <div className="card-body p-3">
                            <div className="row g-2">
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search your students..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
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
                                                <th>Course</th>
                                                <th>Age / Gender</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStudents.length > 0 ? (
                                                currentStudents.map((student) => (
                                                    <tr key={student.id}>
                                                        <td>
                                                            <div className="fw-semibold">{student.name}</div>
                                                            <small className="text-muted">{student.email}</small>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-success-subtle text-success border border-success-subtle">
                                                                {student.course}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {student.age} yrs ({student.gender})
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="d-flex justify-content-end gap-1">
                                                                <Link
                                                                    to={`/teacher/students/${student.id}`}
                                                                    className="btn btn-outline-success btn-sm px-2 py-1"
                                                                >
                                                                    View
                                                                </Link>
                                                                <Link
                                                                    to={`/teacher/students/edit/${student.id}`}
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
                                                        No student records assigned to your roster.
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
                                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} entries
                                        </small>
                                        <nav aria-label="Teacher students table pagination">
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

export default TeacherStudents;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import StatusAlert from "../../components/StatusAlert";
import Toast from "../../components/Toast";

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items to display per page

    // Form state for adding a new student
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "Female",
        course: "Software Development",
        teacherId: "",
        teacherEmail: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            fetch(API_ENDPOINTS.STUDENTS).then((res) => {
                if (!res.ok) throw new Error("Failed to fetch students.");
                return res.json();
            }),
            fetch(API_ENDPOINTS.TEACHERS).then((res) => {
                if (!res.ok) throw new Error("Failed to fetch teachers.");
                return res.json();
            }),
        ])
            .then(([studentsData, teachersData]) => {
                setStudents(studentsData);
                setTeachers(teachersData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "course") {
            // Reset teacher assignment when course changes since departments differ
            setFormData((prev) => ({ ...prev, course: value, teacherId: "", teacherEmail: "" }));
        } else if (name === "teacherId") {
            const selectedTeacher = teachers.find((t) => String(t.id) === String(value));
            setFormData((prev) => ({
                ...prev,
                teacherId: value,
                teacherEmail: selectedTeacher ? selectedTeacher.email : "",
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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
                setFormData({
                    name: "",
                    email: "",
                    age: "",
                    gender: "Female",
                    course: "Software Development",
                    teacherId: "",
                    teacherEmail: "",
                });
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

    // Filter teachers matching the student's selected course/department
    const availableTeachers = teachers.filter(
        (t) => t.department?.toLowerCase() === formData.course.toLowerCase()
    );

    // Filter students based on search term and selected course
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

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Assigned Instructor</label>
                                    <select
                                        name="teacherId"
                                        className="form-select"
                                        value={formData.teacherId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">-- Unassigned / General --</option>
                                        {availableTeachers.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name}
                                            </option>
                                        ))}
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
                            <div className="card-body p-4 d-flex flex-column justify-content-between" style={{ minHeight: "420px" }}>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Name</th>
                                                <th>Course / Instructor</th>
                                                <th>Age / Gender</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStudents.length > 0 ? (
                                                currentStudents.map((student) => {
                                                    const assignedTeacher = teachers.find(
                                                        (t) => String(t.id) === String(student.teacherId)
                                                    );
                                                    return (
                                                        <tr key={student.id}>
                                                            <td>
                                                                <div className="fw-semibold">{student.name}</div>
                                                                <small className="text-muted">{student.email}</small>
                                                            </td>
                                                            <td>
                                                                <div className="mb-1">
                                                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                                                                        {student.course}
                                                                    </span>
                                                                </div>
                                                                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                                    Instructor: {assignedTeacher ? assignedTeacher.name : "Unassigned"}
                                                                </small>
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
                                                    );
                                                })
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

                                {/* Pagination Footer Controls */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center pt-3 mt-3 border-top">
                                        <small className="text-muted">
                                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} entries
                                        </small>
                                        <nav aria-label="Students table pagination">
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

export default ManageStudents;
import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../config";
import StatsCard from "../../components/StatsCard";
import StatusAlert from "../../components/StatusAlert";

const TeacherDashboard = () => {
    const { data: students, loading, error } = useFetch(API_ENDPOINTS.STUDENTS);

    // Retrieve logged-in teacher details from localStorage
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const teacherName = currentUser.fullName || "Faculty Instructor";
    const teacherDepartment = currentUser.department || "Software Development";

    // Filter students belonging strictly to the logged-in teacher's department
    const departmentStudents = students
        ? students.filter((student) => student.course.toLowerCase() === teacherDepartment.toLowerCase())
        : [];

    return (
        <div className="container py-4">
            {/* Header Banner */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-success text-white overflow-hidden hover-elevate">
                <div className="card-body p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                        <span className="badge bg-white text-success fw-bold mb-2 px-3 py-1 rounded-pill shadow-sm">
                            Department: {teacherDepartment}
                        </span>
                        <h2 className="fw-bold mb-1">Welcome back, {teacherName}!</h2>
                        <p className="text-white-50 mb-0 small">Overview of student enrollments and roster records for your department.</p>
                    </div>
                    <div>
                        <Link to="/teacher/students" className="btn btn-light btn-sm fw-semibold px-3 py-2 rounded-3 shadow-sm">
                            Manage Student Records
                        </Link>
                    </div>
                </div>
            </div>

            <StatusAlert loading={loading} error={error} />

            {!loading && !error && students && (
                <>
                    {/* Stats Overview Row */}
                    <div className="row g-3 mb-4">
                        <StatsCard
                            title="Department Students"
                            value={departmentStudents.length}
                            icon="bi-mortarboard"
                            bgClass="bg-success"
                        />
                        <StatsCard
                            title="Recent Additions"
                            value={departmentStudents.slice(-3).length}
                            icon="bi-person-plus"
                            bgClass="bg-primary"
                        />
                        <StatsCard
                            title="Assigned Department"
                            value={teacherDepartment}
                            icon="bi-journal-check"
                            bgClass="bg-dark"
                        />
                    </div>

                    <div className="row g-4">
                        {/* Recently Enrolled Students Table */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-dark mb-0">Department Student Roster</h5>
                                        <Link to="/teacher/students" className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold">
                                            View All &rarr;
                                        </Link>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Course</th>
                                                    <th>Email</th>
                                                    <th className="text-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {departmentStudents.length > 0 ? (
                                                    departmentStudents.slice(-5).reverse().map((student) => (
                                                        <tr key={student.id}>
                                                            <td className="fw-semibold text-dark">{student.name}</td>
                                                            <td>
                                                                <span className="badge bg-success-subtle text-success border border-success-subtle">
                                                                    {student.course}
                                                                </span>
                                                            </td>
                                                            <td className="text-muted small">{student.email}</td>
                                                            <td className="text-end">
                                                                <Link
                                                                    to={`/teacher/students/${student.id}`}
                                                                    className="btn btn-outline-success btn-sm px-2 py-1"
                                                                >
                                                                    View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center text-muted py-4">
                                                            No student records found for {teacherDepartment}.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Teacher Quick Actions Panel */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-4 bg-white hover-elevate h-100">
                                <div className="card-body p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="fw-bold text-dark mb-3">Teacher Quick Actions</h5>
                                        <div className="list-group list-group-flush rounded-3 overflow-hidden border border-light-subtle">
                                            <Link to="/teacher/students" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; View & Filter Student Directory
                                            </Link>
                                            <Link to="/teacher/settings" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; Update Account Details & Password
                                            </Link>
                                            <Link to="/teacher/help" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; Teacher Help & Documentation
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-top text-muted small text-center">
                                        BrightPath College Faculty Portal
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TeacherDashboard;
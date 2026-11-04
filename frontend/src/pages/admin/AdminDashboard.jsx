import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../config";
import StatsCard from "../../components/StatsCard";
import StatusAlert from "../../components/StatusAlert";

const AdminDashboard = () => {
    const { data: students, loading: studentsLoading, error: studentsError } = useFetch(API_ENDPOINTS.STUDENTS);
    const { data: teachers, loading: teachersLoading, error: teachersError } = useFetch(API_ENDPOINTS.TEACHERS);

    const loading = studentsLoading || teachersLoading;
    const error = studentsError || teachersError;

    // Dynamically calculate unique active courses
    const activeCoursesCount = students
        ? new Set(students.map((s) => s.course)).size
        : 0;

    return (
        <div className="container py-4">
            {/* Header Banner */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-primary text-white overflow-hidden hover-elevate">
                <div className="card-body p-4 p-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                        <span className="badge bg-white text-primary fw-bold mb-2 px-3 py-1 rounded-pill shadow-sm">
                            Administrator Portal
                        </span>
                        <h2 className="fw-bold mb-1">Admin Dashboard</h2>
                        <p className="text-white-50 mb-0 small">Overview of institutional data, student rosters, and faculty directories.</p>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/admin/students" className="btn btn-light btn-sm fw-semibold px-3 py-2 rounded-3 shadow-sm">
                            Manage Students
                        </Link>
                        <Link to="/admin/teachers" className="btn btn-outline-light btn-sm fw-semibold px-3 py-2 rounded-3">
                            Manage Teachers
                        </Link>
                    </div>
                </div>
            </div>

            <StatusAlert loading={loading} error={error} />

            {!loading && !error && students && teachers && (
                <>
                    {/* Stats Overview Row */}
                    <div className="row g-3 mb-4">
                        <StatsCard
                            title="Total Students"
                            value={students.length}
                            icon="bi-mortarboard"
                            bgClass="bg-primary"
                        />
                        <StatsCard
                            title="Total Teachers"
                            value={teachers.length}
                            icon="bi-people"
                            bgClass="bg-success"
                        />
                        <StatsCard
                            title="Active Academic Programs"
                            value={activeCoursesCount || 5}
                            icon="bi-journal-bookmark"
                            bgClass="bg-dark"
                        />
                    </div>

                    <div className="row g-4">
                        {/* Recently Added Students Table */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-dark mb-0">Recently Added Students</h5>
                                        <Link to="/admin/students" className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold">
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
                                                {students.length > 0 ? (
                                                    students.slice(-5).reverse().map((student) => (
                                                        <tr key={student.id}>
                                                            <td className="fw-semibold text-dark">{student.name}</td>
                                                            <td>
                                                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                                                                    {student.course}
                                                                </span>
                                                            </td>
                                                            <td className="text-muted small">{student.email}</td>
                                                            <td className="text-end">
                                                                <Link
                                                                    to={`/admin/students/${student.id}`}
                                                                    className="btn btn-outline-primary btn-sm px-2 py-1"
                                                                >
                                                                    View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center text-muted py-4">
                                                            No student records found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Navigation Panel */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-4 bg-white hover-elevate h-100">
                                <div className="card-body p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="fw-bold text-dark mb-3">Quick Navigation</h5>
                                        <div className="list-group list-group-flush rounded-3 overflow-hidden border border-light-subtle">
                                            <Link to="/admin/students" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; Oversee & Filter Students
                                            </Link>
                                            <Link to="/admin/teachers" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; Manage Faculty & Teachers
                                            </Link>
                                            <Link to="/admin/settings" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; System Settings & Preferences
                                            </Link>
                                            <Link to="/admin/help" className="list-group-item list-group-item-action py-3 fw-semibold small text-secondary">
                                                &rarr; Administrator Help Guide
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-top text-muted small text-center">
                                        BrightPath College Admin Control Hub
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

export default AdminDashboard;
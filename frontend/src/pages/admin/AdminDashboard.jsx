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

    // Dynamically calculate unique departments/courses
    const activeCoursesCount = students
        ? new Set(students.map((s) => s.course)).size
        : 0;

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <span className="badge bg-primary text-white fw-bold mb-1">Administrator Portal</span>
                    <h2 className="fw-bold text-dark mb-0">Admin Dashboard</h2>
                </div>
                <div className="d-flex gap-2">
                    <Link to="/admin/students" className="btn btn-outline-primary btn-sm fw-semibold">
                        Manage Students
                    </Link>
                    <Link to="/admin/teachers" className="btn btn-outline-secondary btn-sm fw-semibold">
                        Manage Teachers
                    </Link>
                </div>
            </div>

            <StatusAlert loading={loading} error={error} />

            {!loading && !error && students && teachers && (
                <>
                    <div className="row g-3">
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

                    <div className="row mt-4">
                        <div className="col-lg-8 mb-4">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-dark mb-0">Recently Added Students</h5>
                                        <Link to="/admin/students" className="btn btn-link btn-sm p-0 text-decoration-none">
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
                                                {students.slice(-5).reverse().map((student) => (
                                                    <tr key={student.id}>
                                                        <td className="fw-semibold">{student.name}</td>
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
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-4 bg-light hover-elevate">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold text-dark mb-3">Quick Navigation</h5>
                                    <div className="list-group list-group-flush rounded-3 overflow-hidden shadow-sm">
                                        <Link to="/admin/students" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; Oversee & Filter Students
                                        </Link>
                                        <Link to="/admin/teachers" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; Manage Faculty & Teachers
                                        </Link>
                                        <Link to="/admin/settings" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; System Settings & Preferences
                                        </Link>
                                        <Link to="/admin/help" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; Administrator Help Guide
                                        </Link>
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
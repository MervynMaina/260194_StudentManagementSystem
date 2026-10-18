import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../config";
import StatsCard from "../../components/StatsCard";
import StatusAlert from "../../components/StatusAlert";

const TeacherDashboard = () => {
    const { data: students, loading, error } = useFetch(API_ENDPOINTS.STUDENTS);

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <span className="badge bg-success text-white fw-bold mb-1">Teacher Portal</span>
                    <h2 className="fw-bold text-dark mb-0">Teacher Dashboard</h2>
                </div>
                <div>
                    <Link to="/teacher/students" className="btn btn-success btn-sm fw-semibold">
                        Manage Student Records
                    </Link>
                </div>
            </div>

            <StatusAlert loading={loading} error={error} />

            {!loading && !error && students && (
                <>
                    <div className="row g-3">
                        <StatsCard
                            title="Enrolled Students"
                            value={students.length}
                            icon="bi-mortarboard"
                            bgClass="bg-success"
                        />
                        <StatsCard
                            title="Recent Additions"
                            value={students.slice(-3).length}
                            icon="bi-person-plus"
                            bgClass="bg-primary"
                        />
                        <StatsCard
                            title="Active Classes"
                            value="4"
                            icon="bi-journal-check"
                            bgClass="bg-dark"
                        />
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-8 mb-4">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-dark mb-0">Recently Enrolled Students</h5>
                                        <Link to="/teacher/students" className="btn btn-link btn-sm p-0 text-decoration-none">
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
                                    <h5 className="fw-bold text-dark mb-3">Teacher Quick Actions</h5>
                                    <div className="list-group list-group-flush rounded-3 overflow-hidden shadow-sm">
                                        <Link to="/teacher/students" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; View & Filter Student Directory
                                        </Link>
                                        <Link to="/teacher/settings" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; Update Account Details
                                        </Link>
                                        <Link to="/teacher/help" className="list-group-item list-group-item-action py-3 fw-semibold">
                                            &rarr; Teacher Help & Documentation
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

export default TeacherDashboard;
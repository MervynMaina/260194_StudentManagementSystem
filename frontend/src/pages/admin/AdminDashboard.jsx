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

    // Analytics Calculations
    const totalStudents = students ? students.length : 0;
    const femaleCount = students ? students.filter((s) => s.gender === "Female").length : 0;
    const maleCount = students ? students.filter((s) => s.gender === "Male").length : 0;
    const femalePercentage = totalStudents > 0 ? Math.round((femaleCount / totalStudents) * 100) : 0;
    const malePercentage = totalStudents > 0 ? Math.round((maleCount / totalStudents) * 100) : 0;

    // Unassigned students count widget metric
    const unassignedStudents = students ? students.filter((s) => !s.teacherId).length : 0;

    // Department breakdown calculation
    const departments = ["Software Development", "Cybersecurity", "Data Analytics", "Networking", "Business IT"];
    const deptStats = departments.map((dept) => {
        const deptStudentsCount = students ? students.filter((s) => s.course === dept).length : 0;
        const deptTeachersCount = teachers ? teachers.filter((t) => t.department === dept).length : 0;
        return { name: dept, students: deptStudentsCount, teachers: deptTeachersCount };
    });

    const activeCoursesCount = students ? new Set(students.map((s) => s.course)).size : 0;

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
                        <p className="text-white-50 mb-0 small">Overview of institutional data, student rosters, and faculty analytics.</p>
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
                            value={totalStudents}
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
                            title="Unassigned Students"
                            value={unassignedStudents}
                            icon="bi-exclamation-triangle"
                            bgClass="bg-warning text-dark"
                        />
                        <StatsCard
                            title="Active Programs"
                            value={activeCoursesCount || 5}
                            icon="bi-journal-bookmark"
                            bgClass="bg-dark"
                        />
                    </div>

                    {/* NEW: Visual Analytics Widgets Row */}
                    <div className="row g-4 mb-4">
                        {/* Gender Distribution Widget */}
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold text-dark mb-3">Gender Distribution Ratio</h5>
                                    <p className="text-muted small mb-3">Overall breakdown of enrolled student demographics.</p>

                                    <div className="progress mb-3" style={{ height: "24px" }}>
                                        <div
                                            className="progress-bar bg-primary fw-semibold"
                                            role="progressbar"
                                            style={{ width: `${femalePercentage}%` }}
                                            aria-valuenow={femalePercentage}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            Female ({femaleCount})
                                        </div>
                                        <div
                                            className="progress-bar bg-info fw-semibold"
                                            role="progressbar"
                                            style={{ width: `${malePercentage}%` }}
                                            aria-valuenow={malePercentage}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            Male ({maleCount})
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between text-secondary small fw-medium">
                                        <span>Female: {femalePercentage}%</span>
                                        <span>Male: {malePercentage}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Department Ratios Widget */}
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold text-dark mb-3">Department Workloads</h5>
                                    <p className="text-muted small mb-3">Student enrollment counts across academic departments.</p>

                                    <div className="d-flex flex-column gap-2">
                                        {deptStats.map((dept) => (
                                            <div key={dept.name} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                                <span className="small fw-semibold text-secondary">{dept.name}</span>
                                                <div className="d-flex gap-2">
                                                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2">
                                                        {dept.students} Students
                                                    </span>
                                                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2">
                                                        {dept.teachers} Teachers
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                    <th>Course / Instructor</th>
                                                    <th>Email</th>
                                                    <th className="text-end">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students.length > 0 ? (
                                                    students.slice(-5).reverse().map((student) => {
                                                        const assignedTeacher = teachers.find(
                                                            (t) => String(t.id) === String(student.teacherId)
                                                        );
                                                        return (
                                                            <tr key={student.id}>
                                                                <td className="fw-semibold text-dark">{student.name}</td>
                                                                <td>
                                                                    <div className="mb-1">
                                                                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                                                                            {student.course}
                                                                        </span>
                                                                    </div>
                                                                    <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                                        Instructor: {assignedTeacher ? assignedTeacher.name : <span className="text-danger fw-semibold">Unassigned</span>}
                                                                    </small>
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
                                                        );
                                                    })
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
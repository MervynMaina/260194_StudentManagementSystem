import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../config";
import StatsCard from "../../components/StatsCard";
import StatusAlert from "../../components/StatusAlert";

const TeacherDashboard = () => {
    const { data: students, loading: studentsLoading, error: studentsError } = useFetch(API_ENDPOINTS.STUDENTS);
    const { data: teachers, loading: teachersLoading, error: teachersError } = useFetch(API_ENDPOINTS.TEACHERS);

    const loading = studentsLoading || teachersLoading;
    const error = studentsError || teachersError;

    // Retrieve logged-in teacher details from localStorage
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const teacherName = currentUser.fullName || "Faculty Instructor";
    const teacherDepartment = currentUser.department || "Software Development";
    const teacherId = currentUser.id;
    const teacherEmail = currentUser.email;

    // Filter students strictly by the logged-in teacher's department AND specific teacher assignment
    const departmentStudents = students
        ? students.filter((student) => {
            const matchesDept = student.course.toLowerCase() === teacherDepartment.toLowerCase();
            const matchesTeacher =
                student.teacherId === teacherId ||
                student.teacherEmail?.toLowerCase() === teacherEmail?.toLowerCase() ||
                (!student.teacherId && !student.teacherEmail); // Fallback for legacy unassigned records

            return matchesDept && matchesTeacher;
        })
        : [];

    // Analytics Calculations for Teacher's Roster
    const totalAssigned = departmentStudents.length;
    const femaleCount = departmentStudents.filter((s) => s.gender === "Female").length;
    const maleCount = departmentStudents.filter((s) => s.gender === "Male").length;
    const femalePercentage = totalAssigned > 0 ? Math.round((femaleCount / totalAssigned) * 100) : 0;
    const malePercentage = totalAssigned > 0 ? Math.round((maleCount / totalAssigned) * 100) : 0;

    // Co-teachers in the same department
    const deptColleagues = teachers ? teachers.filter((t) => t.department?.toLowerCase() === teacherDepartment.toLowerCase()) : [];

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
                        <p className="text-white-50 mb-0 small">Overview of student enrollments and roster analytics for your classes.</p>
                    </div>
                    <div>
                        <Link to="/teacher/students" className="btn btn-light btn-sm fw-semibold px-3 py-2 rounded-3 shadow-sm">
                            Manage Student Records
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
                            title="My Assigned Students"
                            value={totalAssigned}
                            icon="bi-mortarboard"
                            bgClass="bg-success"
                        />
                        <StatsCard
                            title="Department Colleagues"
                            value={deptColleagues.length}
                            icon="bi-people"
                            bgClass="bg-primary"
                        />
                        <StatsCard
                            title="Assigned Department"
                            value={teacherDepartment}
                            icon="bi-journal-check"
                            bgClass="bg-dark"
                        />
                    </div>

                    {/* Visual Analytics Widgets Row */}
                    <div className="row g-4 mb-4">
                        {/* Gender Distribution Widget */}
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold text-dark mb-3">Roster Gender Distribution</h5>
                                    <p className="text-muted small mb-3">Demographic breakdown of students assigned to your classes.</p>

                                    <div className="progress mb-3" style={{ height: "24px" }}>
                                        <div
                                            className="progress-bar bg-success fw-semibold"
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

                        {/* Department Info Widget */}
                        <div className="col-lg-6">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold text-dark mb-3">Department Faculty & Load</h5>
                                    <p className="text-muted small mb-3">Overview of your department teaching team.</p>

                                    <div className="d-flex flex-column gap-2">
                                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                            <span className="small fw-semibold text-secondary">Department Name</span>
                                            <span className="badge bg-success-subtle text-success border border-success-subtle px-2">
                                                {teacherDepartment}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                            <span className="small fw-semibold text-secondary">Total Roster Share</span>
                                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2">
                                                {totalAssigned} Students
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center pb-1">
                                            <span className="small fw-semibold text-secondary">Department Instructors</span>
                                            <span className="badge bg-dark-subtle text-dark border border-dark-subtle px-2">
                                                {deptColleagues.length} Faculty Members
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Recently Enrolled Students Table */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 rounded-4 hover-elevate h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fw-bold text-dark mb-0">My Student Roster</h5>
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
                                                            No student records assigned to your roster.
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
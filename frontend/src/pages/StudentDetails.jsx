import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../config";
import StatusAlert from "../components/StatusAlert";
import Toast from "../components/Toast";

const StudentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [student, setStudent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Grade, Performance & Advisory Notes State
  const [scoreInput, setScoreInput] = useState("");
  const [attendanceInput, setAttendanceInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentScore, setAssignmentScore] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Determine back link and role privileges based on current path
  const isAdmin = location.pathname.startsWith("/admin");
  const isTeacher = location.pathname.startsWith("/teacher");

  let backLink = "/students";
  let backLabel = "Back to Public Directory";

  if (isAdmin) {
    backLink = "/admin/students";
    backLabel = "Back to Manage Students";
  } else if (isTeacher) {
    backLink = "/teacher/students";
    backLabel = "Back to Student Roster";
  }

  useEffect(() => {
    fetch(`${API_ENDPOINTS.STUDENTS}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student details.");
        return res.json();
      })
      .then((studentData) => {
        setStudent(studentData);
        setScoreInput(studentData.performance?.score || "");
        setAttendanceInput(studentData.performance?.attendance || "");
        setNoteInput(studentData.performance?.notes || "");

        // Fetch assigned teacher details if teacherId exists
        if (studentData.teacherId) {
          return fetch(`${API_ENDPOINTS.TEACHERS}/${studentData.teacherId}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((teacherData) => setTeacher(teacherData));
        }
      })
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Calculate Letter Grade from numerical score
  const calculateGrade = (numScore) => {
    if (numScore >= 80) return "A";
    if (numScore >= 70) return "B";
    if (numScore >= 60) return "C";
    if (numScore >= 50) return "D";
    return "F";
  };

  // Save/Update General Grade, Attendance & Advisory Notes (Teacher Only)
  const handleUpdatePerformance = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newScore = Number(scoreInput);
    const newAttendance = Number(attendanceInput);
    const letterGrade = calculateGrade(newScore);

    const updatedPerformance = {
      ...(student.performance || {}),
      score: newScore,
      attendance: newAttendance,
      grade: letterGrade,
      notes: noteInput,
    };

    const payload = { ...student, performance: updatedPerformance };

    fetch(`${API_ENDPOINTS.STUDENTS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update student performance profile.");
        return res.json();
      })
      .then((updatedStudent) => {
        setStudent(updatedStudent);
        setSubmitting(false);
        setToast({ show: true, message: "Academic performance profile updated successfully!", type: "success" });
      })
      .catch((err) => {
        setSubmitting(false);
        setToast({ show: true, message: err.message, type: "danger" });
      });
  };

  // Add Individual Assignment Score (Teacher Only)
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!assignmentTitle || !assignmentScore) return;

    const newAssignment = {
      title: assignmentTitle,
      score: Number(assignmentScore),
      maxScore: 100,
    };

    const currentAssignments = student.performance?.assignments || [];
    const updatedAssignments = [...currentAssignments, newAssignment];

    const updatedPerformance = {
      ...(student.performance || {}),
      assignments: updatedAssignments,
    };

    const payload = { ...student, performance: updatedPerformance };

    fetch(`${API_ENDPOINTS.STUDENTS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add assignment score.");
        return res.json();
      })
      .then((updatedStudent) => {
        setStudent(updatedStudent);
        setAssignmentTitle("");
        setAssignmentScore("");
        setToast({ show: true, message: "New assignment score added!", type: "success" });
      })
      .catch((err) => {
        setToast({ show: true, message: err.message, type: "danger" });
      });
  };

  return (
    <div className="container py-4">
      <Link to={backLink} className="btn btn-outline-secondary btn-sm mb-3">
        &larr; {backLabel}
      </Link>

      <StatusAlert loading={loading} error={error} />

      {!loading && !error && student && (
        <div className="row g-4">
          {/* Left Column: Bio & Profile Summary Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 p-4 text-center h-100 hover-elevate">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-2 mx-auto mb-3 shadow-sm"
                style={{ width: "80px", height: "80px" }}
              >
                {student.name.charAt(0)}
              </div>
              <h4 className="fw-bold text-dark mb-1">{student.name}</h4>
              <p className="text-muted small mb-3">{student.email}</p>

              <div className="mb-3">
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1">
                  {student.course}
                </span>
              </div>

              <hr className="text-muted my-3" />

              <div className="text-start small d-flex flex-column gap-2">
                <div>
                  <strong className="text-secondary">Age / Gender:</strong> {student.age} yrs ({student.gender})
                </div>
                <div>
                  <strong className="text-secondary">Enrollment Date:</strong> {student.createdAt || "Jan 15, 2026"}
                </div>
                <div>
                  <strong className="text-secondary">Assigned Instructor:</strong> {teacher ? teacher.name : "Unassigned"}
                </div>
              </div>

              {/* Advisory Notes Display Block */}
              <div className="mt-4 pt-3 border-top text-start">
                <strong className="text-secondary small d-block mb-1">Faculty Advisory Notes:</strong>
                <p className="text-muted small bg-light p-3 rounded-3 mb-0" style={{ fontStyle: "italic" }}>
                  {student.performance?.notes || "No advisory notes recorded yet."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Performance & Grade Controls */}
          <div className="col-lg-8">
            {/* Summary Analytics Badges */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card border-0 bg-success-subtle text-success p-3 rounded-4 text-center shadow-sm">
                  <small className="fw-bold text-uppercase" style={{ fontSize: "0.75rem" }}>Overall Grade</small>
                  <h2 className="fw-bold mb-0">{student.performance?.grade || "N/A"}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-primary-subtle text-primary p-3 rounded-4 text-center shadow-sm">
                  <small className="fw-bold text-uppercase" style={{ fontSize: "0.75rem" }}>Average Score</small>
                  <h2 className="fw-bold mb-0">{student.performance?.score ? `${student.performance.score}%` : "N/A"}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 bg-info-subtle text-info p-3 rounded-4 text-center shadow-sm">
                  <small className="fw-bold text-uppercase" style={{ fontSize: "0.75rem" }}>Attendance Rate</small>
                  <h2 className="fw-bold mb-0">{student.performance?.attendance ? `${student.performance.attendance}%` : "N/A"}</h2>
                </div>
              </div>
            </div>

            {/* Overall Grade & Notes Update Panel (Teachers Only) */}
            {isTeacher && (
              <div className="card shadow-sm border-0 rounded-4 mb-4 p-4 hover-elevate">
                <h5 className="fw-bold text-dark mb-3">Update Performance & Advisory Notes</h5>
                <form onSubmit={handleUpdatePerformance} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Course Score (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max="100"
                      placeholder="e.g. 85"
                      value={scoreInput}
                      onChange={(e) => setScoreInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Attendance Rate (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max="100"
                      placeholder="e.g. 95"
                      value={attendanceInput}
                      onChange={(e) => setAttendanceInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Advisory & Performance Notes</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter student progress notes, strengths, or areas of improvement..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success fw-semibold px-4" disabled={submitting}>
                      {submitting ? "Saving..." : "Save Performance Profile"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Assignment & Assessment Breakdown Card */}
            <div className="card shadow-sm border-0 rounded-4 p-4 hover-elevate">
              <h5 className="fw-bold text-dark mb-3">Assignment & Assessment Breakdown</h5>
              <div className="table-responsive mb-3">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Assessment Title</th>
                      <th>Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.performance?.assignments?.length > 0 ? (
                      student.performance.assignments.map((item, idx) => (
                        <tr key={idx}>
                          <td className="fw-semibold">{item.title}</td>
                          <td>{item.score} / {item.maxScore}</td>
                          <td>
                            <span className={`badge ${item.score >= 50 ? "bg-success" : "bg-danger"}`}>
                              {item.score >= 50 ? "Passed" : "Failed"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-3">
                          No coursework scores entered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Add Assignment Score Form (Teachers Only) */}
              {isTeacher && (
                <form onSubmit={handleAddAssignment} className="row g-2 border-top pt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Assessment Title (e.g. CAT 1)"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Score (out of 100)"
                      min="0"
                      max="100"
                      value={assignmentScore}
                      onChange={(e) => setAssignmentScore(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-outline-primary btn-sm w-100">
                      + Add
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

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

export default StudentDetails;
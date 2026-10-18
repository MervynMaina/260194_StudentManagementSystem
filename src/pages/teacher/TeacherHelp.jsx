import React from "react";
import { Link } from "react-router-dom";

const TeacherHelp = () => {
    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <Link to="/teacher" className="btn btn-outline-secondary btn-sm mb-2">
                        &larr; Back to Dashboard
                    </Link>
                    <h2 className="fw-bold text-dark mb-0">Teacher Help & Guide</h2>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body p-4">
                            <h4 className="fw-bold text-success mb-3">Teacher Portal Guidelines</h4>
                            <p className="text-secondary">
                                Welcome to the BrightPath teacher portal. Use this section to understand how to manage student records and navigate your dashboard features.
                            </p>

                            <hr className="my-4 opacity-10" />

                            <h5 className="fw-bold text-dark mb-2">1. Managing Students</h5>
                            <p className="text-secondary small mb-3">
                                Access <strong>Manage Students</strong> to view all active student profiles, filter by course major, search records instantly, add new student entries, or remove outdated records.
                            </p>

                            <h5 className="fw-bold text-dark mb-2">2. Dashboard Statistics</h5>
                            <p className="text-secondary small mb-3">
                                Your dashboard overview provides real-time metrics on total student enrollments and recent additions to keep your class records synchronized.
                            </p>

                            <h5 className="fw-bold text-dark mb-2">3. Account Settings</h5>
                            <p className="text-secondary small mb-0">
                                Update your department assignments, contact information, and alert preferences under the <strong>Settings</strong> menu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherHelp;
import React from "react";
import { Link } from "react-router-dom";

const AdminHelp = () => {
    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <Link to="/admin" className="btn btn-outline-secondary btn-sm mb-2">
                        &larr; Back to Dashboard
                    </Link>
                    <h2 className="fw-bold text-dark mb-0">Administrator Help & Guide</h2>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body p-4">
                            <h4 className="fw-bold text-primary mb-3">Welcome to the Admin Portal</h4>
                            <p className="text-secondary">
                                This guide provides an overview of how to navigate and utilize the administrator dashboard features for BrightPath College.
                            </p>

                            <hr className="my-4 opacity-10" />

                            <h5 className="fw-bold text-dark mb-2">1. Managing Students</h5>
                            <p className="text-secondary small mb-3">
                                Navigate to <strong>Manage Students</strong> from the dashboard or navigation bar to view all student records. You can search students by name/email, filter by course major, view individual student files, add new student entries via the form, or remove records when necessary.
                            </p>

                            <h5 className="fw-bold text-dark mb-2">2. Managing Faculty & Teachers</h5>
                            <p className="text-secondary small mb-3">
                                The <strong>Manage Teachers</strong> section allows administrators to oversee faculty members. You can search teachers by name or department, register new teachers, and manage active records seamlessly.
                            </p>

                            <h5 className="fw-bold text-dark mb-2">3. Dashboard Overview & Statistics</h5>
                            <p className="text-secondary small mb-3">
                                The main administrator dashboard features real-time summary cards displaying total student counts, faculty counts, and recently added student profiles for quick auditing.
                            </p>

                            <h5 className="fw-bold text-dark mb-2">4. Settings & Preferences</h5>
                            <p className="text-secondary small mb-0">
                                Use the <strong>Settings</strong> page to modify your administrator account profile credentials, notification settings, and dashboard display preferences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHelp;
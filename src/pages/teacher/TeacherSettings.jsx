import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeacherSettings = () => {
    const [profile, setProfile] = useState({
        name: "Faculty Instructor",
        email: "teacher@brightpath.edu",
        department: "Software Development",
        notifications: true,
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                    <Link to="/teacher" className="btn btn-outline-secondary btn-sm mb-2">
                        &larr; Back to Dashboard
                    </Link>
                    <h2 className="fw-bold text-dark mb-0">Teacher Account Settings</h2>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {saved && (
                        <div className="alert alert-success py-2 mb-3" role="alert">
                            Teacher profile settings updated successfully!
                        </div>
                    )}

                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <h5 className="fw-bold text-dark mb-3">Profile Information</h5>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={profile.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={profile.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Assigned Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control"
                                        value={profile.department}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-check form-switch mb-4 mt-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="notifications"
                                        name="notifications"
                                        checked={profile.notifications}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-input-label fw-semibold text-secondary small ms-2" htmlFor="notifications">
                                        Receive course enrollment update notifications
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-success fw-semibold py-2 px-4 rounded-3">
                                    Save Settings
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherSettings;
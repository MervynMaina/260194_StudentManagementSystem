import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import Toast from "../../components/Toast";

const TeacherSettings = () => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};

    const [profile, setProfile] = useState({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        department: currentUser.department || "Software Development",
        notifications: currentUser.notifications ?? true,
    });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        if (currentUser.id) {
            setProfile((prev) => ({
                ...prev,
                fullName: currentUser.fullName || "",
                email: currentUser.email || "",
                department: currentUser.department || prev.department,
            }));
        }
    }, []);

    const handleProfileChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate password change
        let updatedPassword = currentUser.password;
        if (passwords.newPassword || passwords.currentPassword || passwords.confirmNewPassword) {
            if (passwords.currentPassword !== currentUser.password) {
                setError("Current password is incorrect.");
                setLoading(false);
                return;
            }
            if (passwords.newPassword !== passwords.confirmNewPassword) {
                setError("New passwords do not match.");
                setLoading(false);
                return;
            }
            if (passwords.newPassword.length < 6) {
                setError("New password must be at least 6 characters long.");
                setLoading(false);
                return;
            }
            updatedPassword = passwords.newPassword;
        }

        const updatedUserPayload = {
            ...currentUser,
            fullName: profile.fullName,
            email: profile.email,
            department: profile.department,
            password: updatedPassword,
            notifications: profile.notifications,
        };

        // Update database record
        fetch(`${API_ENDPOINTS.USERS}/${currentUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUserPayload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to update teacher profile settings.");
                return res.json();
            })
            .then((updatedUser) => {
                // Update local session
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setLoading(false);
                setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
                setToast({
                    show: true,
                    message: "Teacher profile & password updated successfully!",
                    type: "success",
                });
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
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
                    {error && (
                        <div className="alert alert-danger py-2 mb-3 rounded-3 small" role="alert">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
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
                                        name="fullName"
                                        className="form-control"
                                        value={profile.fullName}
                                        onChange={handleProfileChange}
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
                                        onChange={handleProfileChange}
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
                                        onChange={handleProfileChange}
                                        required
                                    />
                                </div>

                                <hr className="my-4 opacity-10" />

                                <h5 className="fw-bold text-dark mb-3">Security & Password Update</h5>
                                <p className="text-muted small mb-3">
                                    If you were provisioned with a temporary password, update it here to secure your account.
                                </p>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="form-control"
                                        placeholder="Enter current password to verify"
                                        value={passwords.currentPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <label className="form-label small fw-semibold text-secondary">New Password</label>
                                        <div className="input-group">
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                name="newPassword"
                                                className="form-control border-end-0"
                                                placeholder="••••••••"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary border-start-0 text-secondary small fw-semibold"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                tabIndex="-1"
                                            >
                                                {showNewPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold text-secondary">Confirm New Password</label>
                                        <input
                                            type="password"
                                            name="confirmNewPassword"
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={passwords.confirmNewPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-check form-switch mb-4 mt-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="teacherNotifications"
                                        name="notifications"
                                        checked={profile.notifications}
                                        onChange={handleProfileChange}
                                    />
                                    <label className="form-check-input-label fw-semibold text-secondary small ms-2" htmlFor="teacherNotifications">
                                        Receive course enrollment update notifications
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-success fw-semibold py-2 px-4 rounded-3" disabled={loading}>
                                    {loading ? "Saving Settings..." : "Save Settings"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast((prev) => ({ ...prev, show: false }))}
            />
        </div>
    );
};

export default TeacherSettings;
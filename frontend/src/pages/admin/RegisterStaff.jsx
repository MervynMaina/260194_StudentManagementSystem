import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import Toast from "../../components/Toast";

const RegisterStaff = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "teacher", // "teacher", "assistant-admin", or "super-admin"
        department: "Software Development", // Default department for teachers
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match. Please check and try again.");
            setLoading(false);
            return;
        }

        // Determine role and adminTier based on selection
        let role = "teacher";
        let adminTier = null;

        if (formData.accountType === "super-admin") {
            role = "admin";
            adminTier = "super";
        } else if (formData.accountType === "assistant-admin") {
            role = "admin";
            adminTier = "assistant";
        }

        // Payload for mock database users table
        const newUserPayload = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: role,
            ...(adminTier && { adminTier }),
            ...(role === "teacher" && { department: formData.department }),
        };

        // Post new user to json-server
        fetch(API_ENDPOINTS.USERS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserPayload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to provision account on the server.");
                return res.json();
            })
            .then(() => {
                // If it's a teacher, also add them to the teachers resource list so they show up in the faculty directory
                if (role === "teacher") {
                    return fetch(API_ENDPOINTS.TEACHERS, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: formData.fullName,
                            email: formData.email,
                            department: formData.department,
                        }),
                    });
                }
            })
            .then(() => {
                setLoading(false);
                setToast({
                    show: true,
                    message: `Successfully provisioned account for ${formData.fullName}!`,
                    type: "success"
                });

                setTimeout(() => {
                    navigate("/admin");
                }, 1200);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="container py-3">
            <div className="mb-4">
                <Link to="/admin" className="btn btn-outline-secondary btn-sm mb-2">
                    &larr; Back to Admin Dashboard
                </Link>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden hover-elevate">
                        <div className="bg-primary p-4 text-white text-center position-relative">
                            <span className="badge bg-white text-primary fw-bold mb-2 px-3 py-1 rounded-pill">Administrative Action</span>
                            <h3 className="mb-1 fw-bold">Provision New Staff Account</h3>
                            <p className="mb-0 text-white-50 small">Create secure login credentials stored directly in the database</p>
                        </div>

                        <div className="card-body p-4 p-md-5 bg-white">
                            {error && (
                                <div className="alert alert-danger py-2 mb-3 rounded-3 small" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                                </div>
                            )}

                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label fw-semibold text-secondary small">
                                        Staff Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control py-2 rounded-3"
                                        placeholder="e.g. Dr. Robert Smith"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold text-secondary small">
                                        Institutional Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control py-2 rounded-3"
                                        placeholder="staff@brightpath.edu"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="accountType" className="form-label fw-semibold text-secondary small">
                                        Assigned Portal Role & Tier
                                    </label>
                                    <select
                                        id="accountType"
                                        name="accountType"
                                        className="form-select py-2 rounded-3"
                                        value={formData.accountType}
                                        onChange={handleChange}
                                    >
                                        <option value="teacher">Teacher Staff Portal</option>
                                        <option value="assistant-admin">Assistant Administrator</option>
                                        <option value="super-admin">Super Administrator</option>
                                    </select>
                                </div>

                                {/* Conditionally display Department dropdown if Teacher role is selected */}
                                {formData.accountType === "teacher" && (
                                    <div className="mb-3">
                                        <label htmlFor="department" className="form-label fw-semibold text-secondary small">
                                            Assigned Academic Department
                                        </label>
                                        <select
                                            id="department"
                                            name="department"
                                            className="form-select py-2 rounded-3"
                                            value={formData.department}
                                            onChange={handleChange}
                                        >
                                            <option value="Software Development">Software Development</option>
                                            <option value="Cybersecurity">Cybersecurity</option>
                                            <option value="Data Analytics">Data Analytics</option>
                                            <option value="Networking">Networking</option>
                                            <option value="Business IT">Business IT</option>
                                        </select>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold text-secondary small">
                                        Temporary Password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="form-control py-2 rounded-start-3 border-end-0"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary border-start-0 rounded-end-3 px-3 text-secondary small fw-semibold"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex="-1"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary small">
                                        Confirm Temporary Password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            className="form-control py-2 rounded-start-3 border-end-0"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary border-start-0 rounded-end-3 px-3 text-secondary small fw-semibold"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex="-1"
                                        >
                                            {showConfirmPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-semibold py-2 rounded-3 mb-3 shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Provisioning Account...
                                        </>
                                    ) : (
                                        "Create & Provision Account →"
                                    )}
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

export default RegisterStaff;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "teacher", // Default role selection for registration
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

        // Basic validation
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

        // Simulate registration submission and redirect to login
        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 900);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="bg-primary p-4 text-white text-center">
                            <h3 className="mb-1 fw-bold">Create Account</h3>
                            <p className="mb-0 text-white-50 small">Register for the BrightPath Portal</p>
                        </div>

                        <div className="card-body p-4 bg-white">
                            {error && (
                                <div className="alert alert-danger py-2 mb-3" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label fw-semibold text-secondary small">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                        placeholder="e.g. Jane Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold text-secondary small">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="user@brightpath.edu"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label fw-semibold text-secondary small">
                                        Register As
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="form-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold text-secondary small">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary small">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-semibold py-2 rounded-3 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>

                                <div className="text-center small text-secondary">
                                    Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-semibold">Sign In</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin"); // Default selection
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        // Simulate login flow and navigate based on selected role
        setTimeout(() => {
            setLoading(false);
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/teacher");
            }
        }, 800);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="bg-primary p-4 text-white text-center">
                            <h3 className="mb-1 fw-bold">Portal Login</h3>
                            <p className="mb-0 text-white-50 small">Sign in to access your dashboard</p>
                        </div>

                        <div className="card-body p-4 bg-white">
                            {error && (
                                <div className="alert alert-danger py-2 mb-3" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="roleSelect" className="form-label fw-semibold text-secondary small">
                                        Select Role
                                    </label>
                                    <select
                                        id="roleSelect"
                                        className="form-select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="admin">Administrator</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold text-secondary small">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="user@brightpath.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold text-secondary small">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                            Signing In...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>

                                <div className="text-center small text-secondary">
                                    Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-semibold">Sign Up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
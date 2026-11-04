import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config";
import Toast from "../../components/Toast";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        // Fetch users from mock database for authentication
        fetch(API_ENDPOINTS.USERS)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to connect to authentication server.");
                return res.json();
            })
            .then((users) => {
                const foundUser = users.find(
                    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
                );

                if (!foundUser) {
                    throw new Error("Invalid email or password. Please check your credentials.");
                }

                // Save user session to localStorage
                localStorage.setItem("user", JSON.stringify(foundUser));

                setLoading(false);
                setToast({
                    show: true,
                    message: `Successfully authenticated as ${foundUser.fullName}!`,
                    type: "success"
                });

                setTimeout(() => {
                    if (foundUser.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/teacher");
                    }
                }, 1000);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden hover-elevate">
                        <div className="bg-primary p-4 text-white text-center position-relative">
                            <span className="badge bg-white text-primary fw-bold mb-2 px-3 py-1 rounded-pill">Secure Authentication</span>
                            <h3 className="mb-1 fw-bold">Staff Portal Login</h3>
                            <p className="mb-0 text-white-50 small">Enter your credentials to access your dashboard</p>
                        </div>

                        <div className="card-body p-4 p-md-5 bg-white">
                            {error && (
                                <div className="alert alert-danger py-2 mb-3 rounded-3 small" role="alert">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold text-secondary small">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control py-2 rounded-3"
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
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="form-control py-2 rounded-start-3 border-end-0"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-semibold py-2 rounded-3 mb-3 shadow-sm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Verifying Credentials...
                                        </>
                                    ) : (
                                        "Sign In →"
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

export default Login;
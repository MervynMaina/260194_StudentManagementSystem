import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        navigate("/login");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container-fluid">
            {/* Mobile Header Bar (Visible only on small screens) */}
            <div className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center shadow-sm">
                <h5 className="fw-bold mb-0">Admin Portal</h5>
                <button
                    className="btn btn-outline-light btn-sm"
                    type="button"
                    onClick={toggleSidebar}
                    aria-controls="adminSidebar"
                    aria-expanded={isSidebarOpen}
                >
                    <i className={`bi ${isSidebarOpen ? "bi-x-lg" : "bi-list"}`}></i> Menu
                </button>
            </div>

            <div className="row min-vh-100">
                {/* Admin Sidebar */}
                <nav
                    id="adminSidebar"
                    className={`col-md-3 col-lg-2 bg-dark sidebar text-white p-3 shadow-sm ${isSidebarOpen ? "block" : "d-md-block"
                        } ${isSidebarOpen ? "" : "collapse"}`}
                    style={{ zIndex: 1000 }}
                >
                    <div className="position-sticky pt-3">
                        <h4 className="text-white fw-bold px-2 mb-4 d-none d-md-block tracking-tight">
                            Admin Portal
                        </h4>

                        <ul className="nav flex-column gap-2">
                            {[
                                { to: "/admin", label: "Dashboard", icon: "bi-speedometer2", end: true },
                                { to: "/admin/students", label: "Manage Students", icon: "bi-mortarboard" },
                                { to: "/admin/teachers", label: "Manage Teachers", icon: "bi-people" },
                                { to: "/admin/settings", label: "Settings", icon: "bi-gear" },
                                { to: "/admin/help", label: "Help Section", icon: "bi-question-circle" },
                            ].map((item) => (
                                <li className="nav-item" key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.end}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `nav-link d-flex align-items-center py-2.5 px-3 rounded-3 transition-all fw-medium ${isActive
                                                ? "bg-primary text-white shadow-sm"
                                                : "text-white-50 hover-text-white"
                                            }`
                                        }
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? "#0d6efd" : "transparent",
                                            color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.75)",
                                            transition: "all 0.2s ease-in-out",
                                        })}
                                    >
                                        <i className={`bi ${item.icon} me-3 fs-5`}></i>
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        <hr className="my-4 text-secondary" />

                        <div className="px-2">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-light btn-sm w-100 fw-semibold py-2 rounded-3 shadow-sm"
                            >
                                <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4 bg-light min-vh-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
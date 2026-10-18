import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const TeacherLayout = () => {
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
            <div className="d-md-none bg-success text-white p-3 d-flex justify-content-between align-items-center shadow-sm">
                <h5 className="fw-bold mb-0">Teacher Portal</h5>
                <button
                    className="btn btn-outline-light btn-sm"
                    type="button"
                    onClick={toggleSidebar}
                    aria-controls="teacherSidebar"
                    aria-expanded={isSidebarOpen}
                >
                    <i className={`bi ${isSidebarOpen ? "bi-x-lg" : "bi-list"}`}></i> Menu
                </button>
            </div>

            <div className="row min-vh-100">
                {/* Teacher Sidebar */}
                <nav
                    id="teacherSidebar"
                    className={`col-md-3 col-lg-2 bg-success sidebar text-white p-3 ${isSidebarOpen ? "block" : "d-md-block"
                        } ${isSidebarOpen ? "" : "collapse"}`}
                    style={{ zIndex: 1000 }}
                >
                    <div className="position-sticky pt-3">
                        <h4 className="text-white fw-bold px-2 mb-4 d-none d-md-block">Teacher Portal</h4>

                        <ul className="nav flex-column gap-1">
                            <li className="nav-item">
                                <Link
                                    to="/teacher"
                                    className="nav-link text-white rounded py-2 px-3 hover-bg"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/teacher/students"
                                    className="nav-link text-white rounded py-2 px-3 hover-bg"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <i className="bi bi-mortarboard me-2"></i> Manage Students
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/teacher/settings"
                                    className="nav-link text-white rounded py-2 px-3 hover-bg"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <i className="bi bi-gear me-2"></i> Settings
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/teacher/help"
                                    className="nav-link text-white rounded py-2 px-3 hover-bg"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <i className="bi bi-question-circle me-2"></i> Help Section
                                </Link>
                            </li>
                        </ul>

                        <hr className="my-4 text-white-50" />

                        <div className="px-2">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-light btn-sm w-100 fw-semibold"
                            >
                                Sign Out
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

export default TeacherLayout;
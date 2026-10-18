import React, { useEffect } from "react";

const Toast = ({ show, message, type = "success", onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3500); // Auto-dismisses after 3.5 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const bgMap = {
        success: "bg-success text-white",
        danger: "bg-danger text-white",
        info: "bg-dark text-white",
    };

    return (
        <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1100 }}
        >
            <div className={`toast show shadow-lg border-0 rounded-4 ${bgMap[type] || bgMap.success}`} role="alert">
                <div className="d-flex align-items-center p-2">
                    <div className="toast-body fw-semibold">
                        <i className={`bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-octagon-fill' : 'bi-info-circle-fill'} me-2 fs-6`}></i>
                        {message}
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white me-2 m-auto shadow-none"
                        onClick={onClose}
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
import React from "react";

const StatsCard = ({ title, value, icon, bgClass = "bg-primary" }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className={`card text-white ${bgClass} shadow-sm border-0 rounded-4 h-100`}>
        <div className="card-body p-4 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-uppercase fw-semibold text-white-50 small mb-1">{title}</h6>
            <h2 className="display-6 fw-bold mb-0">{value}</h2>
          </div>
          <div className="fs-1 text-white-50">
            <i className={`bi ${icon}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
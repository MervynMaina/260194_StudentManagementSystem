import React from "react";

const StatusAlert = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Fetching data from server...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4 shadow-sm" role="alert">
        <h4 className="alert-heading">Unable to Load Data</h4>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  return null;
};

export default StatusAlert;
import React from "react";

const AddStudent = () => {
  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="card-title mb-3 text-primary">Register New Student</h3>
              
              <div className="alert alert-info" role="alert">
                <strong>Prototype View:</strong> This form is a visual representation for testing layout responsiveness. Data saving functionality will be added in Phase 2.
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="e.g. Jane Doe" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="jane@brightpath.edu" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" className="form-control" placeholder="20" disabled />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select className="form-select" disabled>
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <input type="text" className="form-control" placeholder="Software Development" disabled />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled>
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
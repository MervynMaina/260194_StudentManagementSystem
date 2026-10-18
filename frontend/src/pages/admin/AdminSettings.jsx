import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: "System Administrator",
    email: "admin@brightpath.edu",
    notifications: true,
    theme: "light",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <Link to="/admin" className="btn btn-outline-secondary btn-sm mb-2">
            &larr; Back to Dashboard
          </Link>
          <h2 className="fw-bold text-dark mb-0">Administrator Settings</h2>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          {saved && (
            <div className="alert alert-success py-2 mb-3" role="alert">
              Settings updated successfully!
            </div>
          )}

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold text-dark mb-3">Account Information</h5>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Administrator Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <hr className="my-4 opacity-10" />

                <h5 className="fw-bold text-dark mb-3">System Preferences</h5>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Dashboard Theme</label>
                  <select
                    name="theme"
                    className="form-select"
                    value={profile.theme}
                    onChange={handleChange}
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode (Default Modern)</option>
                  </select>
                </div>

                <div className="form-check form-switch mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifications"
                    name="notifications"
                    checked={profile.notifications}
                    onChange={handleChange}
                  />
                  <label className="form-check-input-label fw-semibold text-secondary small ms-2" htmlFor="notifications">
                    Receive email alerts on new student registrations and updates
                  </label>
                </div>

                <button type="submit" className="btn btn-primary fw-semibold py-2 px-4 rounded-3">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
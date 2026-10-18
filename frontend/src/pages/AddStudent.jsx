import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const AddStudent = () => {
  const navigate = useNavigate();

  // Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    course: "",
  });

  // UI interaction states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Universal handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Format payload (converting age to a number)
    const newStudent = {
      ...formData,
      age: Number(formData.age),
    };

    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register student. Server returned an error.");
        }
        return response.json();
      })
      .then(() => {
        setSubmitting(false);
        // Navigate back to the students page upon successful creation
        navigate("/students");
      })
      .catch((err) => {
        setSubmitting(false);
        setError(err.message || "Something went wrong while saving.");
      });
  };

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="bg-primary p-4 text-white">
              <h3 className="mb-0 fw-bold">Register New Student</h3>
              <p className="mb-0 text-white-50 small">Fill out the details below to add a student to the directory.</p>
            </div>

            <div className="card-body p-4 bg-white">
              {error && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold text-secondary small">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
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
                    placeholder="jane.doe@brightpath.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label htmlFor="age" className="form-label fw-semibold text-secondary small">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className="form-control"
                      placeholder="20"
                      min="16"
                      max="100"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="gender" className="form-label fw-semibold text-secondary small">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="course" className="form-label fw-semibold text-secondary small">
                    Course / Major
                  </label>
                  <select
                    id="course"
                    name="course"
                    className="form-select"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Course...</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Networking">Networking</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Business IT">Business IT</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold py-2 rounded-3"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving Student...
                    </>
                  ) : (
                    "Save & Add Student"
                  )}
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
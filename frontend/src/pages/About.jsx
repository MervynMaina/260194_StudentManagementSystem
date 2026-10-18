import React from "react";

const About = () => {
  return (
    <div className="container py-2">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h2 className="text-primary mb-3">About the System</h2>
          <p className="lead">
            This Student Management System was developed for BrightPath College to transition student management records from manual spreadsheets into a structured single-page web environment.
          </p>
          <hr />
          <h5>Technologies Implemented</h5>
          <ul>
            <li><strong>React.js:</strong> Component-based user interface architecture</li>
            <li><strong>React Router:</strong> Client-side dynamic routing</li>
            <li><strong>Bootstrap 5:</strong> Responsive styling and layout controls</li>
            <li><strong>JSON Server:</strong> Local RESTful mock API service</li>
          </ul>
          <hr />
          <h5>Developer Information</h5>
          <p className="mb-1"><strong>Developer Name:</strong> Mervyn Maina Kamau</p>
          <p className="mb-0"><strong>Student ID:</strong> 260194</p>
        </div>
      </div>
    </div>
  );
};

export default About;
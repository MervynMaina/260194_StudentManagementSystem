import React from "react";
import useFetch from "../hooks/useFetch";
import StudentCard from "../components/StudentCard";
import StatusAlert from "../components/StatusAlert";
import { API_ENDPOINTS } from "../config"; // Use API_ENDPOINTS here

const Students = () => {
  const { data: students, loading, error } = useFetch(API_ENDPOINTS.STUDENTS);

  return (
    <div className="container py-2">
      <h2 className="mb-4 text-dark border-bottom pb-2">Student Directory</h2>

      <StatusAlert loading={loading} error={error} />

      {!loading && !error && students && (
        <div className="row">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
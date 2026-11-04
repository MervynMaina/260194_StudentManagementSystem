import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import EditStudent from "./pages/admin/EditStudent";
import ManageTeachers from "./pages/admin/ManageTeachers";
import TeacherDetails from "./pages/TeacherDetails";
import EditTeacher from "./pages/admin/EditTeacher";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminHelp from "./pages/admin/AdminHelp";
import RegisterStaff from "./pages/admin/RegisterStaff"; // Newly added admin provisioning page

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherSettings from "./pages/teacher/TeacherSettings";
import TeacherHelp from "./pages/teacher/TeacherHelp";

// Shared Detail Pages (if applicable)
import StudentDetails from "./pages/StudentDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Removed public register/directory routes) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="teachers/:id" element={<TeacherDetails />} />
          <Route path="teachers/edit/:id" element={<EditTeacher />} />
          <Route path="register-staff" element={<RegisterStaff />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="help" element={<AdminHelp />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="settings" element={<TeacherSettings />} />
          <Route path="help" element={<TeacherHelp />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
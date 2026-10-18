# Student Management System - BrightPath College

**Developer Name:** Mervyn Maina Kamau  
**Student ID:** 260194 

---

## Overview

The BrightPath Student Portal is a robust, single-page React application designed for BrightPath College to transition student academic records from manual files into a centralized, role-based web interface. The application features a layout-driven routing architecture separating public visitor views, administrator controls, and teacher record management portals.

---

## Key Features

- **Layout-Driven Architecture**: Modular routing utilizing nested `<Outlet />` wrappers (`PublicLayout`, `AdminLayout`, `TeacherLayout`).
- **Multi-Role Portals**: 
  - **Admin Portal**: Complete dashboard metrics, full CRUD management for students and teachers, system settings, and help documentation.
  - **Teacher Portal**: Overview summary cards, student record management (add, filter, search, delete), and teacher settings.
- **Public Directory & Details**: Public browsing, course filtering, search capabilities, and dedicated student detail views.
- **Responsive UI**: Built with React.js and styled using Bootstrap 5 and Bootstrap Icons.
- **Backend Integration**: Powered by JSON Server v1+ providing real-time data persistence.

---

## Tech Stack

- **Frontend**: React.js, React Router DOM, Bootstrap 5
- **Backend / Mock Database**: JSON Server (`db.json`)
- **Build Tool**: Vite

---

## Getting Started & Installation

Follow these steps to run the application locally on your machine.

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: Package manager included with Node.js

### Installation & Launch Instructions

Clone the repository, navigate into the project directory, install the required npm packages, and run both terminals to launch the application:

```bash
git clone [https://github.com/MervynMaina/260194_StudentManagementSystem.git](https://github.com/MervynMaina/260194_StudentManagementSystem.git)
cd 260194_StudentManagementSystem
npm install

# Run the Application (Dual Terminals required)

# Terminal 1: Start JSON Server backend
npx json-server --watch db.json --port 5000

# Terminal 2: Start Vite frontend development server
npm run dev
Open your browser and navigate to http://localhost:5173 to view the application.
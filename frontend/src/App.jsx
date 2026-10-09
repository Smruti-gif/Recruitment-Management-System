import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CreateJob from "./pages/CreateJob";

// Candidate pages
import MyApplications from "./pages/MyApplications";
import CandidateDashboard from "./pages/CandidateDashboard";

// Recruiter pages
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterApplications from "./pages/RecruiterApplications";
import RecruiterInterviews from "./pages/RecruiterInterviews";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";

// Shared components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (

    <BrowserRouter>

      {/* Global Navbar */}
      <Navbar />

      <Routes>

        {/* =====================================
            PUBLIC ROUTES
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================
            CANDIDATE ROUTES
        ===================================== */}

        <Route
          path="/candidate-dashboard"
          element={<CandidateDashboard />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />


        {/* =====================================
            RECRUITER ROUTES
        ===================================== */}

        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter/jobs/new"
          element={<CreateJob />}
        />

        <Route
          path="/recruiter/applications"
          element={<RecruiterApplications />}
        />

        <Route
          path="/recruiter/interviews"
          element={<RecruiterInterviews />}
        />


        {/* =====================================
            ADMIN ROUTES
        ===================================== */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>


      {/* Global Footer */}
      <Footer />

    </BrowserRouter>

  );
}

export default App;
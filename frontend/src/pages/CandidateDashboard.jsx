import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function CandidateDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================================================
  // LOAD USER + APPLICATIONS
  // =========================================================

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {

      navigate("/login");

      return;
    }

    try {

      const currentUser = JSON.parse(storedUser);

      setUser(currentUser);

      loadApplications(currentUser.userId);

    } catch (error) {

      console.error("Invalid user data:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }

  }, [navigate]);


  // =========================================================
  // GET CANDIDATE APPLICATIONS
  // =========================================================

  const loadApplications = async (candidateId) => {

    try {

      setLoading(true);

      const response = await api.get(
        `/applications/candidate/${candidateId}`
      );

      console.log(
        "Candidate applications:",
        response.data
      );

      setApplications(response.data || []);

    } catch (error) {

      console.error(
        "Failed to load applications:",
        error
      );

      if (error.response?.status === 401) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

        return;
      }

      setError(
        "Unable to load your applications."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  // =========================================================
  // APPLICATION STATISTICS
  // =========================================================

  const totalApplications = applications.length;

  const pendingApplications =
    applications.filter(
      (application) =>
        application.status === "APPLIED" ||
        application.status === "PENDING"
    ).length;

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status === "SHORTLISTED"
    ).length;

  const rejectedApplications =
    applications.filter(
      (application) =>
        application.status === "REJECTED"
    ).length;


  // =========================================================
  // GET JOB INFORMATION
  // =========================================================

  const getJob = (application) => {

    return application.job || {};
  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="candidate-dashboard">

      {/* =====================================================
          DASHBOARD HERO
      ====================================================== */}

      <section className="dashboard-hero">

        <div className="dashboard-hero-content">

          <div>

            <span className="dashboard-label">
              CANDIDATE DASHBOARD
            </span>

            <h1>
              Welcome back,
              {" "}
              {user?.fullName || "Candidate"} 👋
            </h1>

            <p>
              Track your applications and discover
              your next career opportunity.
            </p>

          </div>

          <button
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>


      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}

      <main className="dashboard-container">


        {/* ===================================================
            QUICK ACTIONS
        ==================================================== */}

        <section className="dashboard-actions">

          <Link
            to="/jobs"
            className="dashboard-action primary"
          >
            🔍
            <span>
              Browse Jobs
            </span>
          </Link>

          <Link
            to="/my-applications"
            className="dashboard-action"
          >
            📋
            <span>
              My Applications
            </span>
          </Link>

          <Link
            to="/"
            className="dashboard-action"
          >
            🏠
            <span>
              Home
            </span>
          </Link>

        </section>


        {/* ===================================================
            STATISTICS
        ==================================================== */}

        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon blue">
              📄
            </div>

            <div>

              <span>
                Total Applications
              </span>

              <strong>
                {totalApplications}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              ⏳
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {pendingApplications}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              ⭐
            </div>

            <div>

              <span>
                Shortlisted
              </span>

              <strong>
                {shortlistedApplications}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon red">
              ✕
            </div>

            <div>

              <span>
                Rejected
              </span>

              <strong>
                {rejectedApplications}
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================================
            APPLICATIONS
        ==================================================== */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                APPLICATION TRACKER
              </span>

              <h2>
                Recent Applications
              </h2>

            </div>

            <Link to="/my-applications">
              View All →
            </Link>

          </div>


          {loading && (

            <div className="dashboard-message">

              <div className="spinner"></div>

              <p>
                Loading your applications...
              </p>

            </div>

          )}


          {!loading && error && (

            <div className="dashboard-error">

              ⚠️ {error}

            </div>

          )}


          {!loading &&
            !error &&
            applications.length === 0 && (

              <div className="empty-dashboard">

                <div className="empty-icon">
                  📋
                </div>

                <h3>
                  No applications yet
                </h3>

                <p>
                  Start exploring jobs and apply
                  for opportunities that match
                  your skills.
                </p>

                <Link
                  to="/jobs"
                  className="browse-jobs-btn"
                >
                  Explore Jobs →
                </Link>

              </div>

            )}


          {!loading &&
            !error &&
            applications.length > 0 && (

              <div className="application-list">

                {applications
                  .slice(0, 5)
                  .map((application) => {

                    const job =
                      getJob(application);

                    return (

                      <div
                        className="application-card"
                        key={application.id}
                      >

                        <div className="application-company">

                          <div className="company-avatar">

                            {job.company?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}

                          </div>

                        </div>


                        <div className="application-info">

                          <h3>
                            {job.title ||
                              "Job Application"}
                          </h3>

                          <p>
                            {job.company?.name ||
                              "Company"}
                          </p>

                          <div className="application-meta">

                            {job.location && (
                              <span>
                                📍 {job.location}
                              </span>
                            )}

                            {job.jobType && (
                              <span>
                                💼 {job.jobType}
                              </span>
                            )}

                          </div>

                        </div>


                        <div className="application-status">

                          <span
                            className={`status-badge ${String(
                              application.status ||
                              "APPLIED"
                            ).toLowerCase()}`}
                          >
                            {application.status ||
                              "APPLIED"}
                          </span>

                          {application.appliedAt && (

                            <small>
                              Applied{" "}
                              {new Date(
                                application.appliedAt
                              ).toLocaleDateString()}
                            </small>

                          )}

                        </div>

                      </div>

                    );

                  })}

              </div>

            )}

        </section>


        {/* ===================================================
            CAREER SECTION
        ==================================================== */}

        <section className="career-banner">

          <div>

            <span>
              YOUR NEXT OPPORTUNITY
            </span>

            <h2>
              Ready to find your dream job?
            </h2>

            <p>
              Explore new opportunities from
              companies looking for talented
              professionals like you.
            </p>

          </div>

          <Link
            to="/jobs"
            className="career-btn"
          >
            Find Jobs →
          </Link>

        </section>

      </main>

    </div>
  );
}

export default CandidateDashboard;
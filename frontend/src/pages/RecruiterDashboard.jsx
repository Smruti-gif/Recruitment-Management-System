import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RecruiterDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    try {

      const currentUser = JSON.parse(storedUser);

      if (currentUser.role !== "RECRUITER") {
        navigate("/");
        return;
      }

      setUser(currentUser);

    } catch (error) {

      console.error("Invalid user data:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }

  }, [navigate]);


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  return (

    <div className="recruiter-dashboard">

      {/* HERO */}

      <section className="recruiter-hero">

        <div className="recruiter-hero-content">

          <div>

            <span className="dashboard-label">
              RECRUITER DASHBOARD
            </span>

            <h1>
              Welcome back,
              {" "}
              {user?.fullName || "Recruiter"} 👋
            </h1>

            <p>
              Manage your jobs, discover talented candidates,
              and build your hiring pipeline.
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


      {/* CONTENT */}

      <main className="recruiter-container">


        {/* QUICK ACTIONS */}

        <section className="recruiter-actions">

          <Link
            to="/recruiter/jobs/new"
            className="recruiter-action primary"
          >
            <div className="action-icon">
              ＋
            </div>

            <div>
              <strong>
                Post a Job
              </strong>

              <span>
                Create a new job opening
              </span>
            </div>

          </Link>


          <Link
            to="/recruiter/applications"
            className="recruiter-action"
          >
            <div className="action-icon">
              📋
            </div>

            <div>
              <strong>
                Applications
              </strong>

              <span>
                Review candidate applications
              </span>
            </div>

          </Link>


          <Link
            to="/jobs"
            className="recruiter-action"
          >
            <div className="action-icon">
              🔍
            </div>

            <div>
              <strong>
                Browse Jobs
              </strong>

              <span>
                View published opportunities
              </span>
            </div>

          </Link>

        </section>


        {/* STATISTICS */}

        <section className="recruiter-stats">

          <div className="recruiter-stat-card">

            <div className="recruiter-stat-icon blue">
              💼
            </div>

            <div>
              <span>
                Active Jobs
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>


          <div className="recruiter-stat-card">

            <div className="recruiter-stat-icon purple">
              📄
            </div>

            <div>
              <span>
                Applications
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>


          <div className="recruiter-stat-card">

            <div className="recruiter-stat-icon green">
              ⭐
            </div>

            <div>
              <span>
                Shortlisted
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>


          <div className="recruiter-stat-card">

            <div className="recruiter-stat-icon orange">
              🎯
            </div>

            <div>
              <span>
                Interviews
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>

        </section>


        {/* JOB MANAGEMENT */}

        <section className="recruiter-section">

          <div className="recruiter-section-heading">

            <div>

              <span>
                HIRING MANAGEMENT
              </span>

              <h2>
                Manage Your Recruitment
              </h2>

            </div>

          </div>


          <div className="recruiter-management-grid">


            <div className="management-card">

              <div className="management-icon">
                💼
              </div>

              <h3>
                Manage Jobs
              </h3>

              <p>
                Create, edit and manage your
                job postings.
              </p>

              <Link to="/jobs">
                Manage Jobs →
              </Link>

            </div>


            <div className="management-card">

              <div className="management-icon">
                👥
              </div>

              <h3>
                Candidates
              </h3>

              <p>
                Review candidates who applied
                to your job openings.
              </p>

              <Link to="/recruiter/applications">
                View Candidates →
              </Link>

            </div>


            <div className="management-card">

              <div className="management-icon">
                📅
              </div>

              <h3>
                Interviews
              </h3>

              <p>
                Schedule and manage candidate
                interviews.
              </p>

              <Link to="/recruiter/interviews">
                Manage Interviews →
              </Link>

            </div>


          </div>

        </section>


        {/* EMPTY JOB STATE */}

        <section className="recruiter-empty">

          <div className="empty-icon">
            💼
          </div>

          <h2>
            Start Building Your Hiring Pipeline
          </h2>

          <p>
            Post your first job and start connecting
            with qualified candidates.
          </p>

          <Link
            to="/recruiter/jobs/new"
            className="post-job-button"
          >
            Post Your First Job →
          </Link>

        </section>


      </main>

    </div>
  );
}

export default RecruiterDashboard;
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminDashboard() {

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

      if (currentUser.role !== "ADMIN") {
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
    <div className="admin-dashboard">

      {/* HERO */}

      <section className="admin-hero">

        <div className="admin-hero-content">

          <div>

            <span className="dashboard-label">
              ADMINISTRATION
            </span>

            <h1>
              Welcome, {user?.fullName || "Administrator"} 👋
            </h1>

            <p>
              Manage users, jobs, applications and the
              overall RecruitHub platform.
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


      {/* MAIN */}

      <main className="admin-container">


        {/* STATISTICS */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon blue">
              👥
            </div>

            <div>
              <span>Total Users</span>
              <strong>0</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon purple">
              💼
            </div>

            <div>
              <span>Total Jobs</span>
              <strong>0</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon green">
              📄
            </div>

            <div>
              <span>Applications</span>
              <strong>0</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon orange">
              🏢
            </div>

            <div>
              <span>Companies</span>
              <strong>0</strong>
            </div>

          </div>

        </section>


        {/* MANAGEMENT */}

        <section className="admin-section">

          <div className="admin-heading">

            <span>
              PLATFORM MANAGEMENT
            </span>

            <h2>
              Administration
            </h2>

          </div>


          <div className="admin-grid">


            <div className="admin-card">

              <div className="admin-card-icon">
                👥
              </div>

              <h3>
                Manage Users
              </h3>

              <p>
                View and manage candidates,
                recruiters and administrators.
              </p>

              <Link to="/admin/users">
                Manage Users →
              </Link>

            </div>


            <div className="admin-card">

              <div className="admin-card-icon">
                💼
              </div>

              <h3>
                Manage Jobs
              </h3>

              <p>
                Review and manage job postings
                across the platform.
              </p>

              <Link to="/jobs">
                Manage Jobs →
              </Link>

            </div>


            <div className="admin-card">

              <div className="admin-card-icon">
                📄
              </div>

              <h3>
                Applications
              </h3>

              <p>
                Monitor applications submitted
                by candidates.
              </p>

              <Link to="/admin/applications">
                View Applications →
              </Link>

            </div>


            <div className="admin-card">

              <div className="admin-card-icon">
                🏢
              </div>

              <h3>
                Companies
              </h3>

              <p>
                Manage companies registered
                on RecruitHub.
              </p>

              <Link to="/admin/companies">
                Manage Companies →
              </Link>

            </div>


          </div>

        </section>


        {/* SYSTEM STATUS */}

        <section className="admin-status">

          <div className="status-icon">
            ✓
          </div>

          <div>

            <h3>
              System Status
            </h3>

            <p>
              RecruitHub platform is running normally.
            </p>

          </div>

          <span className="status-badge">
            OPERATIONAL
          </span>

        </section>


      </main>

    </div>
  );
}


export default AdminDashboard;
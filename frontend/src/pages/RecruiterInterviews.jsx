import { Link } from "react-router-dom";

function RecruiterInterviews() {

  return (
    <div className="recruiter-interviews-page">

      {/* Hero */}
      <section className="recruiter-hero">

        <div className="recruiter-container">

          <span className="section-label">
            RECRUITER PORTAL
          </span>

          <h1>
            Candidate Interviews
          </h1>

          <p>
            Schedule and manage candidate interviews.
          </p>

        </div>

      </section>


      {/* Content */}
      <section className="recruiter-container recruiter-applications-container">

        <div className="applications-header">

          <div>
            <h2>
              Interviews
            </h2>

            <p>
              Manage your upcoming candidate interviews.
            </p>
          </div>

          <Link
            to="/recruiter-dashboard"
            className="browse-jobs-btn"
          >
            ← Dashboard
          </Link>

        </div>


        <div className="no-applications">

          <div className="empty-icon">
            📅
          </div>

          <h2>
            Interview Management
          </h2>

          <p>
            Scheduled interviews will appear here.
          </p>

        </div>

      </section>

    </div>
  );
}

export default RecruiterInterviews;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      /* --------------------------------
         Authentication check
      -------------------------------- */

      if (!token || !storedUser) {
        setError("Please login to view your applications.");
        return;
      }

      let user;

      try {
        user = JSON.parse(storedUser);
      } catch (parseError) {
        console.error("Invalid user data in localStorage.");

        setError("Your login session is invalid. Please login again.");
        return;
      }

      /* --------------------------------
         Candidate authorization
      -------------------------------- */

      if (user.role !== "CANDIDATE") {
        setError("Only candidates can view their applications.");
        return;
      }

      if (!user.userId) {
        setError("Candidate information is missing. Please login again.");
        return;
      }

      /* --------------------------------
         Fetch applications
      -------------------------------- */

      const response = await api.get(
        `/applications/candidate/${user.userId}`
      );

      setApplications(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {
      console.error("Failed to fetch applications:", error);

      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          setError(
            "Your session has expired. Please login again."
          );
        } else if (status === 403) {
          setError(
            "You are not authorized to view these applications."
          );
        } else if (status === 404) {
          setError(
            "No application data was found."
          );
        } else {
          setError(
            error.response.data?.message ||
            "Failed to load applications."
          );
        }
      } else {
        setError(
          "Unable to connect to the server."
        );
      }

    } finally {
      setLoading(false);
    }
  };


  /* =========================================
     STATUS CLASS
  ========================================= */

  const getStatusClass = (status) => {
    if (!status) {
      return "status-default";
    }

    switch (status.toUpperCase()) {
      case "APPLIED":
        return "status-applied";

      case "SHORTLISTED":
        return "status-shortlisted";

      case "INTERVIEW":
        return "status-interview";

      case "SELECTED":
        return "status-selected";

      case "REJECTED":
        return "status-rejected";

      default:
        return "status-default";
    }
  };


  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="loading-page">

        <div className="spinner"></div>

        <h2>
          Loading your applications...
        </h2>

        <p>
          Please wait while we fetch your applications.
        </p>

      </div>
    );
  }


  /* =========================================
     ERROR
  ========================================= */

  if (error) {
    return (
      <div className="loading-page">

        <div className="dashboard-error">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <Link
            to="/jobs"
            className="browse-jobs-btn"
          >
            Browse Jobs
          </Link>

        </div>

      </div>
    );
  }


  /* =========================================
     MAIN UI
  ========================================= */

  return (
    <div className="applications-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="applications-hero">

        <div>

          <span className="section-label">
            CANDIDATE PORTAL
          </span>

          <h1>
            My Applications
          </h1>

          <p>
            Track all your job applications
            in one place.
          </p>

        </div>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <section className="applications-container">

        {/* Header */}

        <div className="applications-header">

          <div>

            <h2>
              Your Applications
            </h2>

            <p>
              {applications.length} application
              {applications.length !== 1 ? "s" : ""}
            </p>

          </div>


          <Link
            to="/jobs"
            className="browse-jobs-btn"
          >
            Browse Jobs
          </Link>

        </div>


        {/* =================================
            EMPTY STATE
        ================================= */}

        {applications.length === 0 ? (

          <div className="no-applications">

            <div className="empty-icon">
              📋
            </div>

            <h2>
              No Applications Yet
            </h2>

            <p>
              You haven't applied for any jobs yet.
              Explore available opportunities and
              start your career journey.
            </p>

            <Link
              to="/jobs"
              className="browse-jobs-btn"
            >
              Find Jobs
            </Link>

          </div>

        ) : (

          /* =================================
             APPLICATION LIST
          ================================= */

          <div className="applications-list">

            {applications.map((application) => {

              const job = application.job;
              const company = job?.company;

              const jobTitle =
                job?.title || "Job Position";

              const companyName =
                company?.name || "Company";

              const location =
                job?.location || "Location not available";

              const jobType =
                job?.jobType || "Job Type";

              const experience =
                job?.experienceLevel || "Experience";

              const status =
                application.status || "APPLIED";

              const appliedDate =
                application.appliedAt
                  ? new Date(
                      application.appliedAt
                    ).toLocaleDateString()
                  : "N/A";

              const companyInitial =
                companyName.charAt(0).toUpperCase();

              return (

                <article
                  className="application-card"
                  key={application.id}
                >

                  {/* =================================
                      TOP SECTION
                  ================================= */}

                  <div className="application-top">

                    {/* Company Logo */}

                    <div
                      className="company-logo"
                      aria-hidden="true"
                    >
                      {companyInitial}
                    </div>


                    {/* Job Information */}

                    <div className="application-job-info">

                      <h3>
                        {jobTitle}
                      </h3>

                      <p>
                        {companyName}
                      </p>

                    </div>


                    {/* Status */}

                    <div className="application-status-wrapper">

                      <span
                        className={`application-status ${getStatusClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>


                  {/* =================================
                      BODY
                  ================================= */}

                  <div className="application-card-body">

                    {/* Job Metadata */}

                    <div className="application-meta">

                      <span>
                        📍 {location}
                      </span>

                      <span>
                        💼 {jobType}
                      </span>

                      <span>
                        🎯 {experience}
                      </span>

                    </div>


                    {/* Footer */}

                    <div className="application-footer">

                      <div className="application-date">

                        <small>
                          Applied on
                        </small>

                        <strong>
                          {appliedDate}
                        </strong>

                      </div>


                      {job?.id ? (

                        <Link
                          to={`/jobs/${job.id}`}
                          className="view-job-btn"
                          aria-label={`View ${jobTitle}`}
                        >
                          View Job →
                        </Link>

                      ) : (

                        <span className="view-job-btn disabled">
                          Job Unavailable
                        </span>

                      )}

                    </div>

                  </div>

                </article>

              );
            })}

          </div>

        )}

      </section>

    </div>
  );
}

export default MyApplications;
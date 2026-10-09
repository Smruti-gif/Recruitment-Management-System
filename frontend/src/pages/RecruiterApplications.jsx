import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RecruiterApplications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/applications/recruiter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(response.data);

      } catch (err) {

        console.error("Failed to fetch applications:", err);

        setError(
          err.response?.data?.message ||
          "Failed to load applications."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchApplications();

  }, []);


  return (
    <div className="recruiter-applications-page">

      {/* Hero */}
      <section className="recruiter-hero">

        <div className="recruiter-container">

          <span className="section-label">
            RECRUITER PORTAL
          </span>

          <h1>
            Candidate Applications
          </h1>

          <p>
            Review candidates who applied to your job openings.
          </p>

        </div>

      </section>


      {/* Content */}
      <section className="recruiter-container recruiter-applications-container">

        <div className="applications-header">

          <div>

            <h2>
              Applications
            </h2>

            <p>
              Review and manage candidate applications.
            </p>

          </div>

          <Link
            to="/recruiter-dashboard"
            className="browse-jobs-btn"
          >
            ← Dashboard
          </Link>

        </div>


        {/* Loading */}
        {loading && (
          <div className="no-applications">

            <div className="empty-icon">
              ⏳
            </div>

            <h2>
              Loading Applications...
            </h2>

            <p>
              Please wait while we load candidate applications.
            </p>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="no-applications">

            <div className="empty-icon">
              ⚠️
            </div>

            <h2>
              Unable to Load Applications
            </h2>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* No Applications */}
        {!loading &&
          !error &&
          applications.length === 0 && (

            <div className="no-applications">

              <div className="empty-icon">
                📋
              </div>

              <h2>
                No Applications Yet
              </h2>

              <p>
                No candidates have applied to your job openings yet.
              </p>

            </div>

          )}


        {/* Applications */}
        {!loading &&
          !error &&
          applications.length > 0 && (

            <div className="applications-list">

              {applications.map((application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  {/* Candidate */}
                  <div className="application-candidate">

                    <div className="candidate-avatar">
                      {application.candidate?.fullName
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>

                      <h3>
                        {application.candidate?.fullName}
                      </h3>

                      <p>
                        {application.candidate?.email}
                      </p>

                      {application.candidate?.phone && (
                        <p>
                          {application.candidate.phone}
                        </p>
                      )}

                    </div>

                  </div>


                  {/* Job */}
                  <div className="application-job">

                    <span>
                      Applied For
                    </span>

                    <h3>
                      {application.job?.title}
                    </h3>

                    <p>
                      {application.job?.companyName}
                    </p>

                  </div>


                  {/* Status */}
                  <div className="application-status">

                    <span>
                      Status
                    </span>

                    <strong>
                      {application.status}
                    </strong>

                  </div>


                  {/* Date */}
                  <div className="application-date">

                    <span>
                      Applied On
                    </span>

                    <p>
                      {application.appliedAt
                        ? new Date(
                            application.appliedAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

      </section>

    </div>
  );
}

export default RecruiterApplications;
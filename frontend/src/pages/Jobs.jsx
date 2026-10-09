import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await api.get("/jobs");

        console.log("Jobs received:", response.data);

        setJobs(response.data);

      } catch (error) {

        console.error("Failed to fetch jobs:", error);

        setError("Failed to load jobs.");

      } finally {

        setLoading(false);

      }

    };

    fetchJobs();

  }, []);


  // Loading state
  if (loading) {

    return (
      <div className="loading-page">

        <h2>
          Loading jobs...
        </h2>

        <p>
          Please wait while we fetch the latest opportunities.
        </p>

      </div>
    );

  }


  // Error state
  if (error) {

    return (
      <div className="loading-page">

        <h2>
          {error}
        </h2>

        <p>
          Please make sure the Spring Boot server
          is running on port 8080.
        </p>

      </div>
    );

  }


  return (

    <div className="jobs-page">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <section className="jobs-hero">

        <div>

          <span className="section-label">
            EXPLORE OPPORTUNITIES
          </span>

          <h1>
            Find Your Dream Job
          </h1>

          <p>
            Search opportunities from companies
            looking for talented professionals.
          </p>

        </div>

      </section>


      {/* ========================= */}
      {/* Search */}
      {/* ========================= */}

      <section className="jobs-search">

        <div className="jobs-search-box">

          <div className="search-field">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Job title or keyword"
            />

          </div>


          <div className="search-field">

            <span>
              📍
            </span>

            <input
              type="text"
              placeholder="Location"
            />

          </div>


          <button className="search-btn">
            Search
          </button>

        </div>

      </section>


      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}

      <section className="jobs-container">


        {/* ========================= */}
        {/* Filters */}
        {/* ========================= */}

        <aside className="filters">

          <h3>
            Filter Jobs
          </h3>


          {/* Job Type */}

          <div className="filter-group">

            <h4>
              Job Type
            </h4>

            <label>
              <input type="checkbox" />
              Full Time
            </label>

            <label>
              <input type="checkbox" />
              Part Time
            </label>

            <label>
              <input type="checkbox" />
              Remote
            </label>

            <label>
              <input type="checkbox" />
              Internship
            </label>

          </div>


          {/* Experience */}

          <div className="filter-group">

            <h4>
              Experience
            </h4>

            <label>
              <input type="checkbox" />
              Fresher
            </label>

            <label>
              <input type="checkbox" />
              0-2 Years
            </label>

            <label>
              <input type="checkbox" />
              2-4 Years
            </label>

            <label>
              <input type="checkbox" />
              5+ Years
            </label>

          </div>


          {/* Location */}

          <div className="filter-group">

            <h4>
              Location
            </h4>

            <label>
              <input type="checkbox" />
              Bangalore
            </label>

            <label>
              <input type="checkbox" />
              Hyderabad
            </label>

            <label>
              <input type="checkbox" />
              Pune
            </label>

            <label>
              <input type="checkbox" />
              Remote
            </label>

          </div>

        </aside>


        {/* ========================= */}
        {/* Job Results */}
        {/* ========================= */}

        <div className="jobs-results">

          <div className="results-header">

            <h2>
              Available Jobs
            </h2>

            <span>
              {jobs.length} jobs found
            </span>

          </div>


          {/* No Jobs */}

          {jobs.length === 0 ? (

            <div className="loading-page">

              <h2>
                No Jobs Available
              </h2>

              <p>
                There are currently no active job opportunities.
              </p>

            </div>

          ) : (

            jobs.map((job) => (

              <div
                className="job-result-card"
                key={job.id}
              >


                {/* ========================= */}
                {/* Job Header */}
                {/* ========================= */}

                <div className="job-result-top">


                  {/* Company Logo */}

                  <div className="company-logo">

                    {job.company?.name
                      ? job.company.name
                          .charAt(0)
                          .toUpperCase()
                      : "C"}

                  </div>


                  {/* Job Information */}

                  <div className="job-main-info">

                    <h3>
                      {job.title}
                    </h3>

                    <p className="company-name">

                      {job.company?.name ||
                        "Company"}

                    </p>

                  </div>


                  {/* Job Type */}

                  <span className="job-type">

                    {job.jobType}

                  </span>

                </div>


                {/* ========================= */}
                {/* Job Meta */}
                {/* ========================= */}

                <div className="job-meta">

                  <span>
                    📍 {job.location}
                  </span>

                  <span>
                    💼 {job.experienceLevel}
                  </span>

                  <span>
                    💰 ₹{job.minSalary ?? "N/A"} - ₹
                    {job.maxSalary ?? "N/A"}
                  </span>

                </div>


                {/* ========================= */}
                {/* Job Tags */}
                {/* ========================= */}

                <div className="skills">

                  <span>
                    {job.jobType}
                  </span>

                  <span>
                    {job.experienceLevel}
                  </span>

                  {job.active && (
                    <span>
                      Actively Hiring
                    </span>
                  )}

                </div>


                {/* ========================= */}
                {/* Footer */}
                {/* ========================= */}

                <div className="job-result-footer">

                  <small>

                    {job.active
                      ? "Currently hiring"
                      : "No longer active"}

                  </small>


                  <Link
                    to={`/jobs/${job.id}`}
                    className="view-job-btn"
                  >
                    View Details →
                  </Link>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </div>

  );
}

export default Jobs;
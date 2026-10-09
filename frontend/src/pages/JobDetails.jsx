import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function JobDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  // =========================
  // Job State
  // =========================

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =========================
  // Application State
  // =========================

  const [coverLetter, setCoverLetter] = useState("");

  const [applying, setApplying] = useState(false);

  const [applicationSuccess, setApplicationSuccess] =
    useState("");


  // =========================
  // Fetch Job
  // =========================

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const response =
          await api.get(`/jobs/${id}`);

        console.log(
          "Job received:",
          response.data
        );

        setJob(response.data);

      } catch (error) {

        console.error(
          "Failed to fetch job:",
          error
        );

        setError(
          "Failed to load job details."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchJob();

  }, [id]);


  // =========================
  // Apply For Job
  // =========================

  const handleApply = async () => {

    setError("");

    setApplicationSuccess("");


    // Check JWT

    const token =
      localStorage.getItem("token");


    // Get logged-in user

    const storedUser =
      localStorage.getItem("user");


    // User not logged in

    if (!token || !storedUser) {

      navigate("/login");

      return;
    }


    let user;

    try {

      user = JSON.parse(storedUser);

    } catch (error) {

      console.error(
        "Invalid user data:",
        error
      );

      localStorage.removeItem("user");

      navigate("/login");

      return;
    }


    // Only candidates can apply

    if (user.role !== "CANDIDATE") {

      setError(
        "Only candidates can apply for jobs."
      );

      return;
    }


    // Cover letter validation

    if (!coverLetter.trim()) {

      setError(
        "Please enter a cover letter before applying."
      );

      return;
    }


    setApplying(true);


    try {

      const response = await api.post(
        "/applications/apply",
        {
          candidateId: user.userId,
          jobId: job.id,
          coverLetter: coverLetter.trim()
        }
      );


      console.log(
        "Application created:",
        response.data
      );


      setApplicationSuccess(
        "Application submitted successfully! 🎉"
      );


      setCoverLetter("");


    } catch (error) {

      console.error(
        "Application failed:",
        error
      );


      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Response:",
          error.response.data
        );


        setError(
          error.response.data?.message ||
          "Failed to submit application."
        );

      } else {

        setError(
          "Unable to connect to the server."
        );

      }

    } finally {

      setApplying(false);

    }

  };


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="loading-page">

        <h2>
          Loading job details...
        </h2>

        <p>
          Please wait.
        </p>

      </div>

    );

  }


  // =========================
  // Job Not Found
  // =========================

  if (error && !job) {

    return (

      <div className="not-found">

        <h1>
          Job Not Found
        </h1>

        <p>
          {error}
        </p>

        <Link to="/jobs">
          ← Back to Jobs
        </Link>

      </div>

    );

  }


  if (!job) {

    return (

      <div className="not-found">

        <h1>
          Job Not Found
        </h1>

        <p>
          The requested job does not exist.
        </p>

        <Link to="/jobs">
          ← Back to Jobs
        </Link>

      </div>

    );

  }


  // =========================
  // Render
  // =========================

  return (

    <div className="job-details-page">


      {/* ========================= */}
      {/* Job Header */}
      {/* ========================= */}

      <section className="job-details-header">

        <div className="job-details-header-content">


          {/* Company Logo */}

          <div className="company-logo large">

            {job.company?.name
              ? job.company.name
                  .charAt(0)
                  .toUpperCase()
              : "C"}

          </div>


          {/* Job Heading */}

          <div>

            <span className="job-type">

              {job.jobType}

            </span>


            <h1>

              {job.title}

            </h1>


            <p>

              {job.company?.name ||
                "Company"}

            </p>

          </div>

        </div>

      </section>


      {/* ========================= */}
      {/* Main Content */}
      {/* ========================= */}

      <section className="job-details-container">


        {/* ========================= */}
        {/* Left Side */}
        {/* ========================= */}

        <main className="job-details-main">


          {/* Job Description */}

          <div className="details-card">

            <h2>
              Job Description
            </h2>

            <p className="description">

              {job.description}

            </p>

          </div>


          {/* Job Information */}

          <div className="details-card">

            <h2>
              Job Information
            </h2>


            <div className="job-meta">

              <span>
                📍 {job.location}
              </span>

              <span>
                💼 {job.jobType}
              </span>

              <span>
                🎯 {job.experienceLevel}
              </span>

              <span>
                🏢 {job.company?.name}
              </span>

            </div>

          </div>


          {/* Responsibilities */}

          <div className="details-card">

            <h2>
              Responsibilities
            </h2>


            <ul className="responsibilities">

              <li>
                Develop and maintain scalable
                applications.
              </li>

              <li>
                Write clean and maintainable code.
              </li>

              <li>
                Work with the development team.
              </li>

              <li>
                Design and integrate REST APIs.
              </li>

              <li>
                Debug and improve existing
                applications.
              </li>

            </ul>

          </div>

        </main>


        {/* ========================= */}
        {/* Right Sidebar */}
        {/* ========================= */}

        <aside className="job-details-sidebar">


          {/* ========================= */}
          {/* Apply Card */}
          {/* ========================= */}

          <div className="apply-card">


            <h2>

              ₹{job.minSalary ?? "N/A"}
              {" - "}
              ₹{job.maxSalary ?? "N/A"}

            </h2>


            <p>
              Salary Range
            </p>


            {/* Cover Letter */}

            <textarea
              className="cover-letter"
              placeholder="Write a short cover letter..."
              value={coverLetter}
              onChange={(e) =>
                setCoverLetter(e.target.value)
              }
              rows="6"
            />


            {/* Error */}

            {error && (

              <div className="auth-error">

                {error}

              </div>

            )}


            {/* Success */}

            {applicationSuccess && (

              <div className="auth-success">

                {applicationSuccess}

              </div>

            )}


            {/* Apply Button */}

            <button
              className="apply-btn"
              onClick={handleApply}
              disabled={applying}
            >

              {applying
                ? "Submitting..."
                : "Apply Now"}

            </button>

          </div>


          {/* ========================= */}
          {/* Job Overview */}
          {/* ========================= */}

          <div className="details-card">

            <h3>
              Job Overview
            </h3>


            <div className="overview-item">

              <span>
                📍 Location
              </span>

              <strong>
                {job.location}
              </strong>

            </div>


            <div className="overview-item">

              <span>
                💼 Job Type
              </span>

              <strong>
                {job.jobType}
              </strong>

            </div>


            <div className="overview-item">

              <span>
                🎯 Experience
              </span>

              <strong>
                {job.experienceLevel}
              </strong>

            </div>


            <div className="overview-item">

              <span>
                💰 Salary
              </span>

              <strong>

                ₹{job.minSalary ?? "N/A"}
                {" - "}
                ₹{job.maxSalary ?? "N/A"}

              </strong>

            </div>


            <div className="overview-item">

              <span>
                📅 Posted
              </span>

              <strong>

                {job.createdAt
                  ? new Date(
                      job.createdAt
                    ).toLocaleDateString()
                  : "N/A"}

              </strong>

            </div>


            <div className="overview-item">

              <span>
                📌 Status
              </span>

              <strong>

                {job.active
                  ? "Actively Hiring"
                  : "Closed"}

              </strong>

            </div>

          </div>


          {/* Back */}

          <Link
            to="/jobs"
            className="back-jobs"
          >

            ← Browse More Jobs

          </Link>

        </aside>

      </section>

    </div>

  );

}


export default JobDetails;
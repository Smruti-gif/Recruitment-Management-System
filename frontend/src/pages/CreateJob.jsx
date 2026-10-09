import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function CreateJob() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyId: "",
    location: "",
    jobType: "FULL_TIME",
    experienceLevel: "ENTRY_LEVEL",
    minSalary: "",
    maxSalary: "",
    active: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));

  };


  /* =========================================
     SUBMIT JOB
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    /* -----------------------------------------
       Basic validation
    ----------------------------------------- */

    if (!formData.title.trim()) {
      setError("Job title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Job description is required.");
      return;
    }

    if (!formData.companyId) {
      setError("Company ID is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.minSalary || !formData.maxSalary) {
      setError("Please enter the salary range.");
      return;
    }

    if (
      Number(formData.minSalary) >
      Number(formData.maxSalary)
    ) {
      setError(
        "Minimum salary cannot be greater than maximum salary."
      );
      return;
    }


    try {

      setLoading(true);


      /* -----------------------------------------
         Request body matching Job entity
      ----------------------------------------- */

      const jobData = {

        title: formData.title.trim(),

        description: formData.description.trim(),

        company: {
          id: Number(formData.companyId)
        },

        location: formData.location.trim(),

        jobType: formData.jobType,

        experienceLevel:
          formData.experienceLevel,

        minSalary:
          Number(formData.minSalary),

        maxSalary:
          Number(formData.maxSalary),

        active: formData.active
      };


      console.log(
        "Creating job:",
        jobData
      );


      /* -----------------------------------------
         POST /jobs
      ----------------------------------------- */

      const response = await api.post(
        "/jobs",
        jobData
      );


      console.log(
        "Job created:",
        response.data
      );


      setSuccess(
        "Job posted successfully!"
      );


      /* -----------------------------------------
         Redirect after success
      ----------------------------------------- */

      setTimeout(() => {

        navigate("/recruiter-dashboard");

      }, 1200);


    } catch (error) {

      console.error(
        "Failed to create job:",
        error
      );


      if (error.response) {

        if (error.response.status === 401) {

          setError(
            "Your session has expired. Please login again."
          );

        } else if (error.response.status === 403) {

          setError(
            "You are not authorized to create a job."
          );

        } else {

          setError(
            error.response.data?.message ||
            "Failed to create job."
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


  return (

    <div className="create-job-page">


      {/* =====================================
          HERO
      ===================================== */}

      <section className="create-job-hero">

        <div className="create-job-container">

          <span className="section-label">
            RECRUITER PORTAL
          </span>

          <h1>
            Post a New Job
          </h1>

          <p>
            Create a new opportunity and attract
            talented candidates.
          </p>

        </div>

      </section>


      {/* =====================================
          FORM
      ===================================== */}

      <section className="create-job-container create-job-content">

        <div className="create-job-header">

          <div>

            <h2>
              Job Details
            </h2>

            <p>
              Fill in the information below to publish
              your job opening.
            </p>

          </div>

          <Link
            to="/recruiter-dashboard"
            className="back-dashboard-btn"
          >
            ← Dashboard
          </Link>

        </div>


        {/* Messages */}

        {error && (

          <div className="form-message error-message">
            {error}
          </div>

        )}


        {success && (

          <div className="form-message success-message">
            {success}
          </div>

        )}


        <form
          className="create-job-form"
          onSubmit={handleSubmit}
        >


          {/* =================================
              BASIC INFORMATION
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <span className="form-section-icon">
                💼
              </span>

              <div>
                <h3>
                  Basic Information
                </h3>

                <p>
                  Tell candidates about the position.
                </p>
              </div>

            </div>


            {/* Job Title */}

            <div className="form-group">

              <label htmlFor="title">
                Job Title
                <span>*</span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Java Full Stack Developer"
                value={formData.title}
                onChange={handleChange}
              />

            </div>


            {/* Description */}

            <div className="form-group">

              <label htmlFor="description">
                Job Description
                <span>*</span>
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Describe the role, responsibilities and expectations..."
                value={formData.description}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* =================================
              COMPANY INFORMATION
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <span className="form-section-icon">
                🏢
              </span>

              <div>
                <h3>
                  Company & Location
                </h3>

                <p>
                  Provide the company and workplace details.
                </p>
              </div>

            </div>


            <div className="form-grid">


              {/* Company ID */}

              <div className="form-group">

                <label htmlFor="companyId">
                  Company ID
                  <span>*</span>
                </label>

                <input
                  id="companyId"
                  name="companyId"
                  type="number"
                  min="1"
                  placeholder="e.g. 1"
                  value={formData.companyId}
                  onChange={handleChange}
                />

                <small>
                  Enter the ID of the company posting this job.
                </small>

              </div>


              {/* Location */}

              <div className="form-group">

                <label htmlFor="location">
                  Location
                  <span>*</span>
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Bangalore, India"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          {/* =================================
              JOB TYPE
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <span className="form-section-icon">
                ⚙️
              </span>

              <div>
                <h3>
                  Job Configuration
                </h3>

                <p>
                  Define the nature and experience level.
                </p>
              </div>

            </div>


            <div className="form-grid">


              {/* Job Type */}

              <div className="form-group">

                <label htmlFor="jobType">
                  Job Type
                </label>

                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                >

                  <option value="FULL_TIME">
                    Full Time
                  </option>

                  <option value="PART_TIME">
                    Part Time
                  </option>

                  <option value="CONTRACT">
                    Contract
                  </option>

                  <option value="INTERNSHIP">
                    Internship
                  </option>

                  <option value="REMOTE">
                    Remote
                  </option>

                </select>

              </div>


              {/* Experience */}

              <div className="form-group">

                <label htmlFor="experienceLevel">
                  Experience Level
                </label>

                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                >

                  <option value="ENTRY_LEVEL">
                    Entry Level
                  </option>

                  <option value="0-2_YEARS">
                    0-2 Years
                  </option>

                  <option value="2-4_YEARS">
                    2-4 Years
                  </option>

                  <option value="5+_YEARS">
                    5+ Years
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================
              SALARY
          ================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <span className="form-section-icon">
                💰
              </span>

              <div>
                <h3>
                  Salary Range
                </h3>

                <p>
                  Provide the expected compensation.
                </p>
              </div>

            </div>


            <div className="form-grid">


              <div className="form-group">

                <label htmlFor="minSalary">
                  Minimum Salary
                  <span>*</span>
                </label>

                <input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min="0"
                  placeholder="400000"
                  value={formData.minSalary}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="maxSalary">
                  Maximum Salary
                  <span>*</span>
                </label>

                <input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  placeholder="700000"
                  value={formData.maxSalary}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          {/* =================================
              STATUS
          ================================= */}

          <div className="form-section">

            <label className="active-job-toggle">

              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />

              <span>
                Publish this job immediately
              </span>

            </label>

          </div>


          {/* =================================
              ACTIONS
          ================================= */}

          <div className="create-job-actions">

            <Link
              to="/recruiter-dashboard"
              className="cancel-job-btn"
            >
              Cancel
            </Link>


            <button
              type="submit"
              className="create-job-btn"
              disabled={loading}
            >

              {loading
                ? "Publishing..."
                : "🚀 Publish Job"}

            </button>

          </div>

        </form>

      </section>

    </div>

  );
}

export default CreateJob;
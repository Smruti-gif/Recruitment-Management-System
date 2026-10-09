import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "CANDIDATE"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      const response = await api.post(
        "/api/auth/register",
        formData
      );

      console.log(
        "Registration response:",
        response.data
      );

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {

      console.error(
        "Registration failed:",
        error
      );

      if (error.response) {

        setError(
          error.response.data?.message ||
          "Registration failed."
        );

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

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            Create Account
          </h1>

          <p>
            Join RecruitHub and find your next opportunity.
          </p>

        </div>


        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}


        <form onSubmit={handleSubmit}>


          {/* Full Name */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>


          {/* Phone */}

          <div className="form-group">

            <label>
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />

          </div>


          {/* Role */}

          <div className="form-group">

            <label>
              Register As
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >

              <option value="CANDIDATE">
                Candidate
              </option>

              <option value="RECRUITER">
                Recruiter
              </option>

            </select>

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        <div className="auth-footer">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Register;
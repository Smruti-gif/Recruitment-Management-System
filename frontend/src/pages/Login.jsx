import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


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
    setLoading(true);

    try {

      const response = await api.post(
        "/api/auth/login",
        formData
      );

      console.log(
        "Login response:",
        response.data
      );


      /*
       * Store JWT token
       */

      localStorage.setItem(
        "token",
        response.data.token
      );


      /*
       * Store user information
       */

      const user = {
        userId: response.data.userId,
        fullName: response.data.fullName,
        email: response.data.email,
        role: response.data.role
      };

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      /*
       * Redirect according to role
       */

      if (response.data.role === "ADMIN") {

        navigate("/admin-dashboard");

      } else if (response.data.role === "RECRUITER") {

        navigate("/recruiter-dashboard");

      } else {

        navigate("/candidate-dashboard");

      }

    } catch (error) {

      console.error(
        "Login failed:",
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
          "Invalid email or password."
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
            Welcome Back
          </h1>

          <p>
            Login to your RecruitHub account.
          </p>

        </div>


        {/* Error */}

        {error && (

          <div className="auth-error">
            {error}
          </div>

        )}


        <form onSubmit={handleSubmit}>


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
              placeholder="Enter your password"
              required
            />

          </div>


          {/* Login */}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* Register */}

        <div className="auth-footer">

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Login;
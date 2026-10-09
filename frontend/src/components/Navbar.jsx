import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link to="/" className="logo">
          Recruit<span>Hub</span>
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/jobs">
            Jobs
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
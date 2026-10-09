import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-text">

            <span className="hero-badge">
              🚀 Find your next opportunity
            </span>

            <h1>
              Build Your
              <span> Future Career </span>
              With Us
            </h1>

            <p>
              Discover thousands of job opportunities from
              leading companies and take the next step in
              your professional journey.
            </p>

            <div className="hero-buttons">

              <Link to="/jobs" className="primary-btn">
                Find Jobs
              </Link>

              <Link to="/register" className="secondary-btn">
                Create Account
              </Link>

            </div>

          </div>

          <div className="hero-card">

            <div className="floating-card">

              <div className="job-icon">
                💼
              </div>

              <div>
                <h3>10,000+</h3>
                <p>Job Opportunities</p>
              </div>

            </div>

            <div className="floating-card second-card">

              <div className="job-icon">
                🏢
              </div>

              <div>
                <h3>2,500+</h3>
                <p>Companies Hiring</p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Search Section */}
      <section className="search-section">

        <div className="search-box">

          <div className="search-field">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Job title, keywords..."
            />
          </div>

          <div className="search-field">
            <span>📍</span>

            <input
              type="text"
              placeholder="Location"
            />
          </div>

          <button className="search-btn">
            Search Jobs
          </button>

        </div>

      </section>


      {/* Categories */}
      <section className="section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              EXPLORE OPPORTUNITIES
            </span>

            <h2>
              Popular Job Categories
            </h2>
          </div>

          <Link to="/jobs">
            View All →
          </Link>

        </div>


        <div className="categories">

          <div className="category-card">
            <span>💻</span>
            <h3>Software Development</h3>
            <p>1,250 Jobs</p>
          </div>

          <div className="category-card">
            <span>📊</span>
            <h3>Data & Analytics</h3>
            <p>850 Jobs</p>
          </div>

          <div className="category-card">
            <span>🎨</span>
            <h3>Design</h3>
            <p>620 Jobs</p>
          </div>

          <div className="category-card">
            <span>📈</span>
            <h3>Marketing</h3>
            <p>740 Jobs</p>
          </div>

        </div>

      </section>


      {/* Featured Jobs */}
      <section className="section featured-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              OPPORTUNITIES
            </span>

            <h2>
              Featured Jobs
            </h2>
          </div>

          <Link to="/jobs">
            View All Jobs →
          </Link>

        </div>


        <div className="jobs-grid">

          <div className="job-card">

            <div className="job-header">

              <div className="company-logo">
                T
              </div>

              <span className="job-type">
                Full Time
              </span>

            </div>

            <h3>Java Spring Boot Developer</h3>

            <p className="company-name">
              TechNova Solutions
            </p>

            <p className="job-location">
              📍 Bangalore, India
            </p>

            <div className="job-footer">

              <strong>₹6 - 10 LPA</strong>

              <Link to="/jobs">
                View →
              </Link>

            </div>

          </div>


          <div className="job-card">

            <div className="job-header">

              <div className="company-logo">
                A
              </div>

              <span className="job-type">
                Full Time
              </span>

            </div>

            <h3>React Frontend Developer</h3>

            <p className="company-name">
              Alpha Technologies
            </p>

            <p className="job-location">
              📍 Hyderabad, India
            </p>

            <div className="job-footer">

              <strong>₹5 - 9 LPA</strong>

              <Link to="/jobs">
                View →
              </Link>

            </div>

          </div>


          <div className="job-card">

            <div className="job-header">

              <div className="company-logo">
                C
              </div>

              <span className="job-type">
                Remote
              </span>

            </div>

            <h3>Full Stack Developer</h3>

            <p className="company-name">
              CloudWorks
            </p>

            <p className="job-location">
              📍 Remote
            </p>

            <div className="job-footer">

              <strong>₹7 - 12 LPA</strong>

              <Link to="/jobs">
                View →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* Why RecruitHub */}
      <section className="why-section">

        <div className="section-heading center">

          <span className="section-label">
            WHY RECRUITHUB
          </span>

          <h2>
            Everything You Need To Build Your Career
          </h2>

          <p>
            A complete platform connecting talented candidates
            with companies looking for great people.
          </p>

        </div>


        <div className="features">

          <div className="feature-card">

            <div className="feature-icon">
              🔎
            </div>

            <h3>Find Right Jobs</h3>

            <p>
              Search and discover opportunities that
              match your skills and career goals.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🏢
            </div>

            <h3>Top Companies</h3>

            <p>
              Connect with companies and organizations
              looking for talented professionals.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📋
            </div>

            <h3>Track Applications</h3>

            <p>
              Easily monitor your applications and
              stay updated throughout the hiring process.
            </p>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div>

          <h2>
            Ready To Find Your Dream Job?
          </h2>

          <p>
            Create your account today and start exploring
            new opportunities.
          </p>

        </div>

        <Link to="/register" className="cta-btn">
          Get Started →
        </Link>

      </section>

    </div>
  );
}

export default Home;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onEnquire, showNav = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        <div className="logo">
          <img src="/logo.png" alt="Yathirai InfoTech logo" />
          <span>Yathirai InfoTech</span>
        </div>

        <button
          className="menu-toggle"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <span aria-hidden="true">&#9776;</span>
        </button>

        <div className="topbar-actions">
          {showNav && (
            <>
              <Link to="/" className="course-nav-btn">Home</Link>
              <Link to="/courses" className="course-nav-btn">Courses</Link>
            </>
          )}
          <button
  className="talk-btn"
  onClick={() =>
    window.open(
      "https://wa.me/918807711644?text=Hi%20Yathirai%20InfoTech,%20I'm%20interested%20in%20your%20courses.%20Please%20share%20more%20details.",
      "_blank"
    )
  }
>
  Enquire Now
</button>
        </div>
      </header>

      {showNav && (
        <div
          className={`nav-overlay ${menuOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          onClick={() => setMenuOpen(false)}
        >
          <div className="nav-overlay-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-overlay"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">&#215;</span>
            </button>
            <nav>
              <Link to="/" className="course-nav-btn" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/courses" className="course-nav-btn" onClick={() => setMenuOpen(false)}>
                Courses
              </Link>
            </nav>
            <button
              className="talk-btn overlay-btn"
              onClick={() => {
                setMenuOpen(false);
                onEnquire();
              }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

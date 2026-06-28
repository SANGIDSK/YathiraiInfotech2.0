import React from 'react';
import { Link } from 'react-router-dom';

const COURSES = ['C', 'C++', 'Java', 'Python', 'UI/UX', 'Designing', 'Robotics'];

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Yathi-Rai/pfbid0bhniE9WhhuHVJqLEsy8iA4m7cZjeFdPLTeo4QfsnCmtA85swKBR3fqtw3KACX83sl/',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yathi-rai-3b6393372/',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/yathirai._official/',
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-wordmark" aria-label="Yathirai home">
            YATHIRAI
          </Link>
          <p>Empowering students for placements through practical learning, skill development, and focused guidance.</p>
        </div>

        <nav className="footer-column" aria-label="Footer navigation">
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
        </nav>

        <div className="footer-column">
          <h2>Courses</h2>
          <ul className="footer-inline-list">
            {COURSES.map(course => <li key={course}>{course}</li>)}
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h2>Contact</h2>
          <a href="mailto:yathirai.in@gmail.com">yathirai.in@gmail.com</a>
          <a href="tel:+918807711644">+91 88077 11644</a>
          <address>NSC Bose 2nd Cross Street,<br />Kavangarai, Chennai 600066</address>
          <nav className="footer-social-links" aria-label="Yathirai social media">
            {SOCIAL_LINKS.map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Yathirai InfoTech</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;

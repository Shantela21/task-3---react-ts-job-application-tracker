import React from 'react'

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`footer ${className || ''}`.trim()}>
      <div className="footer-content">
        <span className="footer-title">Job Application Tracker</span>
        <span className="footer-tagline">
          Track smarter, apply faster, succeed sooner.
        </span>
        <div className="footer-links">
          <a href="mailto:support@jobtracker.com" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms</a>
        </div>
        <span className="footer-copyright">
          &copy; {new Date().getFullYear()} Job Application Tracker. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

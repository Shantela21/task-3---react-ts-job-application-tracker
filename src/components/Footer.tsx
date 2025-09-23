import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Job Application Tracker</span>
        <span style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#e0e0e0' }}>
          Track smarter, apply faster, succeed sooner.
        </span>
        <div style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
          <a href="mailto:support@jobtracker.com" style={{ color: '#fff', textDecoration: 'underline', marginRight: 12 }}>Contact</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'underline', marginRight: 12 }}>Privacy Policy</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>Terms</a>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#bdbdbd' }}>
          &copy; {new Date().getFullYear()} Job Application Tracker. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

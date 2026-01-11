import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">🎬 MovieDB</div>
          <p className="footer-text">Discover. Watch. Remember.</p>
        </div>

        <div className="footer-right">
          <p>Built with ❤️ — Demo project</p>
          <p className="muted">© {new Date().getFullYear()} MovieDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

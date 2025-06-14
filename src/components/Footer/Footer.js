import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' }
  ];

  const quickLinks = [
    { name: 'Weather API', url: 'https://weatherapi.com' },
    { name: 'Privacy Policy', url: '#privacy' },
    { name: 'Terms of Service', url: '#terms' },
    { name: 'Support', url: '#support' }
  ];

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <div className="footer-logo">
              <span className="footer-logo-icon">🌤️</span>
              <span className="footer-logo-text">WeatherNow</span>
            </div>
            <p className="footer-description">
              Your reliable source for real-time weather information. 
              Stay informed, stay prepared.
            </p>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                >
                  <span className="social-icon">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-link-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section footer-info">
            <h3 className="footer-title">Weather Info</h3>
            <div className="weather-stats">
              <div className="stat-item">
                <span className="stat-icon">🌍</span>
                <div className="stat-content">
                  <div className="stat-label">Coverage</div>
                  <div className="stat-value">Global</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <div className="stat-content">
                  <div className="stat-label">Updates</div>
                  <div className="stat-value">Real-time</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <div className="stat-content">
                  <div className="stat-label">Accuracy</div>
                  <div className="stat-value">99.9%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section footer-contact">
            <h3 className="footer-title">Contact</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span className="contact-text">info@weathernow.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <span className="contact-text">www.weathernow.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <span>© {currentYear} WeatherNow. All rights reserved.</span>
            </div>
            <div className="attribution">
              <span>Powered by </span>
              <a 
                href="https://weatherapi.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="api-link"
              >
                WeatherAPI
              </a>
              <span> • Built with ❤️ using React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section">
        <h3 className="footer__section-title">About Us</h3>
        <p className="footer__section-description">
          Bookworm's Paradise is a family-owned bookstore dedicated to providing a diverse and curated collection of books for readers of all ages and interests.
        </p>
      </div>
      <div className="footer__section">
        <h3 className="footer__section-title">Careers</h3>
        <ul className="footer__links">
          <li><a href="/careers">Job Opportunities</a></li>
          <li><a href="/careers/internships">Internships</a></li>
        </ul>
      </div>
      <div className="footer__section">
        <h3 className="footer__section-title">Contact Us</h3>
        <p className="footer__section-description">
          123 Main Street<br />
          Booktown, CA 12345<br />
          Phone: (123) 456-7890<br />
          Email: info@bookwormsparadise.com
        </p>
      </div>
      <div className="footer__section">
        <h3 className="footer__section-title">Our Mission</h3>
        <p className="footer__section-description">
          Our mission is to foster a love of reading and provide a welcoming space for book enthusiasts to discover new literary treasures.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
// File: client/src/components/Footer.js
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <ul>
            <li>
              <Link to="https://www.facebook.com/" target='_blank'><FaFacebook /></Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/" target='_blank'><FaInstagram /></Link>
            </li>
            <li>
              <Link to="https://www.x.com/" target='_blank'><FaTwitter /></Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/" target='_blank'><FaYoutube /></Link>
            </li>
          </ul>
          <p>&copy; {new Date().getFullYear()} KIM Inventory Manager</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// File: client/src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <a href="https://www.facebook.com/" target='_blank'><img src="../assets/F1-facebook-logo.png" alt="facebook-logo" /></a>
      <a href="https://www.instagram.com/" target='_blank'><img src="../assets/F2-instagram-logo.png" alt='instagram-logo'></img></a>
      <a href="https://kaleab-teklemichael.netlify.app/" target='_blank'><img src="../assets/F3-app-logo.png" alt='app-logo'></img></a>
      <a href="https://x.com/" target='_blank'><img src="../assets/F4-x-logo.png" alt='x-logo'></img></a>
      <a href="https://www.youtube.com/" target='_blank'><img src="../assets/F5-youtube-logo.png" alt='youtube-logo'></img></a>

      <p>&copy; {new Date().getFullYear()} KIM Inventory Manager</p>
    </footer>
  );
};

export default Footer;

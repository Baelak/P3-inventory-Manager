// File: client/src/components/Footer.js
import React from 'react';
import facebookLogo from '../assets/footer/F1-facebook-logo.png';
import instagramLogo from '../assets/footer/F2-instagram-logo.png';
import appLogo from '../assets/footer/F3-app-logo.png';
import xLogo from '../assets/footer/F4-x-logo.png';
import youtubeLogo from '../assets/footer/F5-youtube-logo.png';

const Footer = () => {
  return (
    <footer>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        <img src={facebookLogo} alt="facebook-logo" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <img src={instagramLogo} alt="instagram-logo" />
      </a>
      <a href="https://kaleab-teklemichael.netlify.app/" target="_blank" rel="noopener noreferrer">
        <img src={appLogo} alt="app-logo" />
      </a>
      <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
        <img src={xLogo} alt="x-logo" />
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
        <img src={youtubeLogo} alt="youtube-logo" />
      </a>

      <p>&copy; {new Date().getFullYear()} KIM Inventory Manager</p>
    </footer>
  );
};

export default Footer;

// // File: client/src/components/Footer.js
// import React from 'react';
// import F2-instagram-logo from '/assets/'

// const Footer = () => {
//   return (
//     <footer>
//       <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
//         <img src="../assets/react.svg" alt="facebook-logo" />
//       </a>
//       <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
//         <img src="/images/footer/F2-instagram-logo.png" alt="instagram-logo" />
//       </a>
//       <a href="https://kaleab-teklemichael.netlify.app/" target="_blank" rel="noopener noreferrer">
//         <img src="/images/footer/F3-app-logo.png" alt="app-logo" />
//       </a>
//       <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
//         <img src="../assets/footer/F4-x-logo.png" alt="x-logo" />
//       </a>
//       <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
//         <img src="../assets/footer/F5-youtube-logo.png" alt="youtube-logo" />
//       </a>

//       <p>&copy; {new Date().getFullYear()} KIM Inventory Manager</p>
//     </footer>
//   );
// };

// export default Footer;
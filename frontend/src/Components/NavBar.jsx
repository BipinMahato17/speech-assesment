
import React from 'react';
import './NavBar.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <p className='appName'>VG Check</p>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/user/mylearning">My Reports</Link></li>
      </ul>
      <button className='Login'><Link className='Logintext' to="/login">Log in</Link></button>
    </nav>
  );
};

export default NavBar;

// import React, { useState } from 'react';
// import './NavBar.css'; // Import the CSS file for styling
// import { Link } from "react-router-dom";

// const NavBar = ({ loggedIn, handleLogout }) => {
//   return (
//     <nav>
//       <p className='appName'>VG Check</p>
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/mylearning">My Reports</Link></li>
//       </ul>
//       {/* Conditionally render Log in or Log out button */}
//       {loggedIn ? (
//         <button className='Login' onClick={handleLogout}>Log out</button>
//       ) : (
//         <button className='Login'><Link className='Logintext' to="/login">Log in</Link></button>
//       )}
//     </nav>
//   );
// };

// export default NavBar;


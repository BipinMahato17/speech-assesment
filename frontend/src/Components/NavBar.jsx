
import React from 'react';
import './NavBar.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";
import { isLoggedIn } from './authUtils';
// import Logout from './Logout';

const NavBar = () => {
  return (
    <nav>
      <p className='appName'>VG Check</p>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/user/mylearning">My Reports</Link></li>
      </ul>
      {console.log("is logged in", isLoggedIn())}
      {isLoggedIn()? <button key={isLoggedIn()}className='Login'><Link className='Logintext' to="/user/logout">Log Out</Link></button>:
      <button key={isLoggedIn()} className='LoginBtn'><Link className='Logintext' to="/login">Log in</Link></button>
  }
    </nav>
  );
};

export default NavBar;

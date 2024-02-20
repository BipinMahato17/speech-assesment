// NavBar.js
import React from 'react';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = ({ navigate }) => {
  return (
    <nav>
      <p className='appName'>Mahato Vai</p>
      <ul className="nav-links">
        <li onClick={() => navigate('home')}>Home</li>
        <li onClick={() => navigate('about')}>About</li>
        <li onClick={() => navigate('mylearning')}>My Learning</li>
      </ul>
      <button className='Login' onClick={() => navigate('login')}>Log in</button>
    </nav>
  );
};

export default NavBar;


// import React from 'react';
// import './NavBar.css'; // Import the CSS file for styling
// import { Link } from "react-router-dom";
// import { isLoggedIn } from './authUtils';
// import { useOktaAuth } from '@okta/okta-react';
// import { useHistory} from 'react-router-dom';
// // import Logout from './Logout';
// import {useState, useEffect} from 'react';

// const NavBar = () => {

// const [userLogegdIn, setUserLoggedIn]= useState(isLoggedIn());
// useEffect(() => {
//   const intervalId = setInterval(() => {
//     setUserLoggedIn(isLoggedIn());
//   }, 1000); // Check every second for changes in authentication status

//   return () => clearInterval(intervalId); // Cleanup on component unmount
// }, []);


//   return (
//     <nav>
//       <p className='appName'>VG Check</p>
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About Us</Link></li>
//         <li><Link to="/user/mylearning">My Reports</Link></li>
//       </ul>
//       {console.log("is logged in", isLoggedIn())}
//       {isLoggedIn()? <button key={isLoggedIn()}className='Login'><Link className='Logintext' to="/user/logout">Log out</Link></button>:
//       <button key={isLoggedIn()} className='Login'><Link className='Logintext' to="/login">Log in</Link></button>
//   }
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect } from 'react';
import './NavBar.css'; // Import the CSS file for styling
import { Link } from "react-router-dom";
import { isLoggedIn } from './authUtils';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoggedIn(isLoggedIn());
    }, 1000); // Check every second for changes in authentication status

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <nav>
      <p className='appName'>VG Check</p>
      <ul className="nav-links">
        <li><Link className='links' to="/">Home</Link></li>
        <li><Link className='links' to="/about">About Us</Link></li>
        <li><Link className='links' to="/user/mylearning">My Reports</Link></li>
      </ul>
      {console.log("is logged in", isLoggedIn())}
<<<<<<< HEAD
      <Link className='Login' to={loggedIn ? '/user/logout' : '/login'}>
        {loggedIn ? 'Log Out' : 'Log in'}
      </Link>
=======
      {isLoggedIn()? <button key={isLoggedIn()} className='Login' ><Link className='Logintext' to="/user/logout">Log Out</Link></button>:
      <button key={isLoggedIn()} className='LoginBtn'><Link className='Logintext' to="/login">Log in</Link></button>
  }
>>>>>>> final
    </nav>
  );
};

export default NavBar;

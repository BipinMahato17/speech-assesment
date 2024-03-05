// import React from 'react';
// import './Home.css'; 
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className='background-image'>
//       <div className='home-container'>
//       <div className='left-side'>
//         <h2 className='welcome-text'>Enhance Your Speaking Confidence in English </h2>
//         <p className='subtext'>"Grammar is the key to understanding. Expand your vocabulary, expand your world."</p>
//         <Link className='recording-link' to='/Login'>
//           Let's get started!
//         </Link>
//       </div>
//       {/* <div className="right-side">
//         <img src={Bipin} alt="bipin gandu" srcSet="" />
//       </div> */}
//     </div>
//     </div> 
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import { isLoggedIn } from './authUtils';

const Home = () => {
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Your authentication logic goes here
    // For example, check if the user is logged in from a previous session or via token
    const userIsLoggedIn = isLoggedIn(); // Implement this function

    // Update the isLoggedIn state
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <div className='background-image'>
      <div className='home-container'>
        <div className='left-side'>
          <h2 className='welcome-text'>Enhance Your Speaking Confidence in English</h2>
          <p className='subtext'>"Grammar is the key to understanding. Expand your vocabulary, expand your world."</p>
          <Link className='recording-link' to={(LoggedIn) ? '/user/recording' : '/login'}>
            {LoggedIn ? 'Let\'s talk!' : 'Let\'s get started!'}
          </Link>
        </div>
      </div>
    </div> 
  );
};

export default Home;

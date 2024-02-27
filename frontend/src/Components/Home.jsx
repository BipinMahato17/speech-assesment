import React from 'react';
import './Home.css'; 
import Bipin from '../assets/bipin.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='left-side'>
        <h2 className='welcome-text'>Welcome to our app</h2>
        <p className='subtext'>"Grammar is the key to understanding. Expand your vocabulary, expand your world."</p>
        <Link className='recording-link' to='/Recording'>
          Let's get started!
        </Link>
      </div>
      <div className="right-side">
        <img src={Bipin} alt="bipin gandu" srcSet="" />
      </div>
    </div>
  );
};

export default Home;

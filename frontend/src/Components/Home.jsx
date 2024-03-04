import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='background-image'>
      <div className='home-container'>
      <div className='left-side'>
        <h2 className='welcome-text'>Enhance Your Speaking Confidence in English </h2>
        <p className='subtext'>"Utilize an AI driven app for self-practicing everyday conversations in English."</p>
        <Link className='recording-link' to='/Login'>
          Let's get started!
        </Link>
      </div>
      {/* <div className="right-side">
        <img src={Bipin} alt="bipin gandu" srcSet="" />
      </div> */}
    </div>
    </div> 
  );
};

export default Home;

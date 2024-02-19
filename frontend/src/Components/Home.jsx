import React from 'react';
import './Home.css'; 
import Bipin from '../assets/bipin.jpg';

const Home = () => {
  return (
    <div className='container'>
      <div className='left-side'>
        <h2>Welcome to Home</h2>
        <button className='king'>START</button>
      </div>
      <div className="right-side">
        <img src={Bipin} alt="bipin gandu" srcset="" />
      </div>
    </div>
  );
};

export default Home;

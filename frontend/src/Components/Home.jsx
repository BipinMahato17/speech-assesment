import React from 'react';
import './Home.css'; 
import Bipin from '../assets/bipin.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <div className='left-side'>
        <h2>Welcome to Home</h2>
        <Link className='recording-link' to ='/Recording'>
Start
        {/* <button className='king'>START</button> */}
        </Link>
      
      </div>
      <div className="right-side">
        <img src={Bipin} alt="bipin gandu" srcset="" />
      </div>
    </div>
  );
};

export default Home;

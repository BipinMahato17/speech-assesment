import React from 'react';
import './About.css';
import soni_img from '../assets/bipin.jpg';
import bipin_img from '../assets/bipin.jpg';
import biwas_img from '../assets/bipin.jpg';
import ayush_img from '../assets/bipin.jpg';
// import '../assets/icon.png';

const About = () => {
  return (
    <>
    <div className='text'>
      <h2> <span class="bold">About</span> <span class="regular">US</span> </h2>
    </div>
    <div className='sub-header'>
      <span class="sub-header-text"> What is Speaking Evaluation </span>
    </div>
    <br/>
    <p>Speaking Evaluation is and AI-powered speaking assistant that 
      helps you practice English speaking and improve your communication
      skills by recording and AI-analyzing your speech -without a mentor.
    </p>
    <br/>
    <div className='text'>
      <span class="regular"> Our</span> <span class="bold">mission</span>
    </div>
    <br/>
    <div className='sub-header'>
      <span class="sub-header-text">To provide instructional 
      feedback to help learners progress  </span>
    </div>
    <br/>
    <p> English is the international language due to 
      widespread use.As non-native speakers, we have 
      struggled for many years to reach a sufficient level
      of speaking confidence. This is how we started Speech Evaluation
      with the belief inmind that there is a way to create a learning experience
      that would be accessible anytime and would bring dreastic results
      within just a couple of months.
      </p> 
      <br/>
      <p>By improving the fluency and grammar of user, we aim to 
        satisfied all our user.</p>
      <br/>
      <div className='sub-header'>
        <span class="sub-header-text"> Project members: </span>
      </div>

      <div className='image-gallery'>
      <div className='image-text-container'>
        <img src={ayush_img} alt="" className='round-image'/>
        <div class="icon"></div>
        <div className='text-below-image'>
          <p className='line1'> Ayush Khatri </p>
          <p className='line2'> PUR076BEI004 </p>
        </div>
      </div>

      <div className='image-text-container'>
        <img src={bipin_img} alt="" className='round-image'/>
        <div class="icon"></div>
        <div className='text-below-image'>
          <p className='line1'> Bipin Mahato </p>
          <p className='line2'> PUR076BEI007 </p>
        </div>
      </div>

      <div className='image-text-container'>
        <img src={biwas_img} alt="" className='round-image'/>
        <div class="icon"></div>
        <div className='text-below-image'>
          <p className='line1'> Biwas Shrestha </p>
          <p className='line2'> PUR076BEI013 </p>
        </div>
      </div>

      <div className='image-text-container'>
        <img src={soni_img} alt="" className='round-image'/>
        <div class="icon"></div>
        <div className='text-below-image'>
          <p className='line1'> Soni Dhakal </p>
          <p className='line2'> PUR076BEI048 </p>
        </div>
      </div>
      </div>
      <div className='full-width-container'>
      <div className='sub-header'>
      <span class="sub-header-text">Lets's talk! </span>
      </div>
      
      </div>
    </>
  );
};

export default About;

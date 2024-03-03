
// import React from 'react';
// import './About.css';
// import soniImg from '../assets/soni.jpg';
// import bipinImg from '../assets/bipin.jpg';
// import biwasImg from '../assets/biwas.jpg';
// import ayushImg from '../assets/ayush.jpg';
// import {Link} from react-router-dom;

// const About = () => {
//   return (
//     <div className='about-container'>
//      {/* <div className='about-section'>
//         <h2>About <span className="bold">US</span></h2>
//       </div>  */}

//       <div className='sub-header'>
//         <span className="sub-header-text">What is Language Refinement and Vocabulary Evaluation?</span>
//       </div>
//       <br />
//       <br/>
//       <p className='a'>Language Refinement and Vocabulary Evaluation is an AI-powered
//       speaking assistant that helps you practice English speaking and
//       improve your communication skills by evaluating vocabulary and 
//       check grammar of your speech.T5 model is used for grammar error
//       correction and BERT model is used for evaluating vocabulary.</p>

//       {/* <div className='about-section'> */}
//         {/* <span className="regular">Our</span> <span className="bold">mission</span>
//       </div>
//       <br/>
//       <br/>
//       <ul>
//         <li className='a'>To evaluate grammar and vocabulary of speech.</li>
//         <li className='a'>To provide feedback to users for their self-improvement</li>
//       </ul> */}

//       <div className='sub-header'>
//         <span className="sub-header-text">Project members:</span>
//       </div>
//       <br/>
//       <br/>
//       <div className='image-gallery'>
//         <div className='image-text-container'>
//           <img src={ayushImg} alt="Ayush Khatri" className='round-image'/>
//           <div className="icon"></div>
//           <div className='text-below-image'>
//             <p className='line1'>Ayush Khatri</p>
//             <p className='line2'>PUR076BEI004</p>
//           </div>
//         </div>

//         <div className='image-text-container'>
//           <img src={bipinImg} alt="Bipin Mahato" className='round-image'/>
//           <div className="icon"></div>
//           <div className='text-below-image'>
//             <p className='line1'>Bipin Mahato</p>
//             <p className='line2'>PUR076BEI007</p>
//           </div>
//         </div>

//         <div className='image-text-container'>
//           <img src={biwasImg} alt="Biwas Shrestha" className='round-image'/>
//           <div className="icon"></div>
//           <div className='text-below-image'>
//             <p className='line1'>Biwas Shrestha</p>
//             <p className='line2'>PUR076BEI013</p>
//           </div>
//         </div>

//         <div className='image-text-container'>
//           <img src={soniImg} alt="Soni Dhakal" className='round-image'/>
//           <div className="icon"></div>
//           <div className='text-below-image'>
//             <p className='line1'>Soni Dhakal</p>
//             <p className='line2'>PUR076BEI048</p>
//           </div>
//         </div>
//       </div>

//       <div className='full-width-container'>
//       <Link className='recording-link' to='/Recording'>
//           Let's talk!
//         </Link>
          
//         </div>
//       </div>
//   </div>
  
// };

// export default About;
import React from 'react';
import './About.css';
import soniImg from '../assets/soni.jpg';
import bipinImg from '../assets/bipin11.jpg';
import biwasImg from '../assets/biwas.jpg';
import ayushImg from '../assets/ayush.jpg';
import { Link } from 'react-router-dom'; // Fixed import statement

const About = () => {
  return (
    <div className='about-container'>
      {/* <div className='about-section'>
        <h2>About <span className="bold">US</span></h2>
      </div>  */}

      <div className='sub-header'>
        <span className="sub-header-text">What is Language Refinement and Vocabulary Evaluation?</span>
      </div>
      <br />
      <br />
      <p className='a'>Language Refinement and Vocabulary Evaluation is an AI-powered
      speaking assistant that helps you practice English speaking and
      improve your communication skills by evaluating vocabulary and 
      check grammar of your speech.T5 model is used for grammar error
      correction and BERT model is used for evaluating vocabulary.</p>

      {/* <div className='about-section'> */}
      {/* <span className="regular">Our</span> <span className="bold">mission</span>
      </div>
      <br/>
      <br/>
      <ul>
        <li className='a'>To evaluate grammar and vocabulary of speech.</li>
        <li className='a'>To provide feedback to users for their self-improvement</li>
      </ul> */}

      <div className='sub-header'>
        <span className="sub-header-text">Project members:</span>
      </div>
      <br />
      <br />
      <div className='image-gallery'>
        <div className='image-text-container'>
          <img src={ayushImg} alt="Ayush Khatri" className='round-image' />
          <div className="icon"></div>
          <div className='text-below-image'>
            <p className='line1'>Ayush Khatri</p>
            <p className='line2'>PUR076BEI004</p>
          </div>
        </div>

        <div className='image-text-container'>
          <img src={bipinImg} alt="Bipin Mahato" className='round-image' />
          <div className="icon"></div>
          <div className='text-below-image'>
            <p className='line1'>Bipin Mahato</p>
            <p className='line2'>PUR076BEI011</p>
          </div>
        </div>

        <div className='image-text-container'>
          <img src={biwasImg} alt="Biwas Shrestha" className='round-image' />
          <div className="icon"></div>
          <div className='text-below-image'>
            <p className='line1'>Biwas Shrestha</p>
            <p className='line2'>PUR076BEI013</p>
          </div>
        </div>

        <div className='image-text-container'>
          <img src={soniImg} alt="Soni Dhakal" className='round-image' />
          <div className="icon"></div>
          <div className='text-below-image'>
            <p className='line1'>Soni Dhakal</p>
            <p className='line2'>PUR076BEI048</p>
          </div>
        </div>
      </div>

      {/* <div className='full-width-container'>
        <Link className='rec' to='/Recording'>
          Let's talk!
        </Link>
      </div> */}
    </div>
  );
};

export default About;

// // import React from 'react';
// import { Link } from 'react-router-dom';

// function Output() {
//   const containerStyle = {
//     textAlign: 'center', // Align text and sections to the center
//   };

//   const sectionStyle = {
//     display: 'block',
//     width: '34%',
//     textDecoration: 'none',
//     cursor: 'pointer',
//     border: 'none',
//     backgroundColor: 'rgb(70, 70, 206)',
//     borderRadius: '20px',
//     padding: '10px',
//     color: 'white',
//     fontSize: '20px',
//     marginTop: '20px',
//   };

//   return (
//     <div className="output-container" style={containerStyle}>
//       <div className="section">
//         {/* Link to Speech to text component */}
//         <Link to="/speech-to-text" style={sectionStyle}>
//           <h2>Speech to text</h2>
//         </Link>
//       </div>
//       <div className="section">
//         {/* Link to Grammar component */}
//         <Link to="/grammar" style={sectionStyle}>
//           <h2>Grammar</h2>
//         </Link>
//       </div>
//       <div className="section">
//         {/* Link to Vocabulary component */}
//         <Link to="/vocabulary" style={sectionStyle}>
//           <h2>Vocabulary</h2>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Output;
import React from 'react';
import { Link } from 'react-router-dom';
import Grammar from './Grammar';

function Output() {
  const containerStyle = {
    textAlign: 'center', // Align text and sections to the center


};

  const sectionStyle = {
    display: 'inline-block', // Display sections in line
    width: '30%', // Adjust the width to your preference
    margin: '10px', // Add margin between sections
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'rgb(70, 70, 206)',
    borderRadius: '20px',
    padding: '10px',
    color: 'white',
    fontSize: '20px',
  };

  return (
    <div className="output-container" style={containerStyle}>
      <div className="section">
        {/* Link to Speech to text component
        <Link to="/user/speech-to-text" style={sectionStyle}>
          <h2>Speech to text</h2>
        </Link> */}
        <Grammar/>
      </div>
      
      {/* <div className="section">
        {/* Link to Vocabulary component */}
        {/* <Link to="/user/vocabulary" style={sectionStyle}>
          <h2>Vocabulary</h2>
        </Link>
      // </div> */} 
    </div>
  );
}

export default Output;

// import React from 'react';
// import { CircularProgress } from '@mui/material';
// import './Submitting.css'; // Import the CSS file

// function Submit() {
//   return (
//     //<div>
//     <div style={{ marginTop: '100px', textAlign: 'center' }}>
//       <div >
//         <CircularProgress size= {75} /> {/* Loader spinner */}
//         <h1 className="text">Please wait, analyzing your results<span className="dot-animation"></span></h1>
//       </div>
//       {/* You can add additional content or logic here if needed */}
//     </div>
//   );
// }

// export default Submit;
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import './Submitting.css'; // Import the CSS file
import Output from './Output'; // Import the Output component


function Submit() {
  // const [showOutput, setShowOutput] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowOutput(true);
  //   }, 10000); // 4 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // Render nothing if showOutput is false
  // if (!showOutput) {
    return (
      <div style={{ marginTop: '100px', textAlign: 'center' }}>
        <div>
          <CircularProgress size={75} /> {/* Loader spinner */}
          <h1 className="text">Please wait, analyzing your results<span className="dot-animation"></span></h1>
        </div>
      </div>
    );
  // }

  // // Render the Output component when showOutput is true
  // return <Output />;
}

export default Submit;

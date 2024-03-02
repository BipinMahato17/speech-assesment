
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Vocabulary() {
//   const containerStyle = {
//     textAlign: 'center', // Center align the bullets
//     position: 'relative', // Positioning for the Link
//   };

//   const ulStyle = {
//     display: 'inline-block', // Make the ul inline-block
//     textAlign: 'left', // Align list items to the left
//     paddingInlineStart: 0, // Remove default padding
//     listStylePosition: 'inside', // Place bullets inside list items
//   };

//   const liStyle = {
//     margin: '10px 0', // Add margin between list items
//   };

//   const linkStyle = {
//     position: 'absolute', // Positioning for the Link
//     bottom: '10px', // Distance from the bottom
//     right: '10px', // Distance from the right
//     textDecoration: 'none', // Remove default text decoration
//     color: 'blue', // Link color
//     fontSize: '16px', // Font size
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Vocabulary Grading:</h2>
//       {/* Add your content here */}
//       <p>
//         <ul style={ulStyle}>
//           <li style={liStyle}>You have 10 C1 level words.</li>
//           <li style={liStyle}>You have 15 C2 level words.</li>
//           <li style={liStyle}>You have 7 B2 level words.</li>
//           <li style={liStyle}>You have 5 B1 level words.</li>
//           <li style={liStyle}>You have 16 A2 level words.</li>
//           <li style={liStyle}>You have 3 A1 level words.</li>
//         </ul>
//       </p>
//       <br />
//       <hr />
//       Our model predicts our vocabulary level is near B2 level.
//       <br />
//       <Link to="/output" style={linkStyle}>Return </Link>
//     </div>
//   );
// }

// export default Vocabulary;
import React from 'react';
import { Link } from 'react-router-dom';

function Vocabulary() {
  const containerStyle = {
    textAlign: 'center', // Center align the bullets
    position: 'relative', // Positioning for the container
    minHeight: '100vh', // Ensure the container fills the viewport height
  };

  const ulStyle = {
    display: 'inline-block', // Make the ul inline-block
    textAlign: 'left', // Align list items to the left
    paddingInlineStart: 0, // Remove default padding
    listStylePosition: 'inside', // Place bullets inside list items
  };

  const liStyle = {
    margin: '10px 0', // Add margin between list items
  };

  const linkStyle = {
    position: 'absolute', // Positioning for the link
    bottom: '10px', // Distance from the bottom
    right: '10px', // Distance from the right
    textDecoration: 'none', // Remove default text decoration
    color: 'blue', // Link color
    fontSize: '16px', // Font size
  };

  return (
    <div style={containerStyle}>
      <h2>Vocabulary Grading:</h2>
      {/* Add your content here */}
      <p>
        <ul style={ulStyle}>
          <li style={liStyle}>You have 10 C1 level words.</li>
          <li style={liStyle}>You have 15 C2 level words.</li>
          <li style={liStyle}>You have 7 B2 level words.</li>
          <li style={liStyle}>You have 5 B1 level words.</li>
          <li style={liStyle}>You have 16 A2 level words.</li>
          <li style={liStyle}>You have 3 A1 level words.</li>
        </ul>
      </p>
      <br />
      <hr />
      Our model predicts our vocabulary level is near B2 level.
      <br />
      <Link to="/output" style={linkStyle}>Return</Link>
    </div>
  );
}

export default Vocabulary;

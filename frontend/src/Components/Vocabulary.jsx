
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
import { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';

function Vocabulary() {
  const location = useLocation();
  
  const [transcribedText, setTranscribedText] = useState('');
  const [correctedSentence, setCorrectedSentence] = useState('');
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/recorder/list-recorders/');
        console.log(response.data[0]['transcribed_text']);
        setTranscribedText(response.data[0]['transcribed_text']);
        setCorrectedSentence(response.data[0]['corrected_sentence']);
      }
      catch (error){
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    return () => {
      console.log("Data fetched ...");
    }
  }, []);

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

  const textbox = {
    border: '1px solid #000000',
    borderRadius: '5px', // Corrected property name to camelCase
    padding: '20px',
    margin: '10px',
    maxWidth: '600px',
    fontSize: '16px',
    color: 'rgb(98, 160, 5)', // Corrected property name to camelCase
};

  console.log("HERE FROM THE VOCABULARY")


  return (
    <div style={containerStyle}>
      <h2>Vocabulary Grading:</h2>
      <div style={textbox}><p>{transcribedText}</p></div>
      <h1>you have total of {location.state.data['wordlist'].length} words.</h1>
      <p>
        <ul style={ulStyle}>
          <li style={liStyle}>You have {location.state.data['C1_list'].length} C1 level words.</li>
          <li style={liStyle}>You have {location.state.data['C2_list'].length} C2 level words.</li>
          <li style={liStyle}>You have {location.state.data['B2_list'].length} B2 level words.</li>
          <li style={liStyle}>You have {location.state.data['B1_list'].length} B1 level words.</li>
          <li style={liStyle}>You have {location.state.data['A2_list'].length} A2 level words.</li>
          <li style={liStyle}>You have {location.state.data['A1_list'].length} A1 level words.</li>
        </ul>
      </p>
      <br />
      <hr />
      Our model predicts our vocabulary level is near B2 level.
      <br />
      <Link to="/user/output" style={linkStyle}>Return</Link>
    </div>
  );
}

export default Vocabulary;

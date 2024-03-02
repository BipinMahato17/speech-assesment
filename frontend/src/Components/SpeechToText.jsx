// import React from 'react';
// import './SpeechToText.css'; // Import the CSS file for styling

// import { Link } from 'react-router-dom';

// function SpeechToText() {
//   return (


//     <div className="speech-to-text-container">
//       <div className="text-box">
//       <h2>Your transcribed text is :</h2>
//     <p>Hello,Good morning.Today me is at IOE Eastern Regional Campus in Dharan.
//        We will be presenting our major project presentation today.
//          We was going to demonstrate about Grammare Error correction Model.
//         The sentence I is speak and incorrect.
//         But thanks,model is generate correct sentence.
//          I hope this will help me 
//         identify my weakness and improve my English, Thank you.
//       </p>
//       </div>

//       <Link to="/output">Return</Link>
//     </div>
//   );
// }

// export default SpeechToText;
import React from 'react';
import './SpeechToText.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

function SpeechToText() {
  const [transcribedText, setTranscribedText] = useState('');
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/recorder/list-recorders/');
        console.log(response.data[0]['transcribed_text']);
        setTranscribedText(response.data[0]['transcribed_text']);
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


function SpeechToText() {
  return (
    <div className="speech-to-text-container">
      <div className="text-box">
        <h2>Your transcribed text is :</h2>

        <p>{transcribedText}</p>

      </div>
      <div className="return-link">
        <Link to="/output">Return</Link>
      </div>
    </div>
  );
}



export default SpeechToText;


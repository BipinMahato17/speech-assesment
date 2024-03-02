// // Grammar.jsx
// import React from 'react';

// function Grammar() {
//   return (
//     <div>
//       <h2>Your transcribed text is :</h2>
//      <p>Hello,Good morning.Today me is at IOE Eastern Regional Campus in Dharan.We will be presenting our major project presentation today.
//         We was going to demonstrate about Grammare Error correction Model.
//         The sentence I is speak and incorrect.But thanks,model is generate correct sentence. I hope this will help me 
//         identify my weakness and improve my English, Thank you.
//      </p>


//      <br>
//      </br>

//      <div>

//         <h2>Grammatically correct text:</h2>
//      <p>

//      Hello, Good morning. Today I am at the IOE Eastern Regional Campus in Dharan. We will be presenting our major project presentation today. We were going to demonstrate the grammar error correction model. The sentence I speak is incorrect. But thanks, the model generated the correct sentence. I hope this will help me identify my weaknesses and improve my English. Thank you.
//      </p>
     
//      </div>
//     </div>
//   );
// }

// export default Grammar;
import React from 'react';
import './Grammar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Grammar() {

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


  return (
    <div className="grammar-container">
      <div className="text-box">
        <h2>Transcribed Text:</h2>
        <p>{transcribedText}</p>
      </div>

      <br />

      <div className="text-box">
        <h2>Grammatically Corrected Text:</h2>
        <p>{correctedSentence}</p>
      </div>
      <Link clasName="return-show" to="/output">Return</Link>
    </div>
  );
}

export default Grammar;

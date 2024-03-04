
// import React from 'react';
// import './Grammar.css'; // Import the CSS file for styling
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function Grammar() {

//   const [transcribedText, setTranscribedText] = useState('');
//   const [correctedSentence, setCorrectedSentence] = useState('');
//   useEffect(() => {
//     const fetchData = async () =>{
//       try{
//         const response = await axios.get('http://127.0.0.1:8000/recorder/list-recorders/');
//         console.log(response.data[0]['transcribed_text']);
//         setTranscribedText(response.data[0]['transcribed_text']);
//         setCorrectedSentence(response.data[0]['corrected_sentence']);
//       }
//       catch (error){
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//     return () => {
//       console.log("Data fetched ...");
//     }
//   }, []);

//   // Function to compare the transcribed text and corrected sentence
//   // and apply different color to corrected words
//   const renderCorrectedText = () => {
//     if (!transcribedText || !correctedSentence) return null;

//     const transcribedWords = transcribedText.split(' ');
//     const correctedWords = correctedSentence.split(' ');
    
//     const max_length = transcribedWords.length > correctedWords.length ? transcribedWords.length : correctedWords.length;
//     const highlighted = [];

//     for (let i = 0; i < max_length; i++) {
//       if (transcribedWords[i] !== correctedWords[i]) {
//         // Check if the difference is due to a missing word in the corrected sentence
//         const nextCorrectedWord = correctedWords[i + 1];
//         if (nextCorrectedWord && transcribedWords[i] === nextCorrectedWord) {
//           highlighted.push(correctedWords[i]);
//         }
//         // const prevTranscribedWord = transcribedWords[i-1];
//         // if (prevTranscribedWord && correctedWords[i] === prevTranscribedWord){
//         //   highlighted.pop(correctedWords[i]);
//         // }
//       }
//     }
//     console.log(highlighted);
//     return transcribedWords.map((word, index) => {
//       const corrected = word !== correctedWords[index];
//       return (
//         <span key={index} className={corrected ? 'corrected-word' : ''}>
//           {corrected ? correctedWords[index] : word}{' '}
//         </span>
//       );
//     }
//     );
//   };

//   // const highlightCorrectedWords = (transcribedText, correctedSentence) => {
//   //   const transcribedWords = transcribedText.split(' ');
//   //   const correctedWords = correctedSentence.split(' ');

    
//   //   const highlighted = [];
//   //   for (let i = 0; i < transcribedWords.length; i++) {
//   //     if (transcribedWords[i] !== correctedWords[i]) {
//   //       highlighted.push(i);
//   //     }
//   //   }
//   //   setHighlightedWords(highlighted);
//   // };

//   return (
//     <div className="grammar-container">
//       <div className="text-box">
//         <h2>Transcribed Text:</h2>
//         <p>{transcribedText}</p>
//       </div>

//       <br />

//       <div className="text-box">
//         <h2>Grammatically Corrected Text:</h2>
//         <p>{renderCorrectedText()}</p>
//       </div>
//       <Link clasName="return-show" to="/user/output">Return</Link>
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

  // Function to compare the transcribed text and corrected sentence
  // and apply different color to corrected words
  const renderCorrectedText = () => {
    if (!transcribedText || !correctedSentence) return null;

    const transcribedWords = transcribedText.split(' ');
    const correctedWords = correctedSentence.split(' ');
    
    const max_length = transcribedWords.length > correctedWords.length ? transcribedWords.length : correctedWords.length;
    const highlighted = [];

    for (let i = 0; i < max_length; i++) {
      if (transcribedWords[i] !== correctedWords[i]) {
        // Check if the difference is due to a missing word in the corrected sentence
        const nextCorrectedWord = correctedWords[i + 1];
        if (nextCorrectedWord && transcribedWords[i] === nextCorrectedWord) {
          highlighted.push(correctedWords[i]);
        }
      }
    }

    return transcribedWords.map((word, index) => {
      const corrected = word !== correctedWords[index];
      return (
        <span key={index} className={corrected ? 'corrected-word' : ''}>
          {corrected ? correctedWords[index] : word}{' '}
        </span>
      );
    });
  };

  return (
    <div className="grammar-container">
      <div className="text-boxes transcribed-text-animation">
        <h2>Transcribed Text:</h2>
        <p>{transcribedText}</p>
      </div>

      <br />

      <div className="text-boxes corrected-text-animation">
        <h2>Grammatically Corrected Text:</h2>
        <p>{correctedSentence}</p>
      </div>
      {/* <Link className="return-show" to="/user/output">Return</Link> */}
    </div>
  );
}

export default Grammar;

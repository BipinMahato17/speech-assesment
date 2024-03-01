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

function SpeechToText() {
  return (
    <div className="speech-to-text-container">
      <div className="text-box">
        <h2>Your transcribed text is :</h2>
        <p>Hello,Good morning.Today me is at IOE Eastern Regional Campus in Dharan.
           We will be presenting our major project presentation today.
           We was going to demonstrate about Grammare Error correction Model.
           The sentence I is speak and incorrect.
           But thanks,model is generate correct sentence.
           I hope this will help me identify my weakness and improve my English, Thank you.
        </p>
      </div>
      <div className="return-link">
        <Link to="/output">Return</Link>
      </div>
    </div>
  );
}

export default SpeechToText;


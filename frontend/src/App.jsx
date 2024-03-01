// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from './Components/Home';
// import About from './Components/About';
// import MyLearning from './Components/MyLearning';
// import NavBar from './Components/NavBar';
// import LogIn from './Components/Login';
// import SoundRecorder from './Components/SoundRecorder';
// import Submit from './Components/Submit'; // Import the Submit component
// import './App.css'; // Import the CSS file for styling

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <NavBar />
//         <div className="section-container">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/mylearning" element={<MyLearning />} />
//             <Route path="/login" element={<LogIn />} />
//             <Route path="/recording" element={<SoundRecorder />} />
//             <Route path="/submit" element={<Submit />} /> {/* Route for the Submit component */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import MyLearning from './Components/MyLearning';
import NavBar from './Components/NavBar';
import LogIn from './Components/Login';
import SoundRecorder from './Components/SoundRecorder';
import Submit from './Components/Submit'; // Import the Submit component
import Output from './Components/Output'; // Import the Output component
import SpeechToText from './Components/SpeechToText';
import Grammar from './Components/Grammar';
import Vocabulary from './Components/Vocabulary';

import './App.css'; // Import the CSS file for styling

function App() {
  const [redirectToOutput, setRedirectToOutput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirectToOutput(true);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="section-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mylearning" element={<MyLearning />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/recording" element={<SoundRecorder />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/output" element={<Output />} />

            <Route path="/speech-to-text" element={<SpeechToText />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/vocabulary" element={<Vocabulary />} />


          </Routes>
          {/* {redirectToOutput && <Navigate to="/output" replace />} Redirect to Output after 4 seconds */}
        </div>
      </div>
    </Router>
  );
}

export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';

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
import Logout from './Components/Logout';
import FinalResult from './Components/FinalResult';

import './App.css'; // Import the CSS file for styling
import PrivateRoutes from './Components/PrivateRoutes';

function App() {
  const [redirectToOutput, setRedirectToOutput] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            {/* <Route path="/about" element={<About />} />
          
            <Route path="/login" element={<LogIn />} /> */}
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
{/*           
            <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} /> */}
          
            

          

          <Route path="/user" element={<PrivateRoutes />} >
          
          {/* <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} /> */}
              <Route path="vocabulary" element={<Vocabulary />} />
              <Route path="logout" element={<Logout />} />
              <Route path="output" element={<Output />} />
              <Route path="submit" element={<Submit />} />
              <Route path="recording" element={<SoundRecorder />} />
              <Route path="mylearning" element={<MyLearning />} />
              <Route path="result" element={<FinalResult />} />
              
              <Route path="speech-to-text" element={<SpeechToText />} />
             <Route path="grammar" element={<Grammar />} />
            </Route>


          </Routes>
          {/* {redirectToOutput && <Navigate to="/output" replace />} Redirect to Output after 4 seconds */}
        </div>
      </div>
    </Router>
  );
}

export default App;


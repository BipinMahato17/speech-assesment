// App.js
import React, { useState } from 'react';
import Home from './Components/Home';
import About from './Components/About';
import MyLearning from './Components/MyLearning';
import NavBar from './Components/NavBar';
import LogIn from './Components/Login'
import SoundRecorder from './Components/SoundRecorder'
import './App.css'; // Import the CSS file for styling
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// function App() {
//   const [section, setSection] = useState('home');

//   const navigate = (section) => {
//     setSection(section);
//   };

//   const renderSection = () => {
//     switch (section) {
//       case 'home':
//         return <Home />;
//       case 'about':
//         return <About />;
//       case 'mylearning':
//         return <MyLearning />;
//       case 'login':
//         return <LogIn/>;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <div className="App">
//       <NavBar navigate={navigate} />
//       <div className="section-container">
//         {renderSection()}
//       </div>
//     </div>
//   );
// }

function App() {
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

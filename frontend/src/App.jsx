// App.js
import React, { useState } from 'react';
import Home from './Components/Home';
import About from './Components/About';
import MyLearning from './Components/MyLearning';
import NavBar from './Components/NavBar';
import LogIn from './Components/Login'
import './App.css'; // Import the CSS file for styling

function App() {
  const [section, setSection] = useState('home');

  const navigate = (section) => {
    setSection(section);
  };

  const renderSection = () => {
    switch (section) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'mylearning':
        return <MyLearning />;
      case 'login':
        return <LogIn/>;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <NavBar navigate={navigate} />
      <div className="section-container">
        {renderSection()}
      </div>
    </div>
  );
}

export default App;

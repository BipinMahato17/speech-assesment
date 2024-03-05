
import React from 'react';
import { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import './Vocabulary.css';
import Grammar from './Grammar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Vocabulary() {
  const location = useLocation();
  const data = location.state.data;
  const [transcribedText, setTranscribedText] = useState('');
  const [correctedSentence, setCorrectedSentence] = useState('');
  const [width, setWidth] = useState({
    a1width: 0,
    a2width: 0,
    b1width: 0,
    b2width: 0,
    c1width: 0,
    c2width: 0,
  });

  

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

  const calcWidth = (data) => {
    const wordlist = data['unique_wordlist'].length;
    const A1 = data['A1_list'].length;
    const A2 = data['A2_list'].length;
    const B1 = data['B1_list'].length;
    const B2 = data['B2_list'].length;
    const C1 = data['C1_list'].length;
    const C2 = data['C2_list'].length;
    
    const a1width = Math.floor((A1/wordlist)*100);
    const a2width = Math.floor((A2/wordlist)*100);
    const b1width = Math.floor((B1/wordlist)*100);
    const b2width = Math.floor((B2/wordlist)*100);
    const c1width = Math.floor((C1/wordlist)*100);
    const c2width = Math.floor((C2/wordlist)*100);

    setWidth({
      a1width,
      a2width,
      b1width,
      b2width,
      c1width,
      c2width,
    });
  };

  const colors = ['#66ff66','#99ff33','#ffff33','#ffb366','#ff5c33','#ff1a1a'];
  const getWordColor = (word, data) => {
    const wordlists = [
      data['A1_list'],
      data['A2_list'],
      data['B1_list'],
      data['B2_list'],
      data['C1_list'],
      data['C2_list']
    ];

    console.log("we are here",wordlists[1]);
    for (let i = 0; i<data['wordlist'].length; i++){
      console.log("we are inside the loop", wordlists[i], word)
      console.log(word)


      if (wordlists[i].includes(word.toLowerCase())){
        console.log("from inside if statement",wordlists[i]);
        return colors[i % colors.length];
      }
    }
    return ' ';
  }
  
  const renderColoredText = (text) => {
    console.log(text)
    const text1 = text.replace(/[!"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '');
    console.log("chalena",text1)
    const words = text1.split(' ');
    const pword = text.split(' ');
    console.log("from render colored text",words);

    return words.map((word, index) => {
      console.log(data);
      console.log("hello",word);
      const color = getWordColor(word, data);
      console.log(color);
      return <span key={index} id={index} style={{ color }}>{pword[index] +' '}</span>;

    });

  };

  const containerStyle = {
    textAlign: 'center', // Center align the bullets
    position: 'relative', // Positioning for the container
    minHeight: '100vh', // Ensure the container fills the viewport height
  };

  const mainContent = {
    display: 'flex', 
    margin: '5px auto',
    justifyContent: 'space-around',
  }


  const linkStyle = {
    position: 'absolute', // Positioning for the link
    bottom: '10px', // Distance from the bottom
    right: '10px', // Distance from the right
    textDecoration: 'none', // Remove default text decoration
    color: 'blue', // Link color
    fontSize: '16px', // Font size
  };



  console.log("HERE FROM THE VOCABULARY")
    // Call calcWidth when the component mounts or when data changes
    React.useEffect(() => {
      calcWidth(data);
    }, [data]);


  return (
    <div style={containerStyle}>
      <h1>You have total of {location.state.data["wordlist"].length} words.</h1>
      <Grammar/>
      <h2>Vocabulary Grading:</h2>
      
      <div style={mainContent}>
      {transcribedText && (<div className='textbox transcribed-text-animation'><p>{renderColoredText(transcribedText)}</p></div>
)}
   
        
      
      <div className='analysis corrected-text-animation'>
        <h4>English Words Predicted CEFR</h4>
        <div className='skill'>
          <p className='namelist'>A1</p>
          <p>{width.a1width}%</p>
          <div className='skillbar'>
            <div className='skill-level' style={{width: `${width.a1width}%`, backgroundColor: '#66ff66', borderRadius: '4px'}}></div>
          </div>
        </div>
        <div className='skill'>
        <p className='namelist'>A2</p>
          <p>{width.a2width}%</p>
          <div className='skillbar'>
            <div className='skill-level' style={{width: `${width.a2width}%`, backgroundColor: '#99ff33', borderRadius: '4px'}}></div>
          </div>
        </div>
        <div className='skill'>
        <p className='namelist'>B1</p>
          <p>{width.b1width}%</p>
          <div className='skillbar'>
            <div className='skill-level' style={{width: `${width.b1width}%`, backgroundColor: '#ffff33', borderRadius: '4px'}}></div>
          </div>
        </div>
        <div className='skill'>
        <p className='namelist'>B2</p>
          <p>{width.b2width}%</p>
          <div className='skillbar'>
            <div className='skill-level' style={{width: `${width.b2width}%`, backgroundColor: '#ffb366', borderRadius: '4px'}}></div>
          </div>
        </div>
        <div className='skill'>
        <p className='namelist'>C1</p>
          <p>{width.c1width}%</p>
          <div className='skillbar'>
            <div className='skill-level' style={{width: `${width.c1width}%`, backgroundColor: '#ff5c33', borderRadius: '4px'}}></div>
          </div>
        </div>
        <div className='skill'>
        <p className='namelist'>C2</p>
          <p className='namelistper'>{width.c2width}%</p>
          <div className='skillbar'>
            <div className='skill-level' style={{width: `${width.c2width}%`, backgroundColor: '#ff1a1a', borderRadius: '4px'}}></div>
          </div>
        </div>
      </div>
      </div>
      
      {/* <Link to="/user/output" style={linkStyle}>
        Return
      </Link> */}
    </div>
  );
}

export default Vocabulary;

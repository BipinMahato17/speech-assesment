
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
  const pathname = location.pathname;
  console.log(pathname)
  const parts = pathname.split('/');
  const numberPart = parts[parts.length - 1];
// console.log(numberPart)
// Parse the number part as an integer
const vocabularyId = parseInt(numberPart);

  // const data = location.state.data;
  const [vocab, setVocab] = useState("")
  // console.log(data)
  const [transcribedText, setTranscribedText] = useState('');
  const [correctedSentence, setCorrectedSentence] = useState('');
  const [timeDuration, setTimeDuration] = useState("");
  let audio_path = "";
  const [width, setWidth] = useState({
    a1width: 0,
    a2width: 0,
    b1width: 0,
    b2width: 0,
    c1width: 0,
    c2width: 0,
  });

  //FOR VOCABULARY  
 
  
  // let wordlist = vocab.wordlist
  // console.log("wo list ", wordlist)
  // wordlist = wordlist.split(', ')
  

  

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/recorder/list-recorders/'+vocabularyId);
        console.log("Transcribed text ======== ",response.data['transcribed_text']);
        setTimeDuration(response.data['audio_file']);
        setTranscribedText(response.data['transcribed_text']);
        setCorrectedSentence(response.data['corrected_sentence']);
        audio_path = "http://127.0.0.1:8000"+response.data['audio_file'];
        // console.log(audio_path);

        const response2 = await axios.get('http://127.0.0.1:8000/recorder/vocabulary/'+vocabularyId);
        setVocab(response2.data)
        // console.log("response2 data ====", response2.data)


        
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

  console.log("From vocabulary output wordlist ",  vocab.wordlist)
  let wordlist = vocab.wordlist;
  let unique_wordlist = vocab.unique_wordlist;
  let extracted_idioms = vocab.extracted_idioms;
  let a1_list = vocab.a1_list;
  let a2_list = vocab.a2_list;
  let b1_list = vocab.b1_list;
  let b2_list = vocab.b2_list;
  let c1_list = vocab.c1_list;
  let c2_list = vocab.c2_list;
  if(vocab) {

    wordlist = wordlist.split(', ')
    unique_wordlist = unique_wordlist.split(', ')
    extracted_idioms = extracted_idioms.split(', ')
    a1_list = a1_list.split(', ')
    a2_list = a2_list.split(', ')
    b1_list = b1_list.split(', ')
    b2_list = b2_list.split(', ')
    c1_list = c1_list.split(', ')
    c2_list = c2_list.split(', ')
    // console.log("wordlist array LLLLLL == ", wordlist)
    // calcWidth(vocab)
  }


  const calcWidth = (data) => {
    if (data) {
      console.log("inside calc width data ========== ",data)
    
    const wordlist = data.wordlist.length;
    const A1 = data.a1_list.length;
    const A2 = data.a2_list.length;
    const B1 = data.b1_list.length;
    const B2 = data.b2_list.length;
    const C1 = data.c1_list.length;
    const C2 = data.c2_list.length;
    console.log("worldist from calc width. ===== ", wordlist)

    // const wordlist = vocab.unique_wordlist.length
    // const A1 = vocab.a1_list.length
    // const A2 = vocab.a2_list.length
    // const B1 = vocab.b1_list.length
    // const B2 = vocab.b2_list.length
    // const C1 = vocab.c1_list.length
    // const C2 = vocab.c2_list.length
    
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
  }
  };

  const colors = ['#66ff66','#99ff33','#ffff33','#ffb366','#ff5c33','#ff1a1a'];
  const getWordColor = (word, data) => {
    // console.log("WOOOOOOOOOOOOOOOOORD ", word)
    let wordlist = vocab.wordlist;
    let unique_wordlist = vocab.unique_wordlist;
    let extracted_idioms = vocab.extracted_idioms;
    let a1_list = vocab.a1_list;
    let a2_list = vocab.a2_list;
    let b1_list = vocab.b1_list;
    let b2_list = vocab.b2_list;
    let c1_list = vocab.c1_list;
    let c2_list = vocab.c2_list;
    if(data) {

      wordlist = wordlist.split(', ')
      unique_wordlist = unique_wordlist.split(', ')
      extracted_idioms = extracted_idioms.split(', ')
      a1_list = a1_list.split(', ')
      a2_list = a2_list.split(', ')
      b1_list = b1_list.split(', ')
      b2_list = b2_list.split(', ')
      c1_list = c1_list.split(', ')
      c2_list = c2_list.split(', ')

      // console.log("wordlist array LLLLLL == ", a1_list)
      // calcWidth(vocab)
      const wordlists = [
        a1_list,
        a2_list,
        b1_list,
        b2_list,
        c1_list,
        c2_list
      ];
      for (let i = 0; i<wordlist.length; i++){
        // console.log("we are inside the loop", wordlists[i], word)
        console.log(word)
        
        console.log("Word list ", wordlists)
        if (wordlists[i].includes(word.toLowerCase())){
          console.log("from inside wordlist statement the words are ",word);
          return colors[i % colors.length];
        }
      }
    }

    // console.log("we are here",wordlists[1]);
    return ' ';
  }
  
  const renderColoredText = (text) => {
    console.log("The text from where word is madew ==== ",text)
    const text1 = text.replace(/[!"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, '');
    // console.log("chalena",text1)
    const words = text1.split(' ');
    const pword = text.split(' ');
    // console.log("from render colored text",words);

    return words.map((word, index) => {
      // console.log(data);
      // console.log("hello",word);
      const color = getWordColor(word, vocab);
      // console.log(color);
      return <span key={index} id={index} style={{ color }}>{pword[index] +' '}</span>;

    });

  };

  const containerStyle = {
    textAlign: 'center', // Center align the bullets
    position: 'relative', // Positioning for the container
    minHeight: '100vh', // Ensure the container fills the viewport height
  
    color: 'white',
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
        calcWidth(vocab);
      }, [vocab]);
    
const audio = new Audio();
audio.src = "http://127.0.0.1:8000"+timeDuration;
const duration = audio.duration
audio.load()
console.log(audio.src)
    

  return (
    <div style={containerStyle}>
      <h1>You have total of {wordlist && wordlist.length} words.</h1>
      <Grammar/>
      <h2>Vocabulary Grading:</h2>
      {/* <audio controls>
        // <source src={`http://127.0.0.1:8000/${timeDuration}`}></source>
      </audio> */}
      <audio id='audiofile' controls src={"http://127.0.0.1:8000"+timeDuration}></audio>
      {/* <h2>Duration: {duration}</h2> */}
      
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

      {/* <div className='vocab'>
        <div className='wordsCount'>Total no. of words: {location.state.data["wordlist"].length}</div>
        <div className='UniqueWords'>Unique Words: {location.state.data["unique_wordlist"].length}</div>
        <div>Speaking rate:</div>
      </div> */}
      
    </div>
  );
}



export default Vocabulary;

import React, { useState, useEffect } from 'react';
import abcde from '../assets/abcde.png';
import './SoundRecorder.css';
import { Link } from 'react-router-dom';
import Array from './Array.jsx';
import axios from 'axios';
import Submit from './Submit';
import Output from './Output';
import Cookies from 'js-cookie';


const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recorder, setRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const maxRecordingTime = 60; // Maximum recording time in seconds


  useEffect(() => {
    if (!navigator.mediaDevices) {
      console.error('getUserMedia is not supported by your browser');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setMediaStream(stream);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (timeElapsed >= maxRecordingTime) {
      stopRecording();
    }
  }, [timeElapsed, maxRecordingTime]);

  const startRecording = () => {
    const chunks = [];
    const newRecorder = new MediaRecorder(mediaStream);

    newRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    newRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setRecordedChunks(chunks);
    };

    setRecorder(newRecorder);
    setIsRecording(true);
    setIsPaused(false);
    setRecordedChunks([]);
    setTimeElapsed(0);
    newRecorder.start();
  };

  const stopRecording = () => {
    if (recorder && recorder.state === 'recording') {
      recorder.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (recorder && recorder.state === 'recording') {
      recorder.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (recorder && recorder.state === 'paused') {
      recorder.resume();
      setIsPaused(false);
    }
  };

  const clearRecording = () => {
    setRecordedChunks([]);
  };

 
  const submitRecording = () => {
    // Prompt the user for the file name
    const enteredFileName = prompt('Enter the file name:', '');
  
    if (enteredFileName) { // If the user entered a file name
      
      // Sending recorded audio to backend
      const formData = new FormData();
      formData.append('name', enteredFileName); // Append entered file name
      formData.append('audio', new Blob(recordedChunks, { type: 'audio/wav' }));
      axios.post('http://127.0.0.1:8000/recorder/', formData,{
        headers:{
            'X-CSRFToken':Cookies.get('csrftoken'),
        }
    })
        .then(response => {
          console.log('Audio uploaded successfully:', response);
          // Handle success
          //check if response status is 201 created
          if (response.status === 201){
            
            console.log('Audio Uploaded succuessfulyy');
            
          }
        })
        .catch(error => {
          console.error('Error uploading audio:', error);
          // Handle error
          
          
        });
    }
  };

  

  return (
    <div className='main'>
      <div className='recorder'>

        <div className="questions"><Array /> </div>

        <div className='image'>
          <img src = {abcde} alt="Recorder" />
        </div>

        {recordedChunks.length > 0 && (
        <div>
          <audio controls src={URL.createObjectURL(new Blob(recordedChunks, { type: 'audio/wav' }))}></audio>
        </div>
        )}

        <div className='buttons'>
          {!isRecording && !isPaused && (
            <button className="start " onClick={startRecording}>Start</button>
          )}
          {isRecording && !isPaused && (
            <>
              <button className="stop " onClick={stopRecording}>Stop</button>
              <button className="pause "onClick={pauseRecording}>Pause</button>
            </>
          )}
          {isPaused && (
            <button className="resume " onClick={resumeRecording}>Resume</button>
          )}
          {!isRecording && (
            <button className="clear "onClick={clearRecording}>Clear</button>
          )}   
          {recordedChunks.length > 0 && (
          // <button className="submit" onClick={submitRecording}>Submit</button>
            <button className="Submit" onClick={submitRecording}><Link className="hello" to='/user/Submit'>Submit</Link></button>
              
          )}
        </div>

      </div>
      
      <div>
        {isRecording && !isPaused && <p>Recording time: {timeElapsed} seconds</p>}
      </div>

    </div>

  );
};

export default Recorder;
// import React, { useState, useEffect } from 'react';
// import abcde from '../assets/abcde.png';
// import SoundRecorder from './SoundRecorder.css';
// import Array from './Array.jsx';
// import { Link } from 'react-router-dom';
// const Recorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [recorder, setRecorder] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const maxRecordingTime = 45; // Maximum recording time in seconds

//   useEffect(() => {
//     if (!navigator.mediaDevices) {
//       console.error('getUserMedia is not supported by your browser');
//       return;
//     }

//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(stream => {
//         setMediaStream(stream);
//       })
//       .catch(error => {
//         console.error('Error accessing microphone:', error);
//       });

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (isRecording && !isPaused) {
//       interval = setInterval(() => {
//         setTimeElapsed(prevTime => prevTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording, isPaused]);

//   useEffect(() => {
//     if (timeElapsed >= maxRecordingTime) {
//       stopRecording();
//     }
//   }, [timeElapsed, maxRecordingTime]);

//   const startRecording = () => {
//     const chunks = [];
//     const newRecorder = new MediaRecorder(mediaStream);

//     newRecorder.ondataavailable = (e) => {
//       if (e.data.size > 0) {
//         chunks.push(e.data);
//       }
//     };

//     newRecorder.onstop = () => {
//       const blob = new Blob(chunks, { type: 'audio/wav' });
//       setRecordedChunks(chunks);
//     };

//     setRecorder(newRecorder);
//     setIsRecording(true);
//     setIsPaused(false);
//     setRecordedChunks([]);
//     setTimeElapsed(0);
//     newRecorder.start();
//   };

//   const stopRecording = () => {
//     if (recorder && recorder.state === 'recording') {
//       recorder.stop();
//       setIsRecording(false);
//       setIsPaused(false);
//     }
//   };

//   const pauseRecording = () => {
//     if (recorder && recorder.state === 'recording') {
//       recorder.pause();
//       setIsPaused(true);
//     }
//   };

//   const resumeRecording = () => {
//     if (recorder && recorder.state === 'paused') {
//       recorder.resume();
//       setIsPaused(false);
//     }
//   };

//   const clearRecording = () => {
//     setRecordedChunks([]);
//   };

//   const submitRecording = () => {
//     // Implement your logic for submitting the recording
//     // This function will be called when the "Submit" button is clicked
//     console.log('Recording submitted');
//   };

//   return (
//     <div className='main'>
//       <div className='recorder'>

//         <div className="questions"><Array /> </div>

//         <div className='image'>
//           <img src={abcde} alt="Recorder" />
//         </div>

//         <div className='buttons'>
//           {!isRecording && !isPaused && (
//             <button className="start " onClick={startRecording}>
//               {recordedChunks.length > 0 ? 'Restart' : 'Start'}
//             </button>
//           )}
//           {isRecording && !isPaused && (
//             <>
//               <button className="stop " onClick={stopRecording}>Stop</button>
//               <button className="pause " onClick={pauseRecording}>Pause</button>
//             </>
//           )}
//           {isPaused && (
//             <button className="resume " onClick={resumeRecording}>Resume</button>
//           )}
//           {!isRecording && (
//             <button className="clear " onClick={clearRecording}>Clear</button>
//           )}
//           {recordedChunks.length > 0 && (
//             // <button className="submit" onClick={submitRecording}>Submit</button>
//             <Link className='submit' to='/Submit'>
//          Submit
//         </Link>
//           )}
//         </div>

//       </div>
//       {recordedChunks.length > 0 && (
//         <div>
//           <audio controls src={URL.createObjectURL(new Blob(recordedChunks, { type: 'audio/wav' }))}></audio>
//         </div>
//       )}
//       <div>
//         {isRecording && !isPaused && <p>Recording time: {timeElapsed} seconds</p>}
//       </div>
//     </div>
//   );
// };

// export default Recorder;

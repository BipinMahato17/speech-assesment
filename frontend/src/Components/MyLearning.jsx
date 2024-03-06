
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './MyLearning.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyLearning = () => {
  const [rows, setRows] = useState([]);
  
  const authSession = localStorage.getItem("authSession");
  const authSessionObj = JSON.parse(authSession);

// Access the email property
const email = authSessionObj.email;

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/recorder/result/'+email);
        // const transcribedText = response.data.map(item => item.transcribed_text);
        // const correctedText = response.data.map(item => item.corrected_sentence);

        const data = response.data.map(item => ({
          id: item.id,
          date: new Date(item.dateTime),
          transcribedText: item.transcribed_text,
          correctedText: item.corrected_sentence 
      }));

     
        
        // console.log(transcribedTexts); 
        setRows(data);



        
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
  // console.log(transcribedText)

  const columns = [
    { field: 'date', headerName: 'Date', type: 'date', width: 150 },
    { field: 'transcribedText', headerName: 'Transcribed Text', width: 250 },
    { field: 'correctedText', headerName: 'Corrected Text', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
         
          <Link className="annn" to={`/user/vocabulary/${params.row.id}`}>View</Link>
        
          <button className='butty' onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        className="grid"
      />
    </div>
  );
};

export default MyLearning;

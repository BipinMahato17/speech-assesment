
// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import './MyLearning.css';
// import {Link} from 'react-router-dom';
// const MyLearning = () => {
//   const [rows, setRows] = useState([
//     { id: 1, date: new Date('2024-03-04'), transcribedText: 'My is namw Messi', correctedText: 'My name is Messi.' },
//     { id: 2, date: new Date('2024-03-05'), transcribedText: 'I live Miami in', correctedText: 'I live in Miami.' },
//     // Add more rows as needed
//   ]);

//   const columns = [
//     { field : 'date', headerName: 'Date', type: 'date', width: 150 },
//     { field: 'transcribedText', headerName: 'Transcribed Text', width: 250 },
//     { field: 'correctedText', headerName: 'Corrected Text', width: 250 },
//     {
    
//       field: 'actions',
//       headerName : 'Actions',
//       width:600 ,
//       sortable: false,
//       align:'justify',
//       margin:'none',
//       filterable: false,
//       disableColumnMenu: true,
//       renderCell: (params) => (
//         <div>
//           <button className='butty' onClick={() => handleShow(params.row)}>View</button>
//           <button className='butty' onClick={() => handleDelete(params.row.id)}>Delete</button>
//         </div>
       
//       ),
//     },
//   ];

//   const handleDelete = (id) => {
//     const updatedRows = rows.filter(row => row.id !== id);
//     setRows(updatedRows);
//   };

//   const handleShow = (row) => {
//     alert(`Row Details: \nDate: ${row.date}\nTranscribed Text: ${row.transcribedText}\nCorrected Text: ${row.correctedText}`);
//   };

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default MyLearning;
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './MyLearning.css';
import { Link } from 'react-router-dom';

const MyLearning = () => {
  const [rows, setRows] = useState([
    { id: 1, date: new Date('2024-03-04'), transcribedText: 'My is namw Messi', correctedText: 'My name is Messi.' },
    { id: 2, date: new Date('2024-03-05'), transcribedText: 'I live Miami in', correctedText: 'I live in Miami.' },
    // Add more rows as needed
  ]);

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
         
          <Link className="annn" to={`/user/result/`}>View</Link>
        
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
      />
    </div>
  );
};

export default MyLearning;

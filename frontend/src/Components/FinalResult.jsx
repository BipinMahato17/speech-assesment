import React from 'react';
import { useParams } from 'react-router-dom';

const FinalResult = ({ rows }) => {
  // const { id } = useParams();
  // const row = rows.find(row => row.id === parseInt(id));

  return (
    <div>
      <h2>Transcribed Text</h2>
      {/* {row && (
        <div>
          <p>Date: {row.date.toString()}</p>
          <p>Transcribed Text: {row.transcribedText}</p>
          <p>Corrected Text: {row.correctedText}</p>
        </div>
      )} */}
    </div>
  );
};

export default FinalResult;

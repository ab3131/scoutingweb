import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Generate.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Generate() {
  const [matchId, setMatchId] = useState('');

  const handleClick = () => {
    // Logic to generate slides
    alert(`Slides generated for Match ID: ${matchId}`);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Enter match id here"
        variant="outlined"
        value={matchId}
        onChange={(e) => setMatchId(e.target.value)}
      />
      <Button variant="outlined" onClick={handleClick}>
        <strong>Generate Slides</strong>
      </Button>
    </>
  );
}

export default Generate;
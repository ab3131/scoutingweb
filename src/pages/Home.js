import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Generate');
  };
  return (
    <>
      <Button variant="outlined" onClick={() => {handleClick()}}><strong>Generate Slides</strong></Button> 

    </>    

  )
}

export default Home
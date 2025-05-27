import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import './Menu.css'
import Button from '@mui/material/Button';
function Menu() {
  const navigate = useNavigate();
  //navigation for Generate button 
  const handleClick = () => {
    if(localStorage.getItem('username')){
      navigate('/Generate');
    }
    else{
      navigate('/Login')
    }
    
  };
  const handleLoginClick = () => {
    if(localStorage.getItem('username')){
      localStorage.removeItem('username');
      navigate('/')
    }
    else{
      navigate('/Login');
    }
    
    
  };
  const renderMenu = () => {
    if(localStorage.getItem('username')){
      return <>
        <div className = "myheader">
          <Link to = "/" className = "websiteLink">
            <h1 className = "websiteHeader">Team 2367 Scouting</h1>
          </Link>
          <div className = "buttons">
            <Button variant="" onClick={() => {handleClick()}}><strong>Match Info</strong></Button> 
            <Button variant="" onClick={() => {handleLoginClick()}}><strong>Logout</strong></Button> 
            
          </div>
        </div>
      </>
    }
    else{
      return <>
        <div className = "myheader">
          <Link to = "/" className = "websiteLink">
            <h1 className = "websiteHeader">Team 2367 Scouting</h1>
          </Link>
          <div className = "buttons">
            <Button variant="" onClick={() => {handleClick()}}><strong>Match Info</strong></Button> 
            <Button variant="" onClick={() => {handleLoginClick()}}><strong>Login</strong></Button> 
          </div>
        </div>
      </>
    }

  
  }
  return (
    
    <>
    {renderMenu()}
    </>
  )
}

export default Menu
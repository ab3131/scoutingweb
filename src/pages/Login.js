import React, { useState } from 'react';
import './Login.css';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleClick = () => {
    if(username=="arav" & password=="bansal"){
        localStorage.setItem("username", "arav");
        navigate('/Generate');

    }
    else if(username=="zade" & password=="lobo"){
        localStorage.setItem("username", "zade");
        navigate('/Generate');
    }
    else{
      navigate('/Login')
    }
    
  };

  
  return (
    <>
        <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
        <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
        
        <Button variant="outlined" onClick={() => {handleClick()}}><strong>Login</strong></Button> 

    </>    

  )
}

export default Login
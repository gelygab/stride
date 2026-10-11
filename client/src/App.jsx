import React from 'react'
import './App.css';
// import axios from "axios";
// import { useEffect } from 'react';
import Navbar from './components/navbar';
import Title from './components/title'


const  App = () => {
  // for when using POST
  // useEffect(() => {
  //   axios.get("")
  // }, [])
  
  return (
    <div className='body'>
      <Navbar />
      <Title />
    </div>
  );
}

export default App;

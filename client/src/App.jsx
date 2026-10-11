import React from 'react'
import './App.css';
// import axios from "axios";
// import { useEffect } from 'react';
import Navbar from './components/navbar';
import Title from './components/title'
import About from './components/about'


const  App = () => {
  // for when using POST
  // useEffect(() => {
  //   axios.get("")
  // }, [])
  
  return (
    <div className='body'>
      <Navbar />
      <Title />
      <About />
    </div>
  );
}

export default App;

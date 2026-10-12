import React from 'react'
import './App.css';
// import axios from "axios";
// import { useEffect } from 'react';
import Navbar from './components/navbar';
import Title from './components/title'
import HowItWorks from './components/howitworks'


const  App = () => {
  // for when using POST
  // useEffect(() => {
  //   axios.get("")
  // }, [])
  
  return (
    <div>
      <Navbar />
      <Title />
      <HowItWorks />
    </div>
  );
}

export default App;

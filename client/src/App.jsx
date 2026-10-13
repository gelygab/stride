import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Title from './components/title';
import HowItWorks from './components/howitworks'
import Team from './components/team/team';
import About from './components/about'
import Impact from './components/impact';


const App = () => {
  const handleNavigate = (view) => {
    const target = view === 'team'
      ? document.getElementById('team')
      : view === 'impact'
      ? document.getElementById('impact')
      : document.getElementById('home');

    target?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} />
      <main>
        <section id="home" className="homeSection">
          <Title />
        </section>
        <HowItWorks />
        <About />
        <Impact />
        <Team />
      </main>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import Title from './components/title';
import Team from './components/team/team';
import About from './components/about'


const App = () => {
  const handleNavigate = (view) => {
    const target = view === 'team'
      ? document.getElementById('team')
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
        <About />
        <Team />
      </main>
    </div>
  );
};

export default App;

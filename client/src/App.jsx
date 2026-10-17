import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Title from './components/title';
import HowItWorks from './components/howitworks';
import Team from './components/team/team';
import About from './components/about';
import Impact from './components/impact';
import Dashboard from './components/dashboard/dashboard';

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view) => {
    if (view === 'dashboard') {
      setCurrentView('dashboard');
      return;
    }

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
      {currentView === 'dashboard' ? (
        <Dashboard onBack={() => setCurrentView('home')} />
      ) : (
        <>
          <Navbar onNavigate={handleNavigate} />
          <main>
            <section id="home" className="homeSection">
              <Title />
            </section>
            <About />
            <HowItWorks />
            <Impact />
            <Team />
          </main>
        </>
      )}
    </div>
  );
};

export default App;

import React from 'react';
import Navbar from './Components/Navbar.jsx';
import Hero from './Components/Hero.jsx';
import About from './Components/About.jsx';
import Features from './Components/Features.jsx';
import Story from './Components/Story.jsx';

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden '>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story/>
      
      
    </main>
  );
}

export default App;

import React from 'react';
import Navbar from './Components/Navbar.jsx';
import Hero from './Components/Hero.jsx';
import About from './Components/About.jsx';
import Features from './Components/Features.jsx';
import Story from './Components/Story.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';

const App = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

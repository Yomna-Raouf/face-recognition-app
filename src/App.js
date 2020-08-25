import React from 'react';
import './App.css';
import Particles from "react-tsparticles";
import Navbar from './Components/Navbar/Navbar';
import Logo from './Components/Logo/Logo';
import LinkForm from './Components/LinkForm/LinkForm';
import Rank from './Components/Rank/Rank';

const App = () => {

  const ParticlesOptions = {
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
    },
    detectRetina: true,
  }

  return (
    <div className="App">
     <Particles className="particles" params={ ParticlesOptions } />
     <Navbar/>
     <Logo />
     <Rank />
     <LinkForm />
    </div>
  );
}

export default App;

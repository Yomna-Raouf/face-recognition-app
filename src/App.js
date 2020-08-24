import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Logo from './Components/Logo/Logo';
import LinkForm from './Components/LinkForm/LinkForm';

const App = () => {
  return (
    <div className="App">
     <Navbar/>
     <Logo />
     <LinkForm />
    </div>
  );
}

export default App;

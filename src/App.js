import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bulma';

function App() {
  return (
    <div className="App">
      <header id="top" className="hero is-medium is-bold is-dark">
        <div className='hero-body level'>
          <div className='level-left column'>
            <img src={logo} className="image" alt="logo" />
            <div className='title'>
              Window Pane Game
            </div>
            <a
              className="subtitle"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              >
              Learn React
            </a>
          </div>
          <div className='level-right'>
          video
          </div>
        </div>
      </header>

      <nav className='navbar is-light'>
      <div className="navbar-brand">
        <a className="navbar-item" href="windowpanegame.com">
          <img src={logo} height="28" alt="logo"/>
        </a>
      </div>
      <div className='navbar-menu'>
        <a className='navbar-item' href="#top">
          Home
        </a> 

        <a className='navbar-item' href='#about'>
          About
        </a>

        <a className='navbar-item' href='#about'>
          Twitter
        </a>
      </div>
      </nav>

      <div id='about' className='section'>
        <div className='content'>
          
        </div>
      </div>
    </div>
  );
}

export default App;

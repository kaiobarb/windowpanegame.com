import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bulma';

import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
import timeLoop from "./timeLoop";

import ProfileData from './static/ProfileData';
import PersonalBio from './components/PersonalBio';

// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  ColorSeparationDistortion: {
// This is our first fragment shader in GLSL language (OpenGL Shading Language)
// (GLSL code gets compiled and run on the GPU)
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform sampler2D t;
    uniform float time, amp, freq, moving;

    vec2 lookup(vec2 offset, float amp2) {
      return mod(
        uv + amp2 * amp * vec2(
          cos(freq*(uv.x+offset.x)+time),
          sin(freq*(uv.y+offset.y)+time))
          +vec2(moving * time/10.0, 1.0), 
        vec2(1.0));
    }
    void main() {
      float amp2 = 1.0;
      float colorSeparation = 0.02 * mix(amp2, 1.0, 0.5);
      vec2 orientation = vec2(1.0, 0.0);
      gl_FragColor = vec4(vec3(
        texture2D(t, lookup(colorSeparation * orientation, amp2)).r,
        texture2D(t, lookup(-colorSeparation * orientation, amp2)).g,
        texture2D(t, lookup(vec2(0.0), amp2)).b),
        1);
    }
`
// the main() function is called FOR EACH PIXELS
// the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
// we set in output the pixel color using the vec4(r,g,b,a) format.
// see GLSL_ES_Specification_1.0.17
  }
});

const Warp = timeLoop(({ children: t, time }) =>
  <Node
    shader={shaders.ColorSeparationDistortion}
    uniforms={{
      t,
      time: time / 1000, // seconds is better for float precision
      freq: 5 + 2 * Math.sin(0.0007*time),
      amp: 0.02 + Math.max(0, 0.03*Math.cos(0.001 * time)),
      moving: 0,
    }}
  />);

function App() {
  return (
    <div className="App">

    {/* NAVBAR */}
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

      {/* HEADER */}
      <header id="top" className="section is-centered has-text-centered has-background-black">
              <div className='container'>
                <Surface >
                  <Warp>
                  {logo}
                  </Warp>
                </Surface>
                <div className='title has-text-white'>
                  Window Pane Game
                </div>
              </div>
              <div className='section'>
                <div className='video-container'>
                  <iframe className='video' width="1211" height="681" src="https://www.youtube.com/embed/92ma43ZWkwI" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>
      </header>
      
      <div className='has-background-black'>
        <div className='columns'>
          <div className='column'></div>
          <div className='column is-8 has-background-white'>

            {/* CONTENT */}
            <div id='about' className='section'>
              <div className='section'>
                <div className='content'>
                  <h1>About the Game</h1>
                  Window Pane is a psychological adventure where you play as a student who is offered free housing in return for doing some experiemnts. Explore your new apartment as you unveil
                  the events that are taking place around you. Are you really in control? Find out by downloading the executable (Coming to the website soon!) <br/>
                  Window Pane is based on the MK Ultra experiments conducted by the CIA in the late 50s and 60s. 
                </div>
              </div>
            </div>

            <PersonalBio data={ProfileData}/>

          </div>
          <div className='column'></div>
        </div>
      </div>
    </div>
  );
}

export default App;

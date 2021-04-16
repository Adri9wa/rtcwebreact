import React, { Component } from 'react'
import './App.css';
import { GenerateObstacles, GenerateRTC } from './Functions/Generation';
import Room, {SwitchMode, GenerateRoom, ResetRoom} from './Functions/Room'
import {ClearCanvas} from './Functions/Auxiliary'
import ClearRoom from './Functions/Simulation'


class App extends Component {

  render(){
    return (
      <div className="App">
        <header>
          <button className="ModeButton" onClick={SwitchMode}>Dark/Light mode</button>    
            <h1 className="mainTitle">RTC Simulation</h1>
      </header>    
      <div className="controlButtonsBlock">               
        <button className="controlButton" onClick={GenerateRoom}>Generate room</button>
        <button className="controlButton" onClick={ResetRoom}>Reset room</button>
        <button className="controlButton" onClick={GenerateObstacles}>Generate obstacles</button>
        <button className="controlButton" onClick={GenerateRTC}>Generate RTC and DS</button>
        <button className="controlButton" onClick={ClearCanvas}>Clear canvas</button>
        <button className="controlButton" id="controlBut" onClick={ClearRoom}>Start Cleaning</button>
      </div>       
      <Room />

      <footer>
        <p className="footerText">© Made by Adri9wa, inspired by Anatolii</p>
        </footer>
      </div>
    );
  }
}

export default App;

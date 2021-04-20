import React, { Component } from 'react'
import './App.css';
import { GenerateObstacles, GenerateRTC } from './Functions/Generation';
import Room, {SwitchMode, GenerateRoom, ResetRoom} from './Functions/Room'
import {ClearCanvas} from './Functions/Auxiliary'
import ClearRoom, { ResumeCleaning, StopCleaning } from './Functions/Simulation'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      clicked: 0
    };
  }


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
        <button className="controlButton" id="controlBut" onClick={() => {
          if(this.state.clicked === 0) { ClearRoom(); this.setState({ clicked: this.state.clicked+1 }); }
          else if(this.state.clicked === 1) { StopCleaning(); this.setState({ clicked: this.state.clicked+1 }); }
          else { ResumeCleaning(); this.setState({clicked: 1}) }
        }
        }>▶ Start Cleaning</button>
      </div> 

        <div>
          <p style={{color: "orange", position: "absolute", right: "290px", marginTop: "32px"}}>Interval (default 500): </p>
          <input placeholder="ms..." id="intervalInput" />
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

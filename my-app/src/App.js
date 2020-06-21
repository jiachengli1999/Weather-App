import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state = ({
      city: "...",
    })
  }

  render(){
    return(
      <div className='layout'>
        <div className='input-section'>
          <div className='lat'> 
            <label className='lat-label'>Latitude:</label>
            <input className='lat-input'placeholder='33.44'/>
          </div>
          <div className='lon'> 
            <label className='lon-label'>Longitude:</label>
            <input className='lon-input' placeholder='-94.04'/>
          </div>
          <label className='btn'>Submit</label>
        </div>
        <div className='curr-city'>
          {this.state.city}
        </div>
        <div className='weather-info'> 
          {/* {getWeather(33.44, -94.04)} */}
          <div className='section1'>
            <ul>
              <li>Temperature:</li>
              <li>Feels Like:</li>
              <li>Pressure:</li>
              <li>Humidity:</li>
            </ul>
          </div>
          <div className='section2'>
              Thunder Storm
          </div>
        </div>
      </div>
    )
  }
}

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
  appid=d8a524607ad60a28680d85e7cbcecc61`)
    .then(results => results.json())
    .then(results => {
            console.log(results)
          }
    );
}
export default App;

import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state = ({
      lat: null,
      lon: null,
      city: "Enter your coordinates to start",
      temp: null,
      feels: null,
      pressure: null,
      humidity: null,
      weather: "",
      isLoading: false,
      error: null,
    })
    this.getWeather = this.getWeather.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getWeather(){
    let lat = this.state.lat
    let lon = this.state.lon
    console.log("lat:", lat, ", lon:", lon)
    this.setState({isLoading: true})
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=d8a524607ad60a28680d85e7cbcecc61`)
      .then(results => results.json())
      .then(results => {
              console.log(results)
              if(results.cod){
                this.setState({error: 400, isLoading: false})
              }
              else{
                this.setState({
                  city: results['timezone'],
                  temp: results['current']['temp'],
                  feels: results['current']['feels_like'],
                  pressure: results['current']['pressure'],
                  humidity: results['current']['humidity'],
                  weather: results['current']['weather'][0]['description'],
                  error: null,
                  isLoading: false,
                })
              }
            }
      )
      .catch(err =>{ 
        console.log(err)
        this.setState({isLoading: false})
      })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  
  render(){
    let temp, feels_like, pressure, humidity
    let city = this.state.city
    let weather = this.state.weather
    let lat = this.state.lat
    let lon = this.state.lon

    if (this.state.error){
      console.log(this.state.error)
      city = this.state.error === 400 ? "Invalid Latitude/Longitude" : "Something went wrong"
      temp = ""
      feels_like = ""
      pressure = ""
      humidity = ""
      weather = ""
    }
    else{
      temp = (this.state.temp) ? "Temperature: " + this.state.temp + " F" : ""
      feels_like = (this.state.feels) ? "Feels Like: " + this.state.feels + " F": ""
      pressure = (this.state.pressure) ? "Pressure: " + this.state.pressure + "hPa": ""
      humidity = (this.state.humidity) ? "Humidity: " + this.state.humidity + "%": ""
    }

    if(this.state.isLoading){
      return(
        <p>Loading.....</p>
      )
    }

    return(
      <div className='layout'>
        <div className='input-section'>
          <div className='lat'> 
            <label className='lat-label'>Latitude:</label>
            <input className='lat-input' name ='lat' onChange={this.handleChange} placeholder='33.44'/>
          </div>
          <div className='lon'> 
            <label className='lon-label'>Longitude:</label>
            <input className='lon-input' name ='lon' onChange={this.handleChange} placeholder='-94.04'/>
          </div>
          <label className='btn' 
          onClick={this.getWeather}>
            Submit
          </label>
        </div>
        <div className='curr-city'>
          <div>{city}</div>
          <div>{lat} {lon}</div>
        </div>
        <div className='weather-info'> 
          <div className='section1'>
            <ul>
              <li>{temp}</li>
              <li>{feels_like}</li>
              <li>{pressure}</li>
              <li>{humidity}</li>
            </ul>
          </div>
          <div className='section2'>
              {weather}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

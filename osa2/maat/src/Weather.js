import axios from 'axios'
import { useState, useEffect } from 'react'


const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital[0]}`)
      .then(response => {
        setWeather(response.data.current)
        console.log(weather);



      })
  }, [capital])
  if (weather === undefined) {
    return <div></div>
  }
  return (
    <div>
      <h2>Weather in {capital[0]}</h2>
      <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt="weather icon" />
      <p><strong>wind:</strong> {weather.wind_speed} mph </p>
    </div>
  )
}


export default Weather
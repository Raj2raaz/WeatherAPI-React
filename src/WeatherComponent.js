import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from  "@mui/material/Button";


const API_KEY = "g7Ih8Qk1UDjg2QptfUbQhdaQ1JCi37l6";

function WeatherComponent() {
    const [WeatherData, setWeatherData] = useState(null);
  useEffect(() => {
    const latitude = 40.7128;
    const longitude = -74.0060;
    const fetchRealTimeWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature_2m,weatherCode&apikey=${API_KEY}`
        );
        const data = response.data;
        setWeatherData(data);
        console.log("Real-time Weather data:", data);
      } catch (error) {
        console.log(`Error fetching real time Weather`, error);
      }
    };
    fetchRealTimeWeather(latitude, longitude);
  }, []);

  const handleButtonClick = () => {
    console.log("Button clicked!");
    if(WeatherData){
        const{lat , lon} = WeatherData.location;

        console.log("Latitude:", lat);
        console.log("Longitude:", lat);
        console.log("weather data:" , WeatherData);
    }
  };

  return (
    <div>
      <Button variant = "outlined" onClick={handleButtonClick}>Click me</Button>
    </div>
  );
}

export default WeatherComponent;

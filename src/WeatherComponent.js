import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from  "@mui/material/Button";


const API_KEY = "g7Ih8Qk1UDjg2QptfUbQhdaQ1JCi37l6";

function WeatherComponent() {
    const [WeatherData, setWeatherData] = useState(null);
  useEffect(() => {
    // const latitude = 43.653480529785156;
    // const longitude = -79.3839340209961;
    // const fetchRealTimeWeather = async (latitude, longitude) => {
    const fetchRealTimeWeather = async () => {
        // debugger;
        try {
            const response = await axios.get(
              `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=g7Ih8Qk1UDjg2QptfUbQhdaQ1JCi37l6`
            //   {
            //     params: {
            //       apikey: API_KEY,
            //     },
            //   }
            );
            // debugger;
            const data = response.data;
            setWeatherData(data);
            console.log("Real-time Weather data:", data);
          } catch (error) {
            console.log(`Error fetching real-time Weather`, error);
          }
    
    };
    
    fetchRealTimeWeather();
  }, []);

  const handleButtonClick = () => {
    console.log("Button clicked!");
    if(WeatherData){
        const{lat , lon} = WeatherData.location;

        console.log("Latitude:", lat);
        console.log("Longitude:", lon);
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

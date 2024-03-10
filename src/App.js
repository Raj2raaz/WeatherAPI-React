import React, { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Temperature from "./components/Temperature";
import Highlights from "./components/Highlights";

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);

  const fetchRealTimeWeather = debounce(async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=g7Ih8Qk1UDjg2QptfUbQhdaQ1JCi37l6`
      );
      const data = response.data.data;
      setWeatherData(data);
      console.log("Real-time Weather data:", data);
    } catch (error) {
      console.log("Error fetching real-time Weather", error);
    }
  }, 1000);

  const fetchForecastWeather = debounce(async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=g7Ih8Qk1UDjg2QptfUbQhdaQ1JCi37l6`
      );
      const data = response.data.data;
      console.log("Forecast Weather data:", data);
    } catch (error) {
      console.log("Error fetching forecast Weather", error);
    }
  }, 1000);

  useEffect(() => {
    fetchRealTimeWeather();
    fetchForecastWeather();
  }, [city]);

  return (
    <div className="bg-slate-800 h-screen flex justify-center items-start">
      <div className="w-1/5 h-1/3 mt-40">
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData.current.temperature,
              condition: weatherData.current.weather.description,
              isDay: weatherData.current.is_day,
              location: weatherData.location.name,
              time: weatherData.location.localtime,
            }}
          />
        )}
      </div>
      <div className="w-1/3 h-1/3 mt-40 p-10 grid grid-cols-2 gap-6">
        <h1 className="text-slate-200 text-2xl col-span-2">
          Today's Highlights
        </h1>
        {weatherData && (
          <>
            <Highlights
              stats={{
                title: "Wind Status",
                value: weatherData.current.wind_speed,
                unit: "m/s",
                direction: weatherData.current.wind_direction,
              }}
            />
            <Highlights
              stats={{
                title: "Humidity",
                value: weatherData.current.humidity,
                unit: "%",
              }}
            />
            <Highlights
              stats={{
                title: "Visibility",
                value: weatherData.current.visibility,
                unit: "m",
              }}
            />
            <Highlights
              stats={{
                title: "Air Pressure",
                value: weatherData.current.pressure,
                unit: "hPa",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

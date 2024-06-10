import React, { useState } from "react";

function WeatherApp() {
  const [input, setInput] = useState("");

  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async () => {
    setWeather({ ...weather, loading: true });
    const url = `http://api.weatherapi.com/v1/current.json?key=c67792233ac54d47913122938242205&q=${input}&aqi=no`;
    console.log(input);

    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather({ data, loading: false, error: false });
    } catch (error) {
      setWeather({ loading: false, data: {}, error: true });
      setInput("");
      console.log("error", error);
    }
  };

  return (
    <div className="App">
      <h1 className="app-name">Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={search}>Enter</button>
      </div>
      {weather.loading && (
        <>
          <br />
          <br />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}
      {weather.data && weather.data.location && weather.data.current && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.location.name},{" "}
              <span>{weather.data.location.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            {Math.round(weather.data.current.temp_c)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.current.condition.text.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.current.wind_kph}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

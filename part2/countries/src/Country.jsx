import { useState, useEffect } from "react";
import weatherServer from "./services/weather";

/* eslint-disable react/prop-types */
const Countries = ({ countries, handleShowCountry }) => {
  console.log(countries);
  return (
    <>
      {countries.map((country) => (
        <p key={country}>
          {country}{" "}
          <button onClick={() => handleShowCountry(country)}>show</button>
        </p>
      ))}
    </>
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const hookWeather = () => {
    // Fetch weather from the server when is needed
    if (country && !weather) {
      weatherServer
        .getCurrentWeather(country.latlng[0], country.latlng[1])
        .then((weather) => {
          setWeather(weather);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(hookWeather, [country, weather]);

  console.log(country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      {Object.values(country.languages).map((language) => (
        <p key={language}>{language}</p>
      ))}
      <img src={country.flags.png} alt="flag" />
      <h2>Weather in {country.capital}</h2>
      <p>
        temperature:{" "}
        {weather
          ? `${weather.current.temp} Celsius`
          : "Waiting for data source..."}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${
          weather ? weather.current.weather[0].icon : "02d"
        }@2x.png`}
        alt="weather"
      ></img>
      <p>
        wind:{" "}
        {weather
          ? `${weather.current.wind_speed} m/s`
          : "Waiting for data source..."}
      </p>
    </div>
  );
};

export { Countries, Country };

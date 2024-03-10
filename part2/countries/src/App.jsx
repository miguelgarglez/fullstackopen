/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./App.css";
import countryServer from "./services/countries";
import { Country, Countries } from "./Country";

function App() {
  const [inputName, setInputName] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);
  const [hasFetchedCountry, setHasFetchedCountry] = useState(false);

  // Fetch all countries from the server
  const hookInit = () => {
    const countriesNames = [];
    countryServer
      .getAll()
      .then((countries) => {
        countries.forEach((country) => {
          countriesNames.push(country.name.common);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setAllCountries(countriesNames);
  };
  useEffect(hookInit, []);

  const countriesToShow = allCountries.filter((country) =>
    country.toLowerCase().includes(inputName.toLowerCase())
  );

  const hookCountry = () => {
    // Fetch country from the server when is needed
    if (countriesToShow.length === 1 && !hasFetchedCountry) {
      countryServer
        .getCountry(countriesToShow[0])
        .then((country) => {
          setCountryToShow(country);
          setHasFetchedCountry(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (countriesToShow.length !== 1) {
      setHasFetchedCountry(false);
    }
  };
  useEffect(hookCountry, [countriesToShow, hasFetchedCountry]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  // Handle show country
  const handleShowCountry = (countryName) => {
    setInputName(countryName);
  };

  return (
    <>
      <p>
        find countries{" "}
        <input type="text" value={inputName} onChange={handleInputChange} />
      </p>
      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        countryToShow ? (
          <Country country={countryToShow} />
        ) : (
          <p>Loading...</p>
        )
      ) : countriesToShow.length === 0 ? (
        <p>No country found</p>
      ) : (
        <Countries
          countries={countriesToShow}
          handleShowCountry={handleShowCountry}
        />
      )}
    </>
  );
}

export default App;

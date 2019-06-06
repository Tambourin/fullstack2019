import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({
    current: {
      temp_c: 0,
      condition: {
        text: "",
        icon: ""
      }
    }
  });

  useEffect (() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=71b707a627794cdc86561120190406&q=${country.name}`).then((response) => {
      console.log('Weather: ', response.data); 
      setWeather(response.data);   
      
    })
  }, [country]);

  return (
    <div>
      <h2>Weather now</h2>
      <p>Condition: {weather.current.condition.text}</p>
      <p>Temperature: {weather.current.temp_c} celsius</p>
      <img src={weather.current.condition.icon} alt="weather icon"></img>
    </div>
  );  
}

const SingleCountry = ({ country }) => {
  const mapLanguages = country.languages.map(language => (
    <li key={language.name}>{language.name}</li>
  ));

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      {mapLanguages}
      <Weather country={country}/>
      <img className="flag" src={country.flag} alt="lippu" />
    </div>
  );
};

const CountryRow = ({ country, setFilterWord }) => {
  return (
    <p>
      {country.name}
      <button
        onClick={() => {
          console.log("Country name:", country.name);
          setFilterWord(country.name);
        }}
      >
        Show
      </button>
    </p>
  );
};

const CountryList = ({ countries, setFilterWord }) => {
  const listCountries = () => {
    if (countries.length === 1) {
      return <SingleCountry country={countries[0]} />;
    } else if (countries.length <= 10) {
      return countries.map(country => (
        <CountryRow
          country={country}
          setFilterWord={setFilterWord}
          key={country.name}
        />
      ));
    } else if (countries.length > 10) {
      return <p>Too many matches</p>;
    }
  };

  return <div>{listCountries()}</div>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterWord, setFilterWord] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const filterChangeHandler = event => {
    setFilterWord(event.target.value);
  };

  return (
    <>
      <form>
        <input type="text" value={filterWord} onChange={filterChangeHandler} />
      </form>
      <CountryList
        setFilterWord={setFilterWord}
        countries={countries.filter(country => country.name.match(filterWord))}
      />
    </>
  );
};

export default App;

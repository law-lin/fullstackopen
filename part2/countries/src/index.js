import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.iso639_1}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} width='150' />
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (query !== '') {
      setCountry(null);
      fetch(`https://restcountries.eu/rest/v2/name/${query}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.length > 10) {
            setMessage('Too many matches, specify another filter');
          } else {
            setMessage(null);
            setCountries(result);
          }
        });
    }
  }, [query]);

  const handleClick = (country) => {
    setCountry(country);
  };

  return (
    <div>
      <p>find countries</p>
      <input type='text' onChange={(e) => setQuery(e.target.value)} />

      {country && <Country country={country} />}
      {countries.length === 1 ? (
        <Country country={countries[0]} />
      ) : message ? (
        message
      ) : (
        countries.map((country) => {
          return (
            <div key={country.alpha2Code}>
              {country.name}
              <button
                onClick={() => {
                  handleClick(country);
                }}
              >
                show
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

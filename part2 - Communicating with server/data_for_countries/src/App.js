import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, setNewFilter} ) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange}></input>
    </div>
  )
}

const Country = ({ country }) => {
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}
      <br />
      population {country.population}
      <ul>
      </ul>
      <img width='150'  src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const Countries = (props) => {

  console.log(props.countriesToShow[0] === undefined ? "undefined" : props.countriesToShow[0]);

  if (props.countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (props.countriesToShow.length === 1) {
    return (
      <div>
        <Country country={props.countriesToShow[0]} />
      </div>
    )
  }

  return (
    <ul>
      {props.countriesToShow.map(person =>
        <li key={person.name.common}>{person.name.common}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = newFilter.length === 1
    ? countries
    : countries.filter(country => (country.name.common.toUpperCase()).includes(newFilter.toUpperCase()))



  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App

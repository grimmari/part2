import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Country from './component/Country'
import CountryDetail from './component/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterInput, setNewFilterInput] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countryToShow = countries.filter(country => country.name.toLowerCase().includes(filterInput))

  var arraySize = countryToShow.length
  var message = 'Too many Matches, specify another filter'

  console.log(arraySize)
  if (arraySize > 10) {
    countryToShow.splice(0, arraySize)

  } else {
    message = ''
  }

  const handleFilter = (event) => {
    console.log('haku: ', event.target.value)
    setNewFilterInput(event.target.value.toLowerCase())


  }
  const showDetails = () => {
    //console.log(arraySize)

    if (arraySize === 1) {
      const coutryDetail = countryToShow

      return (
        <CountryDetail country={coutryDetail} />

      )
    }




  }
  const rows = () => countryToShow.map(country => {
    if (countryToShow.length > 1) {

      return (
        <Country key={country.alpha2Code}
          country={country} />
      )
    }else{
      return ""
    }

  }
  )

  return (
    <div >
      find Countries
      <input value={filterInput}
        onChange={handleFilter}
      />
      <div>{message}</div>

      <div>{rows()}</div>
      <div>{showDetails()}</div>
    </div>

  );
}

export default App;

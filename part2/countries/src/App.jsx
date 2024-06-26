import { useEffect, useState } from 'react'
import countryService from './services/countries'

const DetailedCountry = (country) => {
  console.log(country)
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}
      <br></br>
      area {country.area}
      <br></br>
      <br></br>
      <b>languages</b>
      <br></br>
      {Object.values(country.languages).map(language => {
        return (
          <li key={language}>{language}</li>
        )
      })}
      <img src={country.flags.png}></img>
    </div>
  )
}

const Countries = (props) => {
  var countries = props.countries
  if (countries.length < 10) {
    if (countries.length == 1) {
      return DetailedCountry(countries[0])
    }
    return (
      countries.map(country => 
      <li key={country.name.common}>{country.name.common} <button onClick={() => {
        return DetailedCountry(country)
      }}>show</button></li>)
    )
  }
}

const Search = (props) => {
  return (
      <input onChange={props.handleFilter}></input>
  )
}

const Warning = (props) => {
  if (props.countries > 10)
  return (
    <div>
      {props.message}
    </div>
  )
}

function App() {
  const [message, setMessage] = useState('')
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState({})

  useEffect(() => {
    countryService.getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
        })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
    if (filteredCountries.length > 10) {
      setMessage('Too many matches, please specify another filter')
    }
    else {
      setMessage('')
    }
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))

  const handleShow = (country) => {
    setCountry(country)
  }

  return (
    <div>
      find countries <Search handleFilter={handleFilter}/>
      <Warning message={message} countries={filteredCountries.length}/>
      <Countries countries={filteredCountries} handleShow={handleShow}/>
    </div>
  )
}

export default App

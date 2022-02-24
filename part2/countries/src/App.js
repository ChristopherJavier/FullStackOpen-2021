import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* This component makes the render for the searchbar that filters the countries.
It has an input that receive the props of value and the handler of the changes.
This is part of the 2.12* Data for countries, step1 exercise*/
const SearchBar = (props) => {
  return (
    <>
      find countries <input value={props.searchTerm} onChange={props.handler} />
    </>
  )
}

/* This component renders the show button that will be next to of the country name,
this button will show the country info when is clicked.
Also this component have a conditional render of the info of the country.
This is part of the 2.13*: Data for countries, step2*/
const ShownButton = ({ ctrA, ctd }) => {
  const [show, setShow] = useState(false)
  const [ctr, setctr] = useState()

  const handlerClick = (event) => {
    setctr(event.target.value)
    setShow(true)
  }

  const country = ctd.filter(value => value.name === ctr)

  return (
    <>
      <button value={ctrA} onClick={handlerClick}>Show</button>
      {
        show === true
          ? country.map(
            dcountry =>
              <div key={dcountry.alpha2Code}>
                <h1>{dcountry.name}</h1>
                <p>Capital: {dcountry.capital}</p>
                <p>Population: {dcountry.population}</p>
                <h2>languages</h2>
                <ul>
                  {dcountry.languages.map(clan => <li key={clan.name}>{clan.name}</li>)}
                </ul>
                <img src={dcountry.flag} alt={dcountry.name} width='30%' />

              </div>
          )
          : null
      }
    </>
  )

}

/* This component makes the render for the country info,
if only one country matches with the search term the info of the country will be shown
in case that more than one country matches with the search term 
it'll shown the list of matches.
This is response to the condition of the DisplayCountries component 
if are less than 10 matches.
This is part of the 2.12* Data for countries, step1 exercise.
It was added a call for the ShownButton component in the 2.13*: Data for countries, step2 exercise.
It was added a useEffect that make a call to the weather API and saves the data 
of the response in the weatherCon state, This is part of the 2.14*: Data for countries, step3 exercise.
It was added the if for prevents errors when ctrs is empty, and set the capital name.
Added the weather elements render this is part of the 2.14*: Data for countries, step3 exercise.
*/
const Country = ({ ctrs }) => {
  const [weatherCon, setWeatherCon] = useState([])
  const apiKey = process.env.REACT_APP_API_KEY
  let city

  if (ctrs.length === 1) {
    city = ctrs[ctrs.length - 1].capital
  }
  

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
      .then(response => {
        console.log("promise fulfilled")
        setWeatherCon(response.data)       
      })
  }, [apiKey, city])

  return (
    ctrs.length === 1
      ? <div>
        <h1>{ctrs[ctrs.length - 1].name}</h1>
        <p>Capital: {ctrs[ctrs.length - 1].capital}</p>
        <p>Population: {ctrs[ctrs.length - 1].population}</p>
        <h2>languages</h2>
        <ul>
          {ctrs[ctrs.length - 1].languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={ctrs[ctrs.length - 1].flag} alt={ctrs.name} width='30%' />
        <h2>Weather in {ctrs[ctrs.length - 1].capital}</h2>
        <p><b>temperature: </b> {weatherCon.current?.temperature} Celsius</p>
        <img src={weatherCon.current?.weather_icons[0]} alt={weatherCon.current?.weather_descriptions[0]}/>
        <p><b>wind: </b> {weatherCon.current?.wind_speed} <b>mph direction</b> {weatherCon.current?.wind_dir}</p>
      </div>
      : ctrs.map(countries => <div key={countries.name}>{countries.name}<ShownButton ctrA={countries.name} ctd={ctrs} /></div>)
  )
}

/* This component makes the conditional rendering of the countries list,
this component shown an advice if there are more than 10 matches with the filter,
when are less than 10 the component makes a call to the Country component, 
that shown the list and one country info.
This is part of the 2.12* Data for countries, step1 exercise*/
const DisplayCountries = ({ countries }) => {

  return (
    countries.length > 10
      ? <div>Too many matches, specify another filter</div>
      : <Country ctrs={countries} />
  )


}

function App() {
  /* This state is uses for save the response data of the countries.
  This is part of the 2.12* Data for countries, step1 exercise*/
  const [countries, setCountries] = useState([])

  /* This state is use for the changes of the input element of the search bar.
  This is part of the 2.12* Data for countries, step1 exercise*/
  const [searchTerm, setSearchTerm] = useState([])

  /* This state is use for save the changes of the filtered countries changes.
  This is part of the 2.12* Data for countries, step1 exercise*/
  const [filteredCountries, setFilterCountries] = useState([])

  /* This useEffect is use for make the get petition for the data of the countries
  and saves the response on the countries state.
  This is part of the 2.12* Data for countries, step1 exercise*/
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  /* This useEffect is used for saves the changes of the filtered countries state
  This is part of the 2.12* Data for countries, step1 exercise*/
  useEffect(() => {
    setFilterCountries(
      countries.filter(countries => {
        return countries.name.toLowerCase().includes(searchTerm)
      })
    )
  }, [searchTerm, countries])

  /* This is the handler for the input changes of the search bar.
  This is part of the 2.12* Data for countries, step1 exercise*/
  const handlerInpSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  return (
    <div>
      <SearchBar searchTerm={searchTerm} handler={handlerInpSearch} />
      <DisplayCountries countries={filteredCountries} />
    </div>
  )
}

export default App;
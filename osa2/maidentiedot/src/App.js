import React, {useState, useEffect} from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const Single = ({country}) =>{
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getWeatherData = async () =>{
    setIsLoading(true)
    const url = 'http://api.weatherstack.com/current?access_key='+ api_key + '&query='+ country[0].capital
    const result = await axios.get(url)
    setWeather(result.data)
    setIsLoading(false)
  }
  useEffect(() =>{
    getWeatherData()
  },[])
  const languages = country[0].languages
  return (
    isLoading ? (
      <div>loading data...</div>
    ) : (
    <div>
      <h1>{country[0].name}</h1>
      <p>Capital: {country[0].capital}</p>
      <p>Population: {country[0].population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country[0].flag} height='200' alt={country[0].name}/>
      <h3>Weather in {country[0].capital}</h3>
      <b>Temperature:</b> {weather.current.temperature} Celcius<br />
      <img src={weather.current.weather_icons[0]} alt={weather.location.name} /><br />
      <b>Windspeed: </b> {weather.current.wind_speed} km/h<br />
      <b>Wind direction</b> {weather.current.wind_dir}<br />
    </div>
  )
  )
}
const Countries = ({countries}) => {
  const [filtered, setFiltered] = useState([])
  useEffect(() =>{
    setFiltered(countries)
  },[countries])
  const clickCountry = (event) =>{
    setFiltered(countries.filter(c => c.name === event.target.id))
  }
  console.log('updated')
  console.log(filtered)
  const mapped = filtered.map(c => <div key={c.name}>{c.name}<button id={c.name} onClick={clickCountry}>show</button></div>)
  if(mapped.length === 1){
    return(
      <Single country={filtered} />
    )
  } else if (mapped.length > 1 && mapped.length <= 10){
    return (
      <div>
        {mapped}
      </div>
    )
  } else{
    return(
      <div>too many results, specify please</div>
    )
  }
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data)
      })
  },[])
  const handleSearch = (event) => {
    setFilter(event.target.value)
  }
  const filterResults = () =>{
    return countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
  }
  
  return (
    <div>
      find countries: <input onChange={handleSearch} />    
      <Countries countries={filterResults()}  />
    </div>
  )
}

export default App

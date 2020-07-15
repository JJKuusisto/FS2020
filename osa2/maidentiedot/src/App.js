import React, {useState, useEffect} from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const Single = ({country}) =>{
  const [isLoading, setIsLoading] = useState(true)
  const [temp, setTemp] = useState('')
  const [icon, setIcon] = useState('')
  const [winds, setWinds] = useState('')
  const [windd, setWindd] = useState('')
  const getWeatherData = async () =>{
    setIsLoading(true)
    const url = 'http://api.weatherstack.com/current?access_key='+ api_key + '&query='+ country[0].capital
    const result = await axios.get(url)
    setTemp(result.data.current.temperature)
    setIcon(result.data.current.weather_icons[0])
    setWinds(result.data.current.wind_speed)
    setWindd(result.data.current.wind_dir)
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
      <b>Temperature:</b> {temp} Celcius<br />
      <img src={icon} alt={country[0].capital} /><br />
      <b>Windspeed: </b> {winds} km/h<br />
      <b>Wind direction</b> {windd}<br />
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

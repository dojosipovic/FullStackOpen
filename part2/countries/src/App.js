import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')
  const [targets, setTargets] = useState(null)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!countries) {
      console.log('fetching countries...')
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [countries])

  useEffect(() => {
    if (targets === null) return
    if (targets.length === 1){
      setCountry(targets[0])
      getWeatherData(targets[0].capital[0])
    } 
  }, [targets])

  const getWeatherData = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric `)
      .then(response => {
        setWeather(response.data);
      })
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    const value = event.target.value.toLowerCase()

    if (value === '') {
      setTargets(null)
    } else {
      const names = countries.map(c => c.name.common)
      const targets = names.filter(c => c.toLowerCase().includes(value))
      setTargets(countries.filter(c => c.name.common.toLowerCase().includes(value)))
  
      console.log(targets.length)
    }
  }

  const buttonShowClick = (name) => {
    console.log(`clicked ${name}`)
    setTargets(countries.filter(c => c.name.common === name))
  }

  if (targets === null) return <div>find countries <input value={value} onChange={handleChange} /></div>
  if (targets.length === 1 && country !== null && weather !== null) {
    return(
      <div>
        find countries <input value={value} onChange={handleChange} />
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <p><strong>languages:</strong></p>
        <ul>
          {
            Object.keys(country.languages)
              .map(key => country.languages[key])
              .map(l => <li key={l}>{l}</li>)
          }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
        <h3>Weather in {country.capital[0]}</h3>
        <div>temperature {weather.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`}/>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
  if (targets.length <= 10) {
    return(
      <div>
        find countries <input value={value} onChange={handleChange} />
        <div>
          {
            targets.map(c =>
              <div key={c.name.common}>
                {c.name.common}
                <button onClick={() => buttonShowClick(c.name.common)}>show</button>
              </div>)
          }
        </div>
      </div>
    )
  }
  else if (targets.length > 10) {
    return(
      <div>
        find countries <input value={value} onChange={handleChange} />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  }
}

export default App
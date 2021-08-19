import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
    const [search, setSearch] = useState("")
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [capitalWeather, setCapitalWeather] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY

    function handleSearch(event) {
        setSearch(event.target.value)
    }

    useEffect(() => {
        console.log("search", search)
        console.log("countries", countries)
        console.log("selected", selectedCountry)

        const eventHandler = response => {
            console.log(response)
            if (response.status === 200 && response.data.length) {
                // https://stackoverflow.com/questions/953071/how-to-easily-truncate-an-array-with-javascript/6928247
                response.data.length = Math.min(response.data.length, 10);
                if (response.data.length > 1) {
                    setCountries(response.data)
                    setSelectedCountry(null)
                    setCapitalWeather(null)
                } else if (response.data.length === 1) {
                    setCountries(response.data)
                    setSelectedCountry(response.data[0])
                }
            }
        }

        function setFullList() {
            const promise = axios.get(`https://restcountries.eu/rest/v2/all`)
            promise.then(eventHandler).catch(error => {
                setCountries([])
                setCapitalWeather(null)
            })
        }

        if (search !== "") {
            const promise = axios.get(`https://restcountries.eu/rest/v2/name/${search}?fields=name;flag;capital;languages;population`)
            promise.then(eventHandler).catch(error => {
                console.log(error)
                setCountries([])
                setSelectedCountry(null)
                setCapitalWeather(null)
            })
        } else {
            setFullList()
        }
    }, [search])

    useEffect(function () {
        if (selectedCountry !== null) {
            const promise = axios.get(`http://api.weatherstack.com/forecast?access_key=${api_key}&query=${selectedCountry.capital}`)
            promise.then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    setCapitalWeather(response.data)
                } else {
                    console.log("Error: issue fetching weather data")
                    setCapitalWeather(null)
                }
            }).catch(error => console.log(error))
        }
    }, [selectedCountry])

    return (<div>
        <div>
            find countries <input onChange={handleSearch} value={search} type="text"/>
        </div>
        <ul>
            {countries.map(country => <li key={country.alpha2Code}>{country.name}
                <button onClick={() => setSelectedCountry(country)}>show</button>
            </li>)}
        </ul>
        <div>
            {selectedCountry && <div>
                <h2>{selectedCountry.name}</h2>
                <p>capital {selectedCountry.capital}</p>
                <p>population {selectedCountry.population}</p>
                <h3>languages</h3>
                <ul>
                    {selectedCountry.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
                <img width={320} src={selectedCountry.flag} alt={`${selectedCountry.name} flag`}/>
            </div>}
            {capitalWeather && selectedCountry && <h3>Weather in {selectedCountry.capital}</h3>}
            {capitalWeather && <div>
                {capitalWeather.current.temperature && <p><strong>temperature:</strong> {capitalWeather.current.temperature} Celsius</p>}
                {capitalWeather.current.weather_icons[0] && <img src={capitalWeather.current.weather_icons[0]}/>}
                {capitalWeather.current.temperature && <p><strong>wind:</strong> {capitalWeather.current.wind_speed} mph direction {capitalWeather.current.wind_dir}</p>}
            </div>}
        </div>
    </div>);
}

export default App;
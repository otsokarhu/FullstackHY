import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayFilteredCountries from './DisplayFilteredCountries'
import DisplayAll from './DisplayAll'

const DisplayList = (props) => {
  return (props.haku.length === 0) ? <DisplayAll countries={props.countries} />
    : <DisplayAll countries={props.countries.filter(country => country.name.common.toLowerCase().includes(props.haku.toLowerCase()))} />

}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



  const filter = (event) => {
    event.preventDefault()
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)

  }

  return (
    <div>
      <h2>Countries</h2>
      <form onChange={filter}>
        <div>
          find countries<input value={newSearch} onChange={handleSearchChange} />
        </div>
      </form>


      <div>
        <DisplayFilteredCountries haku={newSearch} countries={countries} setNewSearch={setNewSearch} />
      </div>
    </div>
  )
}

export default App;

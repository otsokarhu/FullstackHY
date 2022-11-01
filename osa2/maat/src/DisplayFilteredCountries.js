import DisplayAll from './DisplayAll'
import DisplayExact from './DisplayExact'



const DisplayFilteredCountries = (props) => {
    const filteredcountries =
        props.countries.filter(country => country.name.common.toLowerCase().includes(props.haku.toLowerCase()))

    if (filteredcountries.length > 10) {
        return 'Too many matches, specify another filter'
    }

    else if (filteredcountries.length === 1) {
        return <DisplayExact name={filteredcountries[0].name.common} capital={filteredcountries[0].capital} area={filteredcountries[0].area} country={filteredcountries[0]} linkki={filteredcountries[0].flags.png} />
    }

    else if (filteredcountries.length > 0) {
        return <DisplayAll countries={props.countries.filter(country => country.name.common.toLowerCase().includes(props.haku.toLowerCase()))} setNewSearch={props.setNewSearch} />
    }



}

export default DisplayFilteredCountries
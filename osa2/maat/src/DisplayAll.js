import DisplayOne from './DisplayOne'

const DisplayAll = (props) => {
    return (
        <div>
            {props.countries.map(country =>
            (<DisplayOne
                key={country.name.official}
                name={country.name.common}
                setNewSearch={props.setNewSearch}
                country={country}
            />))}
        </div>
    )
}

export default DisplayAll
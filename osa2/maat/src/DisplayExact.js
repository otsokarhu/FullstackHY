import Weather from "./Weather"
const DisplayExact = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <div>capital {props.capital}</div>
            <div>area {props.area}</div>
            <h3>languages</h3>
            <div><ul>
                {Object.values(props.country.languages).map((language, i) =>
                    <li key={i}>{language}</li>
                )}
            </ul></div>



            <div><img className="Flag" src={props.linkki} /></div>
            <Weather capital={props.capital} />

        </div>
    )
}




export default DisplayExact
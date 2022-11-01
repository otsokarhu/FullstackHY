import DisplayAll from './DisplayAll'

const DisplayFiltered = (props) => {

    return (props.haku.length === 0) ? <DisplayAll persons={props.persons} handlePersonDelete={props.handlePersonDelete} person={props.person} />
        : <DisplayAll persons={props.persons.filter(person => person.name.toLowerCase().includes(props.haku.toLowerCase()))} handlePersonDelete={props.handlePersonDelete} person={props.person} />
}

export default DisplayFiltered
import DisplayOne from './Display1'

const DisplayAll = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        (<DisplayOne key={person.name} name={person.name} number={person.number} id={person.id} handlePersonDelete={props.handlePersonDelete} person={person} />))}
    </div>
  )
}

export default DisplayAll
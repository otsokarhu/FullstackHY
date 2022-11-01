import { useState, useEffect } from 'react'
import DisplayFiltered from './DisplayFiltered'
import personService from './services/persons'
import Notification from './Notification'
import Error from './Error'

const App = () => {
  const [persons, setPersons] = useState([
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(personssit => personssit.name === newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const personToChange = persons.find(personssit => personssit.name === newName)
      const changedPerson = { ...personToChange, number: newNumber }
      personService
        .update(personToChange.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== personToChange.id ? person : response.data))
          setNewName('')
          setNewNumber('')
          setNotification(`Number for ${personToChange.name} was updated`)
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })

    }
    else {
      personService
        .create(personObject)
        .then(response => {
          setPersons([...persons, response.data])
          setNotification(`Added ${personObject.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonDelete = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete)
        .catch(() => {
          setError(`Information of ${personToDelete.name} has already been removed from the server`)
          setTimeout(() => {
            setError(null)
          }, 2000)
        })

      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
  }



  const filter = (event) => {
    event.preventDefault()
  }


  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <form onChange={filter}>
        <div>
          filter shown with<input value={newSearch} onChange={handleSearchChange} />
        </div>
      </form>
      <div>
        <h2>add a new</h2>
        <form onSubmit={addPerson}>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <div><button type="submit">add</button></div>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        <DisplayFiltered haku={newSearch} persons={persons} handlePersonDelete={handlePersonDelete} /></div>
    </div>
  )

}

export default App

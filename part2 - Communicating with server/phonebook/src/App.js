import React, { useState, useEffect } from 'react'
import personService from './people'

const Filter = (props) => {
  return (
    <div>
      filter shown with<input value={props.newFilter} onChange={props.handleFilterChange}></input>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ namesToShow, removePerson }) => {
  return (
    <ul>
      {namesToShow.map(person =>
        <li key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button></li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const namesToShow = (newFilter === '')
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  const addName = (event) => {
    event.preventDefault()
    const idk = persons.map(person => person.name)
    if (!idk.includes(newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data);
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const p = persons.find(n => n.name.toUpperCase() === newName.toUpperCase())
        const changedPerson = { ...p, number: newNumber }

        personService
          .update(changedPerson)
          .then(returnedPerson => {
            setPeople(persons.map(x => x.id !== p.id ? x : returnedPerson))
          })
          .catch(error => {
            setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPeople(persons.filter(n => n.id !== changedPerson.id))
          })
      }
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPeople(persons.filter(p => p.id !== person.id))
          setErrorMessage(`${person.name} has been deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }



  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h1>add a new</h1>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <Persons namesToShow={namesToShow} removePerson={removePerson} />
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import personService from './services/numbers';
import './index.css'

const Notification = ({message, errorBool}) => {
  if (message === null) return null
  return (
    <div className={`${errorBool ? "error" : "notification"}`}>
      {message}
    </div>
  );
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleName} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.handleFilter} /> 
    </div>
  )
}

const Persons = (props) => {
  return (
    props.filteredPersons.map(person => 
    <li key={person.name}>{person.name} {person.number} <button onClick={() => {
      props.deletePerson(person.id, person.name)}
    }>delete</button> </li>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null);
  const [errorBool, setErrorBool] = useState(false);
  
  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    

    let found = false

    for(let i = 0; i < persons.length; i++) {
      if( persons[i].name === newName ) {
        if (window.confirm(`Number for ${newName} found! Replace details with new number?`)) {
          personService
          .update(persons[i].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setErrorBool(true);
            setNotification(`${newName} was already removed from server`)
            setTimeout(() => {
              setErrorBool(false);
              setNotification(null);
            }, 3000)
          })
        }
        found = true
        setNotification(`Updated ${newName}`)
        setTimeout(() => {
          setNotification(null);
        }, 3000)
        break;
      }
    }
    if (!found) {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotification(null);
        }, 3000)
      })
      .catch(error => {
        setErrorBool(true);
        setNotification(error.response.data.error)
        setTimeout(() => {
          setErrorBool(false);
          setNotification(null);
        }, 3000)
      })
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
    if (filter != '') setShowAll(false)
    else setShowAll(true)
  }

  const deletePerson = (id, name) => {
    console.log(id)
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      personService.remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      .then(alert(`${name} removed`))
    }
  }

  const filteredPersons = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} errorBool={errorBool}/>
      <Filter handleFilter={handleFilter} />
      <h2>add a new number</h2>
      <PersonForm addName={addName} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
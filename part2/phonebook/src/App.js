import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayPersons, setDisplayPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const setDisplayNumbers = (personsSetter, displayPersonsSetter) => {
    numberService
      .getAll()
      .then(numbers => {
        personsSetter(numbers)
        displayPersonsSetter(numbers)
      })
  }
  
  useEffect(() => {
    setDisplayNumbers(setPersons, setDisplayPersons)
  }, [])

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => { setErrorMessage(null) }, 5000)
  }

  const removePerson = (person) => {
    const remove = window.confirm(`Delete ${person.name}?`)
    if (remove) {
      const id = person.id
      console.log(`deleting user of id ${id}`)
    
      numberService.delete(id)
        .then(() => {setDisplayNumbers(setPersons, setDisplayPersons)})
        .catch(error => {
          const errMsg = `Information of ${person.name} has already been removed from server`
          showErrorMessage(errMsg)
          console.log(errMsg)
          const newPersons = persons.filter(p => p.id !== id)
          setPersons(newPersons)
          setDisplayPersons(newPersons)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={false}/>
      <Notification message={errorMessage} error={true} />
      <Filter persons={persons} displayPersonsSetter={setDisplayPersons}/>
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        personsSetter={setPersons}
        newName={newName}
        newNameSetter={setNewName}
        newNumber={newNumber}
        newNumberSetter={setNewNumber}
        displayPersonsSetter={setDisplayPersons}
        displayMessage={setMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={displayPersons}
        deletePerson={removePerson}
      />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayPersons, setDisplayPersons] = useState([])
  
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

  const deletePersonAtID = id => {
    console.log(`deleting user of id ${id}`)
    
    numberService.delete(id)
      .then(() => {setDisplayNumbers(setPersons, setDisplayPersons)})
      .catch(error => {
        alert(`The number with id ${id} was already deleted`)
        const newPersons = persons.filter(p => p.id !== id)
        setPersons(newPersons)
        setDisplayPersons(newPersons)
      })
  }

  const removePerson = (person) => {
    const remove = window.confirm(`Delete ${person.name}?`)
    if (remove) deletePersonAtID(person.id)
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
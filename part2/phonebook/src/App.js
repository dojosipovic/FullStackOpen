import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayPersons, setDisplayPersons] = useState([])
  
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
      setDisplayPersons(response.data)
    })
  }, [])


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
      <Persons persons={displayPersons} />
    </div>
  )
}

export default App
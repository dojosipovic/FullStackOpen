import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayPersons, setDisplayPersons] = useState(persons)

  

  const handleChangeInput = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const search = event.target.value.toLowerCase()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(search))
    setDisplayPersons(filtered)
  }

  const handleAdd = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    if (names.indexOf(newName) !== -1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
      setDisplayPersons(newPersons)
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button onClick={handleAdd} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayPersons.map(person =>
        <div key={person.id}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App

const PersonForm = ({ persons, personsSetter, newName, newNameSetter, newNumber, newNumberSetter, displayPersonsSetter }) => {
  const handleChangeInput = (event) => newNameSetter(event.target.value)

  const handleChangeNumber = (event) => newNumberSetter(event.target.value)

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
      personsSetter(newPersons)
      displayPersonsSetter(newPersons)
      newNameSetter("")
      newNumberSetter("")
    }
  }

  return(
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
  )
}

export default PersonForm
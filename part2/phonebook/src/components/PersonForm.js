import numberService from "../services/numbers"

const PersonForm = ({ persons, personsSetter, newName, newNameSetter, newNumber, newNumberSetter, displayPersonsSetter, displayMessage }) => {
  const handleChangeInput = (event) => newNameSetter(event.target.value)

  const handleChangeNumber = (event) => newNumberSetter(event.target.value)

  const showMessage = (message) => {
    displayMessage(message)
    setTimeout(() => { displayMessage(null) }, 5000)
  }

  const handleAdd = (event) => {
    event.preventDefault()

    // const names = persons.map(person => person.name) names.indexOf(newName) !== -1
    const index = persons.findIndex(person => person.name === newName)
    if (index !== -1) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if (replace) {
        const person = persons[index]
        const id = person.id
        const changedPerson = { ...person, number: newNumber }

        numberService
          .update(id, changedPerson)
          .then(returnedPerson => {
            const newPersons = persons.map(person => person.id !== id ? person : returnedPerson)
            personsSetter(newPersons)
            displayPersonsSetter(newPersons)
            newNameSetter("")
            newNumberSetter("")
            showMessage(`Added ${returnedPerson.name}`)
          })

      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      numberService
        .create(newPerson)
        .then(returnedPerson => {
          const newPersons = persons.concat(returnedPerson)
          personsSetter(newPersons)
          displayPersonsSetter(newPersons)
          newNameSetter("")
          newNumberSetter("")
          showMessage(`Added ${returnedPerson.name}`)
        })
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
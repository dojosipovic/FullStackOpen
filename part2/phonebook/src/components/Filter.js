const Filter = ({ persons, displayPersonsSetter}) => {
  const handleFilter = (event) => {
    const search = event.target.value.toLowerCase()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(search))
    displayPersonsSetter(filtered)
  }

  return (
    <div>
      filter shown with <input onChange={handleFilter}/>
    </div>
  )
}

export default Filter
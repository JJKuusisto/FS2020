import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleFilter}) => {
  return (
    <div>
      filter shown with: <input onChange={handleFilter} />
    </div>
  )
}

const Person = ({handleName, handleNumber, addPerson, newName, newNumber}) => {
  return (
    <div>
      <form>
        name: <input onChange={handleName} value={newName}/>
        number: <input onChange={handleNumber} value={newNumber} />
        <button onClick={addPerson} type='submit'>add</button>
      </form>
    </div>
  )
}

const Filtered = ({persons,filtered}) => {
  if(filtered.length === 0){
    return (
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)} 
      </div>
    )    
  } else {
      return(
      <div>
        {filtered.map(person => <p key={person.name}>{person.name} {person.number}</p>)} 
      </div>
    )
  }
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  },[]) 
  const handleName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)  
  }
  const handleFilter = (event) =>{
    const filter = event.target.value
    if(filter.length >= 0){
      console.log(filter)
      setFiltered(persons.filter(p => p.name.toLowerCase().includes(filter)))
    }
  }

  const addNewPerson = (event) =>{
    event.preventDefault()
    if((persons.filter(p => p.name === newName).length === 0))
    {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
    else 
    {
      alert(`${newName} on jo listalla!`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Person handleName={handleName} handleNumber={handleNumber} addPerson={addNewPerson} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Filtered persons={persons} filtered={filtered} /> 
    </div>
  )

}

export default App

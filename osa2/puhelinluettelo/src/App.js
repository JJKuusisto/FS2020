import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notify from './components/Notify'
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

const Filtered = ({persons,filtered, deletePerson}) => {
  if(filtered.length === 0){
    return (
      <div>
        {persons.map(person => <div key={person.name}>{person.name} {person.number}<button onClick={() => deletePerson(person.id)}>delete</button></div>)} 
      </div>
    )    
  } else {
      return(
      <div>
        {filtered.map(person => <div key={person.name}>{person.name} {person.number}<button onClick={()=> deletePerson(person.id)}>delete</button></div>)} 
      </div>
    )
  }
}
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtered, setFiltered ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[]) 
  const handleName = (event) => {
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

  const deletePerson = (id) =>{
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    personService
      .remove(id)
      .then(response =>{
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(person.name + " was removed")
        setTimeout(() =>{
          setErrorMessage(null)
        }, 3000)
      })
  }
  const addNewPerson = (event) =>{
    event.preventDefault()
    const exists =persons.filter(p => p.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(exists.length === 0)
    {
        personService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(returnedPerson.name+ " was added.")
            setTimeout(() =>{
              setErrorMessage(null)
            }, 3000)
          })
    }
      else 
      {
        if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
          personService
            .update(exists[0].id, newPerson)
            .then(updatedPerson =>{
            setPersons(persons.map(p => p.id !== exists[0].id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(exists[0].name + " was updated.")
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })    
      .catch(error =>{
        setErrorMessage(exists[0].name + " has already been removed from server")
        setTimeout(() =>{
          setErrorMessage(null)
        }, 3000)
      })
        }
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notify message={errorMessage} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Person handleName={handleName} handleNumber={handleNumber} addPerson={addNewPerson} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Filtered persons={persons} filtered={filtered} deletePerson={deletePerson}/> 
    </div>
  )

}

export default App

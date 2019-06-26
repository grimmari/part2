import React, { useState, useEffect } from 'react'

import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import personService from './sevices/person'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setNewFilterInput] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)




  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName)


    const nameObject = {
      name: newName,
      number: newNumber,
    }



    console.log(persons)

    var isInArray = persons.find(function (el) { return el.name === newName }) !== undefined;

    console.log(isInArray)
    if (!isInArray) {
      console.log('Saving')

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

        })

      setMessage(
        `Added ${nameObject.name} succesfully `
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)



    } else {
      const oldPerson = persons.find(function (el) { return el.name === newName })
      updatePerson(oldPerson)
    }


  }
  const updatePerson = (oldPerson) => {

    if (window.confirm(oldPerson.name + " is allready added to phonebook, replace old number with a new one?")) {
      const changePerson = { ...oldPerson, number: newNumber }
      var id = oldPerson.id
      personService
        .update(id, changePerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      setMessage(
        `Person ${changePerson.name} number changed succesfully `
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }
  const deletePerson = (id) => {
    console.log('poistetaan id: ' + id)
    const personName = persons.find(function (el) { return el.id === id })
    console.log(personName)
    if (window.confirm("Delete " + personName.name + " ?")) {
      personService
        .deleteItem(id)
        .then(returnedPerson => {
          setPersons(persons.filter(n => n.id !== id))

          setMessage(
            `Person ${personName.name} deleted succesfully `
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          
        }
                )
        .catch(error=>{
          setErrorMessage(
            `Information of ${personName.name} has allready removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
          
        

        })
        

    }
  }


  const nameToShow = persons.filter(person => person.name.toLowerCase().includes(filterInput))

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log('haku: ', event.target.value)
    setNewFilterInput(event.target.value.toLowerCase())
  }
  const handleDelete = (id) => {
    deletePerson(id)



  }



  const rows = () => nameToShow.map(person =>
    <Person key={person.id}
      person={person}
      handleDelete={(id) => handleDelete(id)}


    />

  )


  return (
    <div>
      <h2>Phonebook filterinput</h2>
      <Notification message={message} />
      <ErrorMessage message={errorMessage}  />

      <Filter value={filterInput} onChange={handleFilter} handleFilter={handleFilter} />
      <PersonForm onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />




      <h2>Numbers</h2>
      <div>{rows()}</div>
    </div>
  )

}

export default App


import React, {useState, useEffect} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterText, setFilterText] = useState('')

    useEffect(() => {
        personsService.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterText={filterText} setFilterText={setFilterText}/>
            <h3>Add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} createPerson={personsService.create} updatePerson={personsService.update}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filterText={filterText} deletePerson={personsService.remove} setPersons={setPersons}/>
        </div>
    )
}

export default App
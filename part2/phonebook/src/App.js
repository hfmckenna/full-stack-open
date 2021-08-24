import React, {useState, useEffect} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from "./Notification";
import personsService from './services/persons'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterText, setFilterText] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personsService.getAll().then(response => {
            setPersons(response.data)
        })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            {message && <Notification message={message} style={'success'}/>}
            {errorMessage && <Notification message={errorMessage} style={'error'}/>}
            <Filter filterText={filterText} setFilterText={setFilterText}/>
            <h3>Add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} createPerson={personsService.create} updatePerson={personsService.update} setMessage={setMessage}/>
            <h2>Numbers</h2>
            <Persons persons={persons} filterText={filterText} deletePerson={personsService.remove} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
        </div>
    )
}

export default App
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([])

    const [filterText, setFilterText] = useState('')

    useEffect(() => {
        console.log('effect')

        const eventHandler = response => {
            console.log('promise fulfilled')
            setPersons(response.data)
        }

        const promise = axios.get('http://localhost:3001/persons')
        promise.then(eventHandler)
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
                <Filter filterText={filterText} setFilterText={setFilterText}/>
            <h3>Add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Persons persons={persons} filterText={filterText} />
        </div>
    )
}

export default App
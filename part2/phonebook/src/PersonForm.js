import React, {useState} from "react";

const PersonForm = ({persons, setPersons, createPerson, updatePerson}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function addEntry(event) {
        event.preventDefault()
        if (typeof persons.find(person => person.name === newName) === "undefined" && newNumber && newName) {
            createPerson({name: newName, number: newNumber})
                .then(response => setPersons(persons.concat(response.data)))
                .catch(error => console.log(error))
        } else if (!newName) {
            alert(`Please enter a name`)
        } else if (!newNumber) {
            alert(`Please enter a phone number`)
        } else if (persons.find(person => person.name === newName)) {
            const existingPerson = persons.find(person => person.name === newName)
            const confirmation = window.confirm(`Do you want to update ${existingPerson.name} with new details?`)
            if (confirmation) {
                updatePerson(existingPerson.id, {name: newName, number: newNumber})
                    .then(response => setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data)))
                    .catch(error => console.log(error))
            }
        }
    }

    function handleNameChange(event) {
        setNewName(event.target.value)
    }

    function handleNumberChange(event) {
        setNewNumber(event.target.value)
    }

    return (<form onSubmit={addEntry}>
        <div>
            name: <input value={newName} onChange={handleNameChange}/>
            number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm
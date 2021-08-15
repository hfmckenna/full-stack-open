import React, {useState} from "react";

const PersonForm = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    function addEntry(event) {
        event.preventDefault()
        if (typeof persons.find(person => person.name === newName) === "undefined" && newNumber && newName) {
            setPersons(persons.concat({name: newName, number: newNumber}))
        } else if (!newName) {
            alert(`Please enter a name`)
        } else if (!newNumber) {
            alert(`Please enter a phone number`)
        } else {
            alert(`${newName} is already added to phonebook`)
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
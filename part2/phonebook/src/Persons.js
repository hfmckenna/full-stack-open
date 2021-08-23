import React from "react";

const Persons = ({persons, filterText, setPersons, deletePerson}) => {
    function matchName(name) {
        const lowerCaseName = name.toLowerCase()
        const lowerCaseInput = filterText.toLowerCase()
        return lowerCaseName.indexOf(lowerCaseInput)
    }

    function handleDeletion(id, name) {
        const confirmation = window.confirm(`Do you want to update delete ${name}?`)
        if (confirmation) {
            deletePerson(id)
                .then(response => setPersons(persons.filter(person => person.id !== id)))
                .catch(error => console.log(error))
        }
    }

    return (<ul>
        {persons.filter(person => matchName(person.name) > -1).map(person => <li
            key={person.id}>{person.name} {person.number}
            <button onClick={() => handleDeletion(person.id, person.name)}>Remove</button>
        </li>)}
    </ul>)
}

export default Persons
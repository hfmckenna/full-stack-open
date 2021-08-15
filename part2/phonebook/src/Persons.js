import React from "react";

const Persons = ({persons, filterText}) => {
    function matchName(name) {
        const lowerCaseName = name.toLowerCase()
        const lowerCaseInput = filterText.toLowerCase()

        return lowerCaseName.indexOf(lowerCaseInput)
    }

    return (<ul>
        {persons.filter(person => matchName(person.name) > -1).map(person => <li>{person.name} {person.number}</li>)}
    </ul>)
}

export default Persons
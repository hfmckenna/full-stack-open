const Total = ({allExercises}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const sumOfExercises = allExercises.reduce(reducer)

    return <p>Number of exercises {sumOfExercises}</p>
}

export default Total
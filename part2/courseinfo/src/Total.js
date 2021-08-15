const Total = ({parts}) => {
    const reducer = function (accumulator, {exercises}) {
        return accumulator + exercises
    }

    return <p>Number of exercises {parts.reduce(reducer, 0)}</p>
}

export default Total
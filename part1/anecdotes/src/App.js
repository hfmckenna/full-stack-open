import React, {useEffect, useState} from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [scores, setScores] = useState(initScores(anecdotes.length))
    const [topAnecdote, setTopAnecdote] = useState(0)

    function initScores(length) {
        return new Array(length + 1).join('0').split('').map(parseFloat)
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomise() {
        setSelected(getRandomInt(0, anecdotes.length))
    }

    function vote(selectedAnecdote) {
        const copy = [...scores]
        copy[selectedAnecdote] += 1
        setScores(copy)
    }

    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i + 1)) != -1) {
            indexes.push(i);
        }
        return indexes;
    }

    const arrayAllMaxIndexes = function () {
        // https://stackoverflow.com/questions/29493455/get-array-index-by-max-value
        return getAllIndexes(scores, Math.max.apply(null, scores));
    }

    // Setting new anecdote with most votes is side effect of scores changing, when it has changed find out if the
    useEffect(() => {
        // If the currently selected quote is one of the top scores change the top anecdote to that one, could randomise between equally scored quotes but that seems confusing
        const allTopScores = arrayAllMaxIndexes();
        if (allTopScores.indexOf(selected) > -1) {
            setTopAnecdote(selected);
        }
    }, [scores])

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <div>{anecdotes[selected]}</div>
            <div>has {scores[selected]} votes</div>
            <div>
                <button onClick={() => vote(selected)}>Vote</button>
                <button onClick={randomise}>Random Quote</button>
            </div>
            <h2>Anecdote with most votes</h2>
            <div>
                {anecdotes[topAnecdote]}
            </div>
        </div>
    )
}

export default App
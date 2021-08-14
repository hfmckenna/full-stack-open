import React, {useState} from 'react'

const Statistics = ({good, neutral, bad, total}) => {
    const score = good - bad > 0 ? good - bad : 0;
    const average = score / total || 0;
    const positive = (good / total) * 100 || 0;

    return (
        <div>
            <h2>statistics</h2>
            {total ? <div>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {total}</p>
                <p>average {average}</p>
                <p>positive {positive}</p>
            </div> : <p>No feedback given</p>}
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodScore = () => setGood(good + 1);
    const neutralScore = () => setNeutral(neutral + 1);
    const badScore = () => setBad(bad + 1);

    const total = good + neutral + bad;

    return (
        <div>
            <h2>give feedback</h2>
            <div>
                <button onClick={goodScore}>Good</button>
                <button onClick={neutralScore}>Neutral</button>
                <button onClick={badScore}>Bad</button>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
        </div>
    )
}

export default App
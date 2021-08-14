import React, {useState} from 'react'

const StatisticLine = ({text,score}) => {
    return <p>{text} {score}</p>
}

const Button = ({text, score, setScore}) => {
    const changeScore = () => setScore(score + 1);
    return <button onClick={changeScore}>{text}</button>
}

const Statistics = ({good, neutral, bad, total}) => {
    const score = good - bad > 0 ? good - bad : 0;
    const average = score / total || 0;
    const positive = (good / total) * 100 || 0;

    return (
        <div>
            <h2>statistics</h2>
            {total ? <div>
                <StatisticLine text="good" score={good}/>
                <StatisticLine text="neutral" score={neutral}/>
                <StatisticLine text="bad" score={bad}/>
                <StatisticLine text="all" score={total}/>
                <StatisticLine text="average" score={average}/>
                <StatisticLine text="positive" score={positive}/>
            </div> : <p>No feedback given</p>}
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good + neutral + bad;

    return (
        <div>
            <h2>give feedback</h2>
            <div>
                <Button text="Good" score={good} setScore={setGood}/>
                <Button text="Neutral" score={neutral} setScore={setNeutral}/>
                <Button text="Bad" score={bad} setScore={setBad}/>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
        </div>
    )
}

export default App
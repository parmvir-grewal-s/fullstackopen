import { useState } from 'react'

const MostPopular = (props) => {
  const maxIndex = props.points.indexOf(Math.max(...props.points));
  return (
    <div>
      {props.anecdotes[maxIndex]}
    </div>
  )
}

const Anecdote = (props) => {
  const nextAnecdote = () => {
    let rand = Math.floor(Math.random() * props.length)
    props.setSelected(rand)
  }
  return (
    <button onClick={nextAnecdote}>next anecdote</button>
  )
}

const Votes = (props) => {
  const addVote = () =>{
    const newPoints = props.points.map((c, i) => {
      if (i === props.selected) {
        return c + 1
      } else return c
    })
    props.setPoints(newPoints)
  }
  return (
    <div>
      has {props.points[props.selected]} votes <br/>
      <button onClick={addVote}>vote</button>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialPoints = [0,0,0,0,0,0,0,0]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initialPoints)


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <Votes points={points} setPoints={setPoints} selected={selected} />
      <Anecdote length={anecdotes.length} setSelected={setSelected} />
      <h1>Anecdote with the most votes</h1>
      <MostPopular points={points} anecdotes={anecdotes} />
    </div>
  )
}

export default App
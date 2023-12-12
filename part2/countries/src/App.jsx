import { useState } from 'react'
import axios from "axios";

const Search = (props) => {
  return (
      <input onChange={props.handleSearch}></input>
  )
}

const Warning = ({message}) => {
  return (
    <div>
      {message}
    </div>
  )
}

function App() {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }

  return (
    <div>
      find countries <Search handleSearch={handleSearch}/>
      <Warning message={message} />
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { render, screen } from '@testing-library/react'

import ErrorBoundary from './components/ErrorBoundary';
import BugList from './components/BugList';


function App() {
  const [bugs, setBugs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/bugs`)
      .then(res => setBugs(res.data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div className="container">
      <h1>Bug Tracker</h1>
      <ErrorBoundary>
        {error ? <p>Error: {error}</p> : <BugList bugs={bugs} />}
      </ErrorBoundary>
    </div>
  )
}


export default App;
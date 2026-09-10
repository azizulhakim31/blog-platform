import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Home />
      <section id="center">

        <div>
          <h1>Get started</h1>

        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    </>
  )
}

export default App

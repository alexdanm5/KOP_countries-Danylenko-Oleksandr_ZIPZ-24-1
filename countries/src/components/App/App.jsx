import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router';

import CardList from '../CardList/CardList'


const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<CardList />} />
        </Routes>
        {/* <Routes>
          <Route exact path="/country/:name" element={<CountryDetail />} />
        </Routes> */}
      </Router>
    </div>
  )
}

export default App

import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router';

import CardList from '../CardList/CardList'
import CountryDetail from '../CountryDetails/CountryDetails'


const App = () => {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<CardList />} />
        </Routes>
        <Routes>
          <Route exact path="/country" element={<CountryDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { ThemeProvider } from '../../context/ThemeContext';

import CardList from '../CardList/CardList'
import CountryDetail from '../CountryDetails/CountryDetails'

const App = () => {
  return (
    <ThemeProvider> 
        <div className="app">
          <Router>
            <Routes>
              <Route path="/" element={<CardList />} />
              <Route path="/country/:name" element={<CountryDetail />} />
            </Routes>
          </Router>
        </div>
    </ThemeProvider>
  )
}
export default App;
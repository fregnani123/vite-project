import { useState } from 'react';
import MenuPage from './components/Menu';
import PaginaLogin from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<PaginaLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path='/painel'
            element={isAuthenticated ? <MenuPage /> : <Navigate to='/' />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


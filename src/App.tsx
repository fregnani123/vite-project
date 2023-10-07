import { useState } from 'react';
import MenuPage from './components/Menu';
import PaginaLogin from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyComponent from './components/views/queryProdutos';
import RegisterProduct from './components/views/register';
import SalesScreen from './components/views/SalesScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/SalesScreen' element={<SalesScreen/>} />
          <Route path='/newProduct' element={ <RegisterProduct/>}/>
          <Route path='/queryProdutos' element={<MyComponent/>}/>
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


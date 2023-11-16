import { useState } from 'react';
import MenuPage from './components/Menu';
import PaginaLogin from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyComponent from './components/views/queryProdutos';
import RegisterProduct from './components/views/register';
import SalesScreen from './components/views/SalesScreen';
import DetalhesVenda from './components/views/detalhesVenda'
import DetalheES from './components/views/controleES'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/detalhes'element={<DetalhesVenda/>}/>
          <Route path='/SalesScreen' element={<SalesScreen />} />
          <Route path='/newProduct' element={<RegisterProduct />} />
          <Route path='/queryProdutos' element={<MyComponent />} />
          <Route path='controleES' element={<DetalheES/>}/>
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


import { useState } from 'react';
import MenuPage from './components/Menu';
import PaginaLogin from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyComponent from './components/views/queryProdutos';
// import RegisterProduct from './components/views/register';
import SalesScreen from './components/views/SalesScreen';
import DetalhesVenda from './components/views/detalhesVenda'
import DetalheES from './components/views/controleES'
import CadastrarCliente from './components/views/cliente';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<PaginaLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path='/painel' element={isAuthenticated ? <MenuPage /> : <Navigate to='/'/>}/>
          <Route path='/detalhes' element={isAuthenticated ? <DetalhesVenda /> : <Navigate to='/' />}/>
          <Route path='/SalesScreen' element={isAuthenticated ? <SalesScreen /> : <Navigate to='/' /> } />
          {/* <Route path='/newProduct' element={<RegisterProduct />} /> */}
          <Route path='/queryProdutos' element={isAuthenticated ? <MyComponent /> : <Navigate to='/' />} />
          <Route path='/cadastroCliente' element={isAuthenticated ? <CadastrarCliente/> : <Navigate to='/' />}/>
          <Route path='controleES' element={isAuthenticated ? <DetalheES /> : <Navigate to='/'/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


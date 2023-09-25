import MenuPage from './components/Menu'
import PaginaLogin from './components/index';
import './App.css'

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<PaginaLogin/>} />
          <Route path='/painel' element={<MenuPage></MenuPage>}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App;

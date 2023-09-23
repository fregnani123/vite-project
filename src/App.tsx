import './App.css'
import exit from './assets/imagens gestaoLite/sair.png'

function App() {
 
  return (
    <body>
      <div className='menu'>
        <h4 className='nameStore'>Capim Dourado Saboaria</h4>
        <h4 className='nameMenu'>Menu</h4>
        <ul>
          <li className='listaMenu'>Realizar Venda</li>
          <li className='listaMenu'>Cadastro de Produtos</li>
         
          <li className='listaMenu'>Detalhes de Venda</li>
          <li className='listaMenu'>Controle de Entrada/Saída</li>
          <li className='listaMenu' id='exit'>
            <img src={exit} className='imgExit' />
            <span className='textoSair'>Exit</span>
          </li>
        </ul>
      </div>
      <div className='menuScreen'></div>
    </body>
    
    
  )
}

export default App

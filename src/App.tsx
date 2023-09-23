import './App.css'
import exit from './assets/imagens gestaoLite/sair.png';
import imgMenu from './assets/imagens gestaoLite/menu-aberto.png'

function App() {
 
  return (
    <body>
      <div className='menu'>
        <h4 className='nameStore'><img src={imgMenu} className='imgMenu' /> <span className='nameStoreS'>Gestão Lite</span></h4>
        <h4 className='nameMenu'>Menu</h4>
        <ul>
          <li className='listaMenu'>Realizar Venda</li>
          <li className='listaMenu'>Cadastro de Produtos</li>
         
          <li className='listaMenu'>Detalhes de Venda</li>
          <li className='listaMenu'>Controle de Entrada/Saída</li>
        </ul>

        <p className='exit'>
          <img src={exit} className='imgExit' />
          <p className='textoSair'>Sair</p>
        </p>

      </div>
      <div className='menuScreen'></div>
    </body>
    
    
  )
}

export default App

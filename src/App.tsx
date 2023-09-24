import './App.css';
import imgExit from './assets/imagens gestaoLite/sair.png';
import imgMenu from './assets/imagens gestaoLite/menu-aberto.png';
import imgVendas from './assets/imagens gestaoLite/carrinho-de-compras.png';
import imgCadastroProduto from './assets/imagens gestaoLite/cadastro de produtos.png';
import imgDetalhesVendas from './assets/imagens gestaoLite/detalhes vendas.png';
import imgEntradaSaida from './assets/imagens gestaoLite/grafico-de-barras.png';

function App() {
 
  return (
    <body>
      <div className='container'>
        
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
          <img src={imgExit} className='imgExit' />
          <p className='textoSair'>Sair</p>
        </p>

      </div>

        <div className='menuScreen'>
          
        <ul className='ulMenuScreen'>
            <li className='realizarVenda'><p>Realizar Venda</p><img className='imgClass' src={imgVendas} alt="" />
            </li>
            <li className='cadastroProdutos'><p>Cadastro de Produtos</p><img className='imgClass' src={imgCadastroProduto} alt="" /></li>
        </ul> 
          <ul className='ulMenuScreen'>
            <li className='detalhesVenda'><p>Realizar Venda</p><img className='imgClass' src={imgDetalhesVendas} alt="" /></li>
            <li className='entradaSaida'><p>Realizar Venda</p><img className='imgClass' src={imgEntradaSaida} alt="" /></li>
          </ul>
          
      </div>

   </div>
    </body>
    
    
  )
}

export default App

import './menu.css';
import imgVendas from '../assets/imagens gestaoLite/carrinho-de-compras.png';
import imgCadastroProduto from '../assets/imagens gestaoLite/cadastro de produtos.png';
import imgDetalhesVendas from '../assets/imagens gestaoLite/detalhes vendas.png';
import imgEntradaSaida from '../assets/imagens gestaoLite/grafico-de-barras.png';
import imgCliente from '../assets/imagens gestaoLite/cliente.png';
import imgSuporte from '../assets/imagens gestaoLite/suporte.png';
import MenuPainel from './MenuToolbar';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div >
            <MenuPainel />
            <div className='container'>
            <div className='menuScreen'>
                <ul className='ulMenuScreen'>
                        <Link to="/SalesScreen" className='link'><li className='realizarVenda'>
                        <p>Realizar Venda</p>
                        <img className='imgClass' src={imgVendas} alt="" />
                        </li></Link>
                        <Link className='link' to="/newProduct"><li className='cadastroProdutos'>
                        <p>Cadastro de Produtos</p>
                        <img className='imgClass' src={imgCadastroProduto} alt="" />
                        </li></Link>
                </ul>
                <ul className='ulMenuScreen'>
                        <Link to="/detalhes" className='link'><li className='detalhesVenda'>
                        <p>Detalhes de Venda</p>
                        <img className='imgClass' src={imgDetalhesVendas} alt="" />
                        </li></Link> 
                        <Link to='/controleES' className='link' ><li className='entradaSaida'>
                        <p>Controle Entrada/Saída</p>
                        <img className='imgClass' src={imgEntradaSaida} alt="" />
                        </li> </Link>
                </ul>
                <ul className='ulMenuScreen'>
                        <Link to="/cadastroCliente" className='link'><li className='detalhesVenda'>
                        <p>Cadastrar novo Cliente</p>
                        <img className='imgClass' src={imgCliente} alt="" />
                        </li></Link> 
                        <Link to='/controleES' className='link' ><li className='entradaSaida'>
                        <p>Suporte</p>
                        <img className='imgClass' src={imgSuporte} alt="" />
                        </li> </Link>
                </ul>
            </div>
            </div>
        </div>
    );
}

export default Menu;
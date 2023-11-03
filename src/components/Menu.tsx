import './menu.css';
import imgVendas from '../assets/imagens gestaoLite/carrinho-de-compras.png';
import imgCadastroProduto from '../assets/imagens gestaoLite/cadastro de produtos.png';
import imgDetalhesVendas from '../assets/imagens gestaoLite/detalhes vendas.png';
import imgEntradaSaida from '../assets/imagens gestaoLite/grafico-de-barras.png';
import MenuPainel from './MenuToolbar';

function Menu() {
    return (
        <div className='container'>
            <MenuPainel/>
            <div className='menuScreen'>
                <ul className='ulMenuScreen'>
                    <li className='realizarVenda'>
                        <p>Realizar Venda</p>
                        <img className='imgClass' src={imgVendas} alt="" />
                    </li>
                    <li className='cadastroProdutos'>
                        <p>Cadastro de Produtos</p>
                        <img className='imgClass' src={imgCadastroProduto} alt="" />
                    </li>
                </ul>
                <ul className='ulMenuScreen'>
                    <li className='detalhesVenda'>
                        <p>Detalhes de Venda</p>
                        <img className='imgClass' src={imgDetalhesVendas} alt="" />
                    </li>
                    <li className='entradaSaida'>
                        <p>Controle Entrada/Saída</p>
                        <img className='imgClass' src={imgEntradaSaida} alt="" />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
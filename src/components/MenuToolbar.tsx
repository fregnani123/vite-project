
import { Link } from 'react-router-dom';
import imgExit from '../assets/imagens gestaoLite/sair.png';
import imgMenu from '../assets/imagens gestaoLite/menu-aberto.png';
import './menu.css';

function MenuToolbar() {
  
    // Lista de itens do menu
    const menuItens = [
        { id: '1', texto: 'Painel de Controle', to: '/painel' },
        { id: '2', texto: 'Realizar Venda', to: '/SalesScreen' },
        { id: '3', texto: 'Detalhes de Venda', to: '/detalhes' },
        { id: '4', texto: 'Produto Cadastro/Informações', to: '/queryProdutos' },
        { id: '4', texto: 'Produto Alterar/Excluir', to: '/queryProdutos' },
        { id: '5', texto: 'Cadastro de Cliente', to: '/cadastroCliente' },
        { id: '6', texto: 'Controle de Entrada/Saída', to: '/controleES' },
    ];
    
    return (
        <div className='menu'>
            <h4 className='nameStore'>
                <img src={imgMenu} className='imgMenu' alt='Menu' />
                <span className='nameStoreS'>Gestão Lite</span>
            </h4>
            <h4 className='nameMenu'>Menu</h4>
            <ul>
                {menuItens.map((item) => (
                    <Link className='link' to={item.to}><li key={item.id}
                        className='listaMenu'
                    >  {item.texto} 
                    </li> </Link>
                ))}
            </ul>
            <Link to="/" className='exit'>
                <img src={imgExit} className='imgExit' alt='Sair' />
                <p className='textoSair'>Sair</p>
            </Link>
        </div>
    );
}

export default MenuToolbar;

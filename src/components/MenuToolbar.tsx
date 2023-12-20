
import { Link } from 'react-router-dom';
import imgExit from '../assets/imagens gestaoLite/sair.png';
import imgMenu from '../assets/imagens gestaoLite/menu-aberto.png';
import './menu.css';

function MenuToolbar() {
  
    // Lista de itens do menu
    const menuItens = [
        { id: '1', texto: 'Painel de controle', to: '/painel' },
        { id: '2', texto: 'Realizar venda', to: '/SalesScreen' },
        { id: '3', texto: 'Detalhes de venda', to: '/detalhes' },
        { id: '4', texto: 'Cadastro de produto', to: '/cadastrarProduto' },
        { id: '5', texto: 'Alterar / Excluir produto', to: '/queryProdutos' },
        { id: '6', texto: 'Cadastro de cliente', to: '/cadastroCliente' },
        { id: '7', texto: 'Controle de entrada / saída', to: '/controleES' },
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

import './menu.css'
import imgExit from '../assets/imagens gestaoLite/sair.png';
import imgMenu from '../assets/imagens gestaoLite/menu-aberto.png';
import { Link } from 'react-router-dom';

function MenuToolbar() {
    return(<div className='menu'>
        <h4 className='nameStore'>
            <img src={imgMenu} className='imgMenu' />
            <span className='nameStoreS'>Gestão Lite</span>
        </h4>
        <h4 className='nameMenu'>Menu</h4>
        <ul>
            <Link className='link' to="/SalesScreen"><li className='listaMenu'>Realizar Venda</li></Link>
            <Link className='link' to= "/detalhes"><li className='listaMenu'>Detalhes de Venda</li></Link>
            <Link className='link' to="/newProduct"><li className='listaMenu'>Cadastro de Produtos</li></Link>
            <Link to="/queryProdutos" className='link'><li className='listaMenu'>Informções Produtos</li></Link >
            <Link to="/controleES" className='link'><li className='listaMenu'>Controle de Entrada/Saída</li></Link>
        </ul>
        <div className='exit'>
            <img src={imgExit} className='imgExit' />
            <p className='textoSair'>Sair</p>
        </div>
    </div>)
}

export default MenuToolbar; 
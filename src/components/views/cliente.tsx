import MenuToolbar from '../MenuToolbar';
import '../views/cliente.css'


function cadastroCliente() {
    return (<div className='containerCliente'>
        <MenuToolbar />
        <div className='divInformacoes'>
        <form className='formCliente'>    
                <label>Cliente</label>
                <input type="text"/>
                <label>CPF</label>
                <input type="text"/>
                <label>RG</label>
                <input type="text"/>
                <label>Data Nasc.</label>
                <input type="text"/>
                <label>Endereço</label>
                <input type="text"/>
                <label>Ocupação</label>
                <input type="text"/>
                <label></label>
                <input type="text"/>
        </form>
            
        </div>
    </div>)
};

export default cadastroCliente;
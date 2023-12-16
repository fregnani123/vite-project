import MenuToolbar from '../MenuToolbar';
import '../views/cliente.css'


function cadastroCliente() {
    return (<div className='containerCliente'>
        <MenuToolbar />
        <div className='divInformacoes'>
            <p className='tituloCadastro'>Cadastro de Cliente</p>
            <form className='formCliente'>  
                
                <label className='labelClienteCadastro'>Nome</label>
                <input className='inputClienteCadastro' type="text" />
                
                <label className='labelCPFCadastro'>CPF</label>
                <input className='inputCPFCadastro' type="text" />
                
                <label className='labelRGCadastro'>RG</label>
                <input className='inputRGCadastro' type="text" />
                
                <label className='labelNascimentoCadastro'>Data Nasc.</label>
                <input className='inputNascimentoCadastro' type="date" />
                
                <label className='labelEnderecoCadastro'>Endereço</label>
                <input className='inputEnderecoCadastro' type="addres" />
                
                {/* <label>Bairro</label>
                <input type="text"/>
                <label>Cidade</label>
                <input type="text"/>
                <label>Ocupação</label>
                <input type="text"/>
                <label>Fone/Celular</label>
                <input type="text"/>
                <label>E-mail</label>
                <input type="text"/> */}
        </form>
            
        </div>
    </div>)
};

export default cadastroCliente;
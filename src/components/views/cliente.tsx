import MenuToolbar from '../MenuToolbar';
import '../views/cliente.css'

function cadastroCliente() {
    return (<div className='containerCliente'>
        <div className='divCorrecaoFundo'></div>
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

                <label className='labelNumeroCadastro'>Numero</label>
                <input className='inputNumeroCadastro' type="addres" />

                <label className='labelBairroCadastro'>Bairro</label>
                <input className='inputBairroCadastro' type="text" />
                
                <label className='labelCidadeCadastro'>Cidade</label>
                <input className='inputCidadeCadastro' type="text" />

                <label className='labelUFCadastro'>UF</label>
                <input className='inputUFCadastro' type="text" />
                
                <label className='labelOcupacaoCadastro'>Ocupação</label>
                <input className='inputOcupacaoCadastro' type="text" />
                
                <label className='labelFoneCadastro'>Fone/Celular</label>
                <input className='inputFoneCadastro' type="text" />
                
                <label className='labelEmailCadastro'>E-mail</label>
                <input className='inputEmailCadastro' type="text"/>
        </form>
            
        </div>
    </div>)
};

export default cadastroCliente;
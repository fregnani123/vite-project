import axios from 'axios';
import MenuToolbar from '../MenuToolbar';
import '../views/cliente.css';
import { useState, useEffect } from 'react';

interface cliente {
    cliente: string;
    CPF: string;
    RG: string;
    dataNascimento: Date;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    UF: string;
    fone: string;
    email: string;
    ocupacao: string;
}

function CadastroCliente() {
    const [dataCli, setData] = useState<cliente[]>([])
    const [nome, setNome] = useState('');
    const [cpfFake, setCPF] = useState('');
    const [rgFake, setRG] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');
    const [fone, setFone] = useState('');
    const [email, setEmail] = useState('');
    const [ocupacao, setOcupacao] = useState('');
   
   

    const handleSubmit = async () => {
        const data = {
            cliente: nome,
            cpfFake: cpfFake,
            rgFake: rgFake,
            nascimento: nascimento,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            fone: fone,
            email: email,
            ocupacao: ocupacao,
        };

        const urlCliente = 'http://localhost:3000/criarNovoCliente';

        try {
            const response = await axios.post(urlCliente, data);
            console.log('Cliente cadastrado com sucesso:', response.data);

            // Reset the state values
            setNome('');
            setCPF('');
            setRG('');
            setNascimento('');
            setEndereco('');
            setNumero('');
            setBairro('');
            setCidade('');
            setUF('');
            setFone('');
            setEmail('');
            setOcupacao('');
        } catch (error) {
            console.error('Erro ao registrar cliente:', error);
        }
    };
    const urlGetClientes = 'http://localhost:3000/clientes';

    useEffect(() => {
        axios.get(urlGetClientes)
            .then(responseCli => {
               setData(responseCli.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []); 
   

    return (<div className='containerCliente'>
        <div className='divCorrecaoFundo'></div>
        <MenuToolbar />

        <div className='divInformacoes'>
           
            <h1 className='tituloCadastro'>Cadastro de Cliente <h1 className='teste'>{dataCli.map(clientes => (
                <p>{clientes.cliente}</p>
            ))}</h1></h1>

            <form className='formCliente' onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }} >  
                
                <label className='labelClienteCadastro'>Nome</label>
                <input onChange={(e) => {
                    setNome(e.target.value);
                }} value={nome} className='inputClienteCadastro' type="text" />
                
                <label className='labelCPFCadastro'>CPF</label>
                <input onChange={(e) => {
                    setCPF(e.target.value);
                }} value={cpfFake} className='inputCPFCadastro' type="text" />
                
                <label className='labelRGCadastro'>RG</label>
                <input onChange={(e) => {
                    setRG(e.target.value);
                }} value={rgFake} className='inputRGCadastro' type="text" />
                
                <label className='labelNascimentoCadastro'>Data Nasc.</label>
                <input onChange={(e) => {
                    setNascimento(e.target.value);
                }} value={nascimento} className='inputNascimentoCadastro' type="date" />
                
                <label className='labelEnderecoCadastro'>Endereço</label>
                <input onChange={(e) => {
                    setEndereco(e.target.value);
                }} value={endereco} className='inputEnderecoCadastro' type="text" />

                <label className='labelNumeroCadastro'>Numero</label>
                <input onChange={(e) => {
                    setNumero(e.target.value);
                }} value={numero} className='inputNumeroCadastro' type="text" />

                <label className='labelBairroCadastro'>Bairro</label>
                <input onChange={(e) => {
                    setBairro(e.target.value);
                }} value={bairro} className='inputBairroCadastro' type="text" />
                
                <label className='labelCidadeCadastro'>Cidade</label>
                <input onChange={(e) => {
                    setCidade(e.target.value);
                }} value={cidade} className='inputCidadeCadastro' type="text" />

                <label className='labelUFCadastro'>UF</label>
                <input onChange={(e) => {
                    setUF(e.target.value);
                }} value={uf} className='inputUFCadastro' type="text" />
                
                <label className='labelOcupacaoCadastro'>Ocupação</label>
                <input onChange={(e) => {
                    setOcupacao(e.target.value);
                }} value={ocupacao} className='inputOcupacaoCadastro' type="text" />
                
                <label className='labelFoneCadastro'>Fone/Celular</label>
                <input onChange={(e) => {
                    setFone(e.target.value);
                }} value={fone} className='inputFoneCadastro' type="text" />
                
                <label className='labelEmailCadastro'>E-mail</label>
                <input onChange={(e) => {
                    setEmail(e.target.value);
                }} value={email} className='inputEmailCadastro' type="text" />
                
                <button  className='cadastrarCliente'>Cadastrar</button>
        </form>
            
           

        </div>
    </div>)
};

export default CadastroCliente;
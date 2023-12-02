import { useState } from "react";
import axios from "axios";
import '../views/register.css'

function RegisterProduct() {

    const [EAN, setEAN] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(0);
    const [active, setActive] = useState(false);

    const [nomeAlterar, setNomeAlterar] = useState("");
    const [descricaoAlterar, setDescricaoAlterar] = useState("");
    const [precoAlterar, setPrecoAlterar] = useState(0);
    const [categoriaAlterar, setCategoriaAlterar] = useState("");
    const [estoqueAlterar, setEstoqueAlterar] = useState(0);


    const url = "http://localhost:3000/newProduto";

    const handleSubmit = async () => {
    
        const data = {
            nome: nome,
            codigoDeBarras: EAN,
            descricao: descricao,
            preco: preco,
            categoria: categoria,
            estoque: estoque,
        };

        try {
            const response = await axios.post(url, data);
            console.log("Produto registrado com sucesso:", response.data);
            // Limpar os campos do formulário após o registro bem-sucedido
            setNome("");
            setPreco(0);
            setDescricao("");
            setPreco(0);
            setCategoria("");
            setEstoque(0);
            setEAN('');
        } catch (error) {
            console.error("Erro ao registrar produto:", error);
        }
    };


    const alterarInformacoesProduto = async () => {
         
        const urlAlterar = `http://localhost:3000/updateProduto/${EAN}`;
       
        const dataAlterar = {
            nome: nomeAlterar,
            descricao: descricaoAlterar,
            preco: precoAlterar,
            categoria: categoriaAlterar,
            estoque: estoqueAlterar,
        };

        try {
           const response = await axios.patch(urlAlterar,dataAlterar)
            console.log("Produto registrado com sucesso:", response.data);
            setNome("");
            setPreco(0);
            setDescricao("");
            setPreco(0);
            setCategoria("");
            setEstoque(0);
            setEAN('');
        } catch (error) {
            console.error("Erro ao Alterar produto:", error);
        }
     }


    const toglleMenu = () => {
     setActive(!active)
    }
    
    return (<div className="register-container">
     <div className="divForm">
            <button className={active ? 'titulo' : 'tituloActive'} onClick={(event) => {
                event.preventDefault()
                toglleMenu()
            }}>Cadastrar Produto</button>
            <form className={active ? 'formRegisterNone' : 'formRegister'} onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}>
                <label className="labelEANCadastro">EAN (Código de barras)</label>
                    <input className="inputEANCadastro"
                        type="number"
                        value={parseInt(EAN)}
                        onChange={(e) => setEAN(e.target.value)}
                    />
                <label className="labelNomeCadastro">Nome do Produto</label>
                <input className="inputNomeCadastro"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                <label className="labelDescricaoCadastro">Descrição</label>
                <input className="inputDescricaoCadastro"
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                <label className='labelPrecoCadastro'>Preço de Venda</label>
                <input
                    className="inputPrecoCadastro"
                    type="number"
                    value={preco === 0 ? "" : preco}
                    onChange={(e) => {
                        
                        setPreco(parseFloat(e.target.value));
                    }}
                />
                <label className="labelCategoriaCadastro">Categoria:</label>
                    <select className="inputCategoriaCadastro" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option className="selecionar">Selecionar</option>
                        <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
                        <option value="Beleza e Cuidados Pessoais">Beleza e Cuidados Pessoais</option>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Calçados">Calçados</option>
                        <option value="Eletrodomésticos">Eletrodomésticos</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Esportes e Fitness">Esportes e Fitness</option>
                        <option value="Joias e Relógios">Joias e Relógios</option>
                        <option value="Livros">Livros</option>
                        <option value="Móveis">Móveis</option>
                        <option value="Roupas">Roupas</option>
                    </select>
                <label className="labelEstoqueCadastro">Estoque Inicial</label>
                <input className="inputEstoqueCadastro"
                        type="number"
                        value={estoque}
                        onChange={(e) => setEstoque(parseInt(e.target.value, 10))}
                    /><br></br> 
                <button type="submit" className="button">Cadastrar</button>
                
            </form>
            <button className={active ? 'tituloAlterarActive' : 'tituloAlterar'} onClick={toglleMenu} >Alterar Informações do Produto</button>
            <form className={active ? 'formRegister2None' : 'formRegister2'} onSubmit={(event) => {
                event.preventDefault()
                alterarInformacoesProduto()
            }}>
                <label className="labelEANCadastro">EAN (Código de barras)</label>
                    <input className="inputEANCadastro"
                        type="number"
                        value={parseInt(EAN)}
                        onChange={(e) => setEAN(e.target.value)}
                    />
                <label className="labelNomeCadastro">Alterar Nome do Produto</label>
                <input className="inputNomeCadastro"
                        type="text"
                        value={nomeAlterar}
                        onChange={(e) => setNomeAlterar(e.target.value)}
                    />
                <label className="labelDescricaoCadastro">Alterar Descrição</label>
                <input className="inputDescricaoCadastro"
                        type="text"
                        value={descricaoAlterar}
                    onChange={(e) => setDescricaoAlterar(e.target.value)}
                    />
                <label className='labelPrecoCadastro'>Alterar Preço</label>
                <input
                    className="inputPrecoCadastro"
                    type="number"
                    value={precoAlterar === 0 ? "" : precoAlterar}
                    onChange={(e) => {
                        
                        setPrecoAlterar(parseFloat(e.target.value));
                    }}
                />

                <label className="labelCategoriaCadastro">Alterar Categoria:</label>
                <select className="inputCategoriaCadastro" value={categoriaAlterar} onChange={(e) => setCategoriaAlterar(e.target.value)}>
                        <option className="selecionar">Selecionar</option>
                        <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
                        <option value="Beleza e Cuidados Pessoais">Beleza e Cuidados Pessoais</option>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Calçados">Calçados</option>
                        <option value="Eletrodomésticos">Eletrodomésticos</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Esportes e Fitness">Esportes e Fitness</option>
                        <option value="Joias e Relógios">Joias e Relógios</option>
                        <option value="Livros">Livros</option>
                        <option value="Móveis">Móveis</option>
                        <option value="Roupas">Roupas</option>
                    </select>
                <label className="labelEstoqueCadastro">Alterar Estoque</label>
                <input className="inputEstoqueCadastro"
                        type="number"
                        value={estoqueAlterar}
                    onChange={(e) => setEstoqueAlterar(parseInt(e.target.value, 10))}
                    /><br></br> 
                  <button type="submit" className="button">Alterar</button>
            </form>
        </div></div>
    );
}

export default RegisterProduct;

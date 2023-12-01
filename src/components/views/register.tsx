import { useState } from "react";
import axios from "axios";
import '../views/register.css'

function RegisterProduct() {
    const [nome, setNome] = useState("");
    const [EAN, setEAN] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(0);
    const [active, setActive] = useState(false)


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
        } catch (error) {
            console.error("Erro ao registrar produto:", error);
        }
    };


    const alterarInformacoesProduto = async () => {
         
        const dataAlterar = {
            nome: nome,
            codigoDeBarras: EAN,
            descricao: descricao,
            preco: preco,
            categoria: categoria,
            estoque: estoque,
        };

        try {
           
        } catch (error) {
            console.error("Erro ao Alterar produto:", error);
        }
     }


    const toglleMenu = () => {
       setActive(!active)
    }
    

    return (<div className="register-container">
     <div className="divForm">
            <button className="titulo" onClick={toglleMenu}>Cadastrar Produto</button>
            <form className={active ? 'formRegister' :'formRegisterNone'} onSubmit={handleSubmit}>
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

            <button onClick={toglleMenu} className="tituloAlterar">Alterar Informações do Produto</button>
            <form className={active ? 'formRegisterNone' : 'formRegister2'} onSubmit={handleSubmit}>
                
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
                <label className="labelDescricaoCadastro">Alterar Descrição</label>
                <input className="inputDescricaoCadastro"
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                <label className='labelPrecoCadastro'>Alterar Preço</label>
                <input
                    className="inputPrecoCadastro"
                    type="number"
                    value={preco === 0 ? "" : preco}
                    onChange={(e) => {
                        
                        setPreco(parseFloat(e.target.value));
                    }}
                />

                <label className="labelCategoriaCadastro">Alterar Categoria:</label>
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
                <label className="labelEstoqueCadastro">Alterar Estoque</label>
                <input className="inputEstoqueCadastro"
                        type="number"
                        value={estoque}
                        onChange={(e) => setEstoque(parseInt(e.target.value, 10))}
                    /><br></br> 
                  <button type="submit" className="button">Alterar</button>
            </form>
        </div></div>
    );
}

export default RegisterProduct;

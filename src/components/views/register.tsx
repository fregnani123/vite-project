import { useState } from "react";
import axios from "axios";
import MenuToolbar from "../MenuToolbar";
import '../views/register.css'

function RegisterProduct() {
    const [nome, setNome] = useState("");
    const [EAN, setEAN] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(0);

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

    return (<div className="register-container">
      
      <MenuToolbar />  <div className="divForm">
        <h1 className="titulo">Cadastrar Produto</h1>
            <form className="formRegister" onSubmit={handleSubmit}>
            
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
                  <button type="submit" className="button">Registrar Produto</button>
            </form>
        </div></div>
    );
}

export default RegisterProduct;

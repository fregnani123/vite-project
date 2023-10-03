import { useState } from "react";
import axios from "axios";

function RegisterProduct() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(0);

    const url = "http://localhost:3000/newProduto";

    const handleSubmit = async () => {
    
        const data = {
            nome: nome,
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
            setDescricao("");
            setPreco(0);
            setCategoria("");
            setEstoque(0);
        } catch (error) {
            console.error("Erro ao registrar produto:", error);
        }
    };

    return (
        <div>
            <h1>Registrar Produtos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Produto:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label>Categoria:</label>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                </div>
                <div>
                    <label>Estoque:</label>
                    <input
                        type="number"
                        value={estoque}
                        onChange={(e) => setEstoque(parseInt(e.target.value, 10))}
                    />
                </div>
                <button type="submit">Registrar Produto</button>
            </form>
        </div>
    );
}

export default RegisterProduct;

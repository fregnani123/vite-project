import axios from "axios";
import { useEffect, useState } from "react";
import '../views/queryProdutos.css';
import MenuToolbar from "../MenuToolbar";

interface Produto {
    _id: string ;
    nome: string;
    preco: Number;
    descricao: string;
    categoria: string;
    estoque: string;
}

function MyComponent() {
    const url = "http://localhost:3000/findProduto";
    const [data, setData] = useState<Produto[]>([]); // Tipando o estado como um array de objetos Produto
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data);
                
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []); // O array vazio significa que o efeito é executado apenas uma vez, quando o componente é montado.

    return (<div className="query-Container">
        <MenuToolbar />
        <div className="register-queryProdutos">
            <h1 className="registroH1">Informações Produtos</h1> 
            <table className="my-table">
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((produto, index) => (
                        <tr key={index}>
                            <td>{produto.nome}</td>
                            <td>R$  {produto.preco.toFixed(2)}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.categoria}</td>
                            <td>{produto.estoque}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            </div></div>
    );
}

export default MyComponent;



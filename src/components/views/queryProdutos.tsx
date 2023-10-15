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
    codigoDeBarras: number;
}

function MyComponent() {
    const url = "http://localhost:3000/findProduto";
    const [data, setData] = useState<Produto[]>([]); 
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

    return (<div className="query-Container">
        <div><MenuToolbar/></div>
        <div className="register-queryProdutos">
        <h1 className="registroH1">Informações Produtos</h1> 
            <table className="my-table">
                <thead>
                    <tr>
                        <th>EAN</th>
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
                            <td>{produto.codigoDeBarras}</td>
                            <td>
                            {produto.nome}</td>
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



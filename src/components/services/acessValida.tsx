import axios from "axios";
import { useEffect, useState } from "react";

interface Produto {
    nome: string;
    preco: string;
    descricao: string;
    categoria: string;
}

function MyComponent() {
    const [data, setData] = useState<Produto[]>([]); // Tipando o estado como um array de objetos Produto
   console.log(data)
    useEffect(() => {
        axios.get("http://localhost:3000/findProduto")
            .then(response => {
                setData(response.data);
                
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []); // O array vazio significa que o efeito é executado apenas uma vez, quando o componente é montado.

    return (
        <div>
            <p>
                {data.map((produto, index) => (
                    <span key={index}>{produto.nome}</span>
                ))}
            </p>
            <h1>Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Produto 1</td>
                        <td>R$ 50.00</td>
                        <td>Descrição do Produto 1.</td>
                    </tr>
                    <tr>
                        <td>Produto 2</td>
                        <td>R$ 35.00</td>
                        <td>Descrição do Produto 2.</td>
                    </tr>
                    <tr>
                        <td>Produto 3</td>
                        <td>R$ 70.00</td>
                        <td>Descrição do Produto 3.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


export default MyComponent;



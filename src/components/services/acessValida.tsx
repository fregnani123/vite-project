import axios from "axios";
import { useEffect, useState } from "react";

interface Produto {
    nome: string;
    preco: Number;
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
            <table>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((produto, index) => (
                        <tr key={index}>
                            <td>{produto.nome}</td>
                            <td>{produto.preco.toFixed(2)}</td>
                            <td>{produto.descricao}</td>
                            <td>{produto.categoria}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyComponent;



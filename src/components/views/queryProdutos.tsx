import axios from "axios";
import { useEffect, useState } from "react";
import '../views/queryProdutos.css';
import MenuToolbar from "../MenuToolbar";
import '../views/queryProdutos.css'

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
        <div className="menu"><MenuToolbar/></div>
        <div className="register-queryProdutos">
            <div className="containerTable">
                <h1 className="registroH1">Informações Produtos</h1>
                <ul className="ulInformacoes">
                    <li>
                        <span className="thEAN">EAN</span>
                        <span className="thNome">Nome do Produto</span>
                        <span className="thPreco">Preço</span>
                        <span className="thDescricao">Descrição</span>
                        <span className="thCategoria">Categoria</span>
                        <span className="thEstoque">Estoque</span>
                        <span></span>
                    </li>
                    <li className="correcaoEspacoLi"></li>
                    {data.map((produto, index) => (
                        <li className="liSpan" key={index}>
                            <span className="thEAN1">{produto.codigoDeBarras}</span>
                            <span className="thNome1" >{produto.nome}</span>
                            <span className="thPreco1" >{produto.preco.toFixed(2)}</span>
                            <span className="thDescricao1">{produto.descricao}</span>
                            <span className="thCategoria1">{produto.categoria}</span>
                            <span className="thestoque1">{produto.estoque}</span>
                            <span className="thestoque">correçãoTabela</span>
                        </li>
                    ))}</ul>
            </div>
            </div></div>
    );
}

export default MyComponent;



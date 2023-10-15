import MenuToolbar from "../MenuToolbar";
import axios from "axios";
import { useEffect, useState } from "react";

import '../views/queryProdutos.css';

interface Produto {
    _id: string;
    nome: string;
    codigoDeBarras: number;
    preco: number;
    descricao: string;
    categoria: string;
    estoque: string;
    qtd: number;
}

function SalesScreen() {
    const [data, setData] = useState<Produto[]>([]);
    const [codigo, setCodigo] = useState("");
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [qtd, setQtd] = useState("");

    // O URL da solicitação deve ser construído corretamente
    const url = "http://localhost:3000/findProduto";

    useEffect(() => {
        // Certifique-se de que a URL esteja corretamente construída
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

    useEffect(() => {
        calcularTotal();
    }, [carrinho]); //atualiza o estado do carrinho sempre que for add um novo item

    function encontrarProdutoPorCodigo(codigo: number) {
        return data.find(produto => produto.codigoDeBarras === codigo);
    }

    function adicionarAoCarrinho() {
        const produtoSelecionado = encontrarProdutoPorCodigo(Number(codigo));
        if (produtoSelecionado) {
            setCarrinho([...carrinho, produtoSelecionado]);
        }
        setCodigo(""); // Limpa o campo de código
    }

    function calcularTotal() {
        const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
        setTotal(novoTotal);
    }

    return (
        <div className="sales-container">
            <div><MenuToolbar /></div>
            <div className="cupom">
                <div className="cupom-div">
                    <h1 className="tituloVenda">Tela de Venda</h1>
                    <div className="cupom-form">
                        <ul className="carrinho">
                            {carrinho.map((produto, index) => (
                                <li className="liCarrinho" key={index}>{`${produto.codigoDeBarras} ${produto.nome} - R$ ${produto.preco.toFixed(2)}`}</li>
                            ))}
                        </ul>
                        <form >
                            <label className="labelCodigo">Código de Barras
                                <input
                                    type="number"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />
                            </label>
                            <label className="labelQtd">Qtd<input type="number" value={parseInt(qtd)} onChange={(e) => setQtd(e.target.value)}/></label>
                            <button onClick={(e) => {
                                e.preventDefault();
                                adicionarAoCarrinho();
                            }} className="buttonSales">Adicionar</button>
                            <button className="buttonFinalizar" type="submit">Finalizar</button>
                        </form>
                    </div>
                    <span className="totalCarrinho">Total R$ <span className="span">{parseFloat(total.toFixed(2))}</span></span>
                </div>
            </div>
        </div>
    );
}

export default SalesScreen;

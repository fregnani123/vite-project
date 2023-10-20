import MenuToolbar from "../MenuToolbar";
import axios from "axios";
import { useEffect, useState } from "react";
import carrinhoTotal from '../../assets/imagens gestaoLite/carrinhoTotal.png';
import imgRemover from '../../assets/imagens gestaoLite/remover.png';

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
        if (produtoSelecionado && parseInt(qtd) > 0) {
            const produtoComQtd = { ...produtoSelecionado, qtd: parseInt(qtd)};
            setCarrinho([...carrinho, produtoComQtd]);
            setCodigo(""); // Limpa o campo de código
            setQtd(""); // Limpa o campo de quantidade
        } else {
            console.log("Erro: Produto não encontrado ou quantidade inválida.");
        }
    }

    function calcularTotal() {
        const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco * (produto.qtd || 1), 0);
        setTotal(novoTotal);
    }

    function removerDoCarrinho(index: number) {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1); // Remove o item do carrinho
        setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
        calcularTotal(); // Recalcula o total
    }

    return (
        <div className="sales-container">
            {/* <div><MenuToolbar/></div> */}
            <div className="cupom">
                <div className="cupom-div">
                    
                    <div className="cupom-form">
                        <h1 className="tituloVenda">Tela de Venda</h1>
                        <ul className="carrinho"><br />
                            <li className="liInformacao"><tr className="trInformacao">
                                <th className="thCliente" >Cliente:<select className="selectCliente">
                                    <option value="">Consumidor</option>
                                </select></th>
                                <th className="thNome" ></th>
                                <th className="thPag" > Pgto:<select className="selectPag">
                                    <option value="">À vista</option>
                                </select></th>
                                <th className="thExcluir">Excluir produto ↓</th>
                            </tr></li>
                            {carrinho.map((produto, index) => (
                                <li className="liCarrinho" key={index}>
                                    {`${produto.codigoDeBarras} ${produto.nome} ${produto.qtd}x - R$ ${produto.preco.toFixed(2)}`}
                                    <span className="btnRemover" onClick={() => removerDoCarrinho(index)}><img className="imgRemover" src={imgRemover} /> ←</span>
                                </li>
                            ))}
                        </ul>
                        <form >
                            <label className="labelEAN">EAN:
                            </label> <input className="inputEAN"
                                type="number"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <label className="labelQtd">Qtd:</label>
                            <button onClick={(e) => {
                                e.preventDefault();
                                adicionarAoCarrinho();
                            }} className="buttonSales">Adicionar</button>
                            <button className="buttonFinalizar" type="submit">Finalizar</button>
                        </form>
                    </div>
                    <span className="totalCarrinho"> <img className="carrinhoTotal" src={carrinhoTotal} />Total R$ <span className="span">{total.toFixed(2)}</span></span>

                </div>
            </div>
        </div>
    );
}

export default SalesScreen;

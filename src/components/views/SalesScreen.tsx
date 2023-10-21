// import MenuToolbar from "../MenuToolbar";
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
    const [TRD, setTRD] = useState(0);
   

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
    
    function calcularTroco(trocoRecebido: number, total: number): number {
        return trocoRecebido - total;
    }

    function removerDoCarrinho(index: number) {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1); // Remove o item do carrinho
        setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
        calcularTotal(); // Recalcula o total
    }

      useEffect(() => {
        calcularTotal();
    }, [carrinho,TRD]); //atualiza o estado do carrinho sempre que for add um novo item

    return (
        <div className="sales-container">
            {/* <div><MenuToolbar/></div> */}
            <div className="cupom">
                <div className="cupom-div">
                    
                    <div className="cupom-form">
                        <h1 className="tituloVenda">Tela de Venda</h1>
                        <ul className="carrinho"><br />
                            <li className="liInformacao"><span className="trInformacao">
                                <span className="thCliente" >Cliente:<select className="selectCliente">
                                    <option value="">Consumidor</option>
                                </select></span>
                                <span className="thNome" ></span>
                                <span className="thPag" > Pgto:<select className="selectPag">
                                    <option value="">À vista</option>
                                </select></span>
                                <span className="thExcluir">Excluir produto ↓</span>
                            </span></li>
                            {carrinho.map((produto, index) => (
                                <li className="liCarrinho" key={index}>
                                    {`${produto.codigoDeBarras} ${produto.nome} ${produto.qtd}x - R$ ${produto.preco.toFixed(2)}`}
                                    <span className="btnRemover" onClick={() => removerDoCarrinho(index)}><img className="imgRemover" src={imgRemover} /> ←</span>
                                </li>
                            ))}
                        </ul>
                        <form>
                            <span className="labelEAN">EAN:
                            </span><input className="inputEAN"
                                type="number"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <span className="labelQtd">Qtd:</span>
                            <input type="number" className="inputQtd" value={parseInt(qtd)} onChange={(e) => {
                                const inputValue = e.target.value
                                if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) >= 0) {
                                    setQtd(inputValue)
                                }

                            }} />
                            <button onClick={(e) => {
                                e.preventDefault();
                                adicionarAoCarrinho();
                            }} className="buttonAdd">Adicionar</button>
                            <span className="labelTRD">Total recebido em Dinheiro:</span>

                            <input
                                type="number"
                                className="inputTRD"
                                value={TRD === 0 ? "" : TRD}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (inputValue === "" || inputValue === "0" || (inputValue.startsWith("0.") && inputValue.length === 2)) {
                                        // Limpar o TRD se estiver vazio, "0" ou "0." (deixe apenas o ponto decimal)
                                        setTRD(0);
                                    } else {
                                        const parsedValue = parseFloat(inputValue);
                                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                                            setTRD(parsedValue);
                                        }
                                    }
                                }}
                            />

                            <span className="troco">Troco R$:</span>
                            <span className={`spanTroco ${calcularTroco(TRD, total) < 0 ? 'vermelho' : 'gray'}`}>
                                {isNaN(TRD) ? '0.00' : calcularTroco(TRD, total).toFixed(2)
                                }
                            </span>

                            <span className="total">Total R$:</span><span className="spanTotal">{total.toFixed(2)}</span>
                        </form>
                    </div>
                    <span className="totalCarrinho"><img className="carrinhoTotal" src={carrinhoTotal} /><button className="buttonFinalizar" type="submit">Finalizar Venda</button></span>

                </div>
            </div>
        </div>
    );
}

export default SalesScreen;

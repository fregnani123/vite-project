// Importação das bibliotecas e módulos necessários
import axios from "axios";
import { useEffect, useState } from "react";
import imgRemover from '../../assets/imagens gestaoLite/remover.png';
import imgCarrinho from '../../assets/imagens gestaoLite/carrinho-de-compras.png';
import lupa from '../../assets/imagens gestaoLite/procurar.png';
import '../views/queryProdutos.css';

// Definição de tipos (interfaces)
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

interface Relatorio {
    cliente: string;
    total: number;
    formaPagamento: string;
    dinheiroRecebido: number;
    carrinho: Produto[]; // Uso do tipo Produto[] para representar um array de produtos
}

function SalesScreen() {
    // Estados
    const [data, setData] = useState<Produto[]>([]);
    const [codigo, setCodigo] = useState("");
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [Qtd, setQtd] = useState("");
    const [inputTroco, setTroco] = useState(0);
    const [search, setSearch] = useState('');
    const [formaPagamento, setPagamento] = useState('À Vista');
    const [adicionarCliente, setCliente] = useState("Consumidor");
    const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
    const [relatoriosDoDia, setRelatoriosDoDia] = useState<Relatorio[]>([]);

    console.log(JSON.stringify(relatoriosDoDia));

    // Função para finalizar a venda
    function finalizarVenda() {
        if (inputTroco === 0) {
            alert("Preencha todos os campos antes de finalizar a compra.");
            return;
        }
        const relatorioVenda: Relatorio = {
            cliente: adicionarCliente,
            total: total,
            formaPagamento: formaPagamento,
            dinheiroRecebido: inputTroco,
            carrinho: carrinho,
        };

        setRelatorio(relatorioVenda);

        // Adicione o relatório ao array relatoriosDoDia
        setRelatoriosDoDia([...relatoriosDoDia, relatorioVenda]);

        // Limpe outros estados como o carrinho, código, etc.
        setCarrinho([]);
        setCodigo("");
        setQtd("");
        setTroco(0);
        setSearch("");
    }

    console.log(relatorio);

    // Construção da URL para solicitar os produtos (verifique a configuração correta)
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

    // Filtrar produtos com base na pesquisa por código
    const filterData = search.length >= 9 ? data.filter(produto => produto.codigoDeBarras.toString().includes(search)) : [];

    // Função para encontrar um produto com base no código
    function encontrarProdutoPorCodigo(codigo: number) {
        return data.find(produto => produto.codigoDeBarras === codigo);
    }

    // Função para adicionar um item ao carrinho
    function adicionarAoCarrinho() {
        const produtoSelecionado = encontrarProdutoPorCodigo(parseInt(codigo));
        if (produtoSelecionado && parseInt(Qtd) > 0) {
            const produtoComQtd = { ...produtoSelecionado, qtd: parseInt(Qtd) };
            setCarrinho([...carrinho, produtoComQtd]);
            setCodigo(""); // Limpa o campo de código
            setQtd(""); // Limpa o campo de quantidade
        } else {
            alert("Produto não encontrado ou quantidade inválida.");
        }
    }

    // Função para calcular o total da compra
    function calcularTotal() {
        const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco * (produto.qtd || 1), 0);
        setTotal(novoTotal);
    }

    // Função para calcular o troco
    function calcularTroco(trocoRecebido: number, total: number): number {
        return trocoRecebido - total;
    }

    const resultadoTroco = calcularTroco(inputTroco, total);

    // Função para remover um item do carrinho
    function removerDoCarrinho(index: number) {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1); // Remove o item do carrinho
        setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
        calcularTotal(); // Recalcula o total
    }

    useEffect(() => {
        calcularTotal();
    }, [carrinho, inputTroco]); // Atualiza o estado do carrinho sempre que um novo item é adicionado

    // Renderização do componente
    return (
        <div className="venda-container">
            <p className="titulo-venda">Tela de Vendas</p>
               <div className="entradas-saidas">
                    <ul className="cupom-form">
                        <li className="descricaoItens">
                            <span className="cod">cod.</span>
                            <span className="index">num.</span>
                            <span className="nome-produto">nome</span>
                            <span className="Qtd">Qtd</span>
                            <span className="preco-produto">valor</span>
                            <span className="remover" >excluir</span>
                        </li><li className="correcaoEspacoLi"></li>
                        {carrinho.map((produto, index) => (
                            <li className="liCriar" key={index}>
                                <span className="cod1">{produto.codigoDeBarras}</span>
                                <span className="index1">{`${index + 1}:`}</span>
                                <span className="nome-produto1">{produto.nome}</span>
                                <span className="Qtd1">{`${produto.qtd}x`}</span>
                                <span className="preco-produto1">{produto.preco.toFixed(2)}</span>
                                {<img
                                    onClick={() => {
                                        removerDoCarrinho(index)
                                    }}
                                    className="imgRemover" src={imgRemover} />}
                            </li>
                        ))}
                    </ul>

                    <form>
                        <label className="labelPagamento">Pagamento</label>
                        <input
                            onChange={(e) => {
                                setPagamento(e.target.value)
                            }}
                            value={formaPagamento} className="inputPagamento" type="string" />

                        <label className="labelCliente">Cliente</label>
                        <input
                            onChange={(e) => {
                                setCliente(e.target.value)
                            }}
                            value={adicionarCliente} className="inputCliente" type="string" />

                        <label className="labelEAN">EAN</label>
                        <input
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCodigo(e.target.value)
                            }}
                            value={codigo} className="inputEAN" type="number" />

                        <label className="labelQtd">Qtd</label>
                        <input
                            className="inputQtd" type="number"
                            value={Qtd}
                            onChange={(e) => {
                                setQtd(e.target.value)
                            }
                            }
                        />

                        <label className="labelTRD">Dinheiro recebido</label>
                        <input value={inputTroco === 0 ? "" : inputTroco} onChange={(e) => {
                            setTroco(parseFloat(e.target.value))
                        }} className="inputTRD" type="number" />

                        <button className="buttonAdd"
                            onClick={(e) => {
                                e.preventDefault()
                                adicionarAoCarrinho()
                            }} >Adicionar Item</button>
                    </form>

                    <form onSubmit={(e) => { e.preventDefault(); finalizarVenda(); }}>
                        <button className="buttonFinalizar" type="submit">
                            Finalizar Compra
                        </button>
                    </form>

                    <div className="informacoes-cupom">
                        <p className="total" >Total da Venda</p>
                        <span className={"spanTotal"}>{`R$ ${total.toFixed(2)}`}</span>
                        <p className="troco">Troco</p>
                        <span className="spanTroco">{resultadoTroco >= 0 ? `R$ ${resultadoTroco.toFixed(2)}` : 'R$ 0.00'}</span>
                    </div>
                    <span className="carrinhoSpan">Carrinho de Compras</span>
                    <ul className="produto-encontrado">
                       
                        {filterData.map((produto, index) => (
                            <li key={index}>
                                {`${produto.nome}: ${produto.descricao} `}
                            </li>
                    
                        ))}
                    </ul>
                    {/* <img className="lupa" src={lupa} /> */}
                </div>
           
            {/* <footer className="footerVenda">© 2023 Fabiano Fregnani - Front-End Developer. v1.0</footer> */}
        </div>
    );
}

export default SalesScreen;

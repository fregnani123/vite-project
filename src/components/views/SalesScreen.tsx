// import MenuToolbar from "../MenuToolbar";
import axios from "axios";
import { useEffect, useState } from "react";
// import carrinhoTotal from '../../assets/imagens gestaoLite/carrinhoTotal.png';
import imgRemover from '../../assets/imagens gestaoLite/remover.png';
import imgCarrinho from '../../assets/imagens gestaoLite/carrinho-de-compras.png';
import lupa from '../../assets/imagens gestaoLite/procurar.png'
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
interface Relatorio {
    cliente: string;
    total: number;
    formaPagamento: string;
    dinheiroRecebido: number;
    carrinho: Produto[]; // Use o tipo Produto[] para representar um array de produtos
}

function SalesScreen() {
    const [data, setData] = useState<Produto[]>([]);
    const [codigo, setCodigo] = useState("");
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [Qtd, setQtd] = useState("");
    const [inputTroco, setTroco] = useState(0);
    const [search, setSearch] = useState('');
    const [formaPagamento, setPagamento] = useState('À Vista');
    const [adicionarCliente, setCliente] = useState("Consumidor")
    const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
    const [relatoriosDoDia, setRelatoriosDoDia] = useState<Relatorio[]>([]);

    console.log(JSON.stringify(relatoriosDoDia))
 

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
        setSearch("")
    }


  
    console.log(relatorio)

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




    const filterData = search.length >= 9 ? data.filter(produto => produto.codigoDeBarras.toString().includes(search)) : [];


    function encontrarProdutoPorCodigo(codigo: number) {
        return data.find(produto => produto.codigoDeBarras === codigo);
    }



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

    function calcularTotal() {
        const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco * (produto.qtd || 1), 0);
        setTotal(novoTotal);
    }

    function calcularTroco(trocoRecebido: number, total: number): number {
        return trocoRecebido - total;
    }

    const resultadoTroco = calcularTroco(inputTroco, total)


    function removerDoCarrinho(index: number) {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1); // Remove o item do carrinho
        setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
        calcularTotal(); // Recalcula o total

    }

    useEffect(() => {
        calcularTotal();

    }, [carrinho, inputTroco]); //atualiza o estado do carrinho sempre que for add um novo item

    return (
        <div className="venda-container" >
            <div className="acabamento-tela" >
                <div className="entradas-saidas">
                    <h1 className="titulo-venda">Tela de venda</h1>
                    <ul className="cupom-form">
                        <li className="descricaoItens"><span className="cod">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cod. &nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span className="index">num. &nbsp;&nbsp;</span>
                            <span className="nome-produto">nome &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span className="Qtd">Qtd</span>
                            <span className="preco-produto">valor</span>
                            <span className="remover" >excluir</span>
                        </li>


                        {carrinho.map((produto, index) => (
                            <li className="liCriar" key={index}>
                                <span className="cod">{produto.codigoDeBarras}</span>
                                <span className="index">{`${index + 1}:`}</span>
                                <span className="nome-produto">{produto.nome}</span>
                                <span className="Qtd">{`${produto.qtd}x`}</span>
                                <span className="preco-produto">{produto.preco.toFixed(2)}</span>
                                {<img
                                    onClick={() => {
                                        removerDoCarrinho(index)
                                    }}
                                    className="imgRemover" src={imgRemover} />}
                            </li>
                        ))}
                    </ul>

                    <form>

                        <label className="labelPagamento">
                            Pagamento</label ><input
                            onChange={(e) => {
                                setPagamento(e.target.value)
                            }}
                            value={formaPagamento} className="inputPagamento" type="string" />

                        <label className="labelCliente">
                            Cliente</label ><input
                            onChange={(e) => {
                                setCliente(e.target.value)
                            }}
                            value={adicionarCliente} className="inputCliente" type="string" />

                        <label className="labelEAN">
                            EAN</label ><input
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCodigo(e.target.value)
                            }}
                            value={codigo} className="inputEAN" type="numbem" />

                        <label className="labelQtd">
                            Qtd</label><input
                            className="inputQtd" type="number"
                            value={Qtd}
                            onChange={(e) => {
                                setQtd(e.target.value)

                            }
                            }

                        />
                        <label className="labelTRD">Dinheiro recebido</label><input value={inputTroco === 0 ? "" : inputTroco} onChange={(e) => {
                            setTroco(parseFloat(e.target.value))
                        }} className="inputTRD" type="number" />

                        <button className="buttonAdd"
                            onClick={(e) => {
                                e.preventDefault()
                                adicionarAoCarrinho()
                            }} >Adicionar ao carrinho</button>
                    </form>
                   
                    <form onSubmit={(e) => { e.preventDefault(); finalizarVenda();  }}>
                        <button className="buttonFinalizar" type="submit">
                            Finalizar Compra
                        </button>
                    </form>




                    <div className="informacoes-cupom">
                        <p className="total" >Total da Compra</p>
                        <span className={"spanTotal"}>{`R$ ${total.toFixed(2)}`}</span>
                        <p className="troco">Troco</p>
                        <span className="spanTroco">{resultadoTroco >= 0 ? `R$ ${resultadoTroco.toFixed(2)}` : 'R$ 0.00'}</span>

                    </div>
                    <img className="imgCarrinho" src={imgCarrinho} />
                    <ul className="produto-encontrado">
                        {filterData.map((produto, index) => (
                            <li key={index}>
                                {`${produto.nome}: ${produto.descricao} `}
                            </li>
                        ))}
                    </ul>


                    <img className="lupa" src={lupa} />
                </div>
            </div><footer className="footerVenda">© 2023 Fabiano Fregnani - Front-End Developer. v1.0</footer></div>

    );
}

export default SalesScreen;

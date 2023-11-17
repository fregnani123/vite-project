// Importação das bibliotecas e módulos necessários
import axios from "axios";
import { useEffect, useState } from "react";
import imgRemover from '../../assets/imagens gestaoLite/remover.png';
import { format } from 'date-fns'
import lupa from '../../assets/imagens gestaoLite/procurar.png';
import '../views/style.css';
import MenuToolbar from "../MenuToolbar";

// Definição de tipos (interfaces)
interface Produto {
    _id: string;
    nome: string;
    codigoDeBarras: number;
    preco: number;
    descricao: string;
    categoria: string;
    estoque: number;
    qtd: number;
}

// interface Relatorio {
//     cliente: string;
//     total: number;
//     formaPagamento: string;
//     dinheiroRecebido: number;
//     carrinho: Produto[]; // Uso do tipo Produto[] para representar um array de produtos
//     dateVenda: Date;
// }

function SalesScreen() {
    // Estados
    const [data, setData] = useState<Produto[]>([]);
    const [codigo, setCodigo] = useState("");
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [Qtd, setQtd] = useState("");
    const [inputTroco, setTroco] = useState(0);
    const [search, setSearch] = useState("");
    const [formaPagamento, setPagamento] = useState("");
    const [adicionarCliente, setCliente] = useState("Consumidor");
    const [dateVenda, setDateVenda] = useState(new Date());


    // Função para formatar a data no formato brasileiro
    const formatDate = (date: Date) => {
        return format(date, 'dd/MM/yyyy');
    };

    // Função para atualizar estoque
    
    const atualizarEstoqueNoBanco = async (produtoDoCarrinho:Produto) => {
        const urlEstoque = `http://localhost:3000/updateProduto/${produtoDoCarrinho._id}`;
        try {
            const novaQuantidade = produtoDoCarrinho.qtd || 1;
            const response = await axios.patch(urlEstoque, { estoque: produtoDoCarrinho.estoque - novaQuantidade });
            console.log("Estoque atualizado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar estoque:", error);
        }
    }

    // Função para finalizar a venda
    const cancelarVenda = () => {
        setCarrinho([]);
        setCodigo("");
        setQtd("");
        setTroco(0);
        setSearch("");
    }

    const finalizarVenda = async () => {
        if (inputTroco === 0){
            alert("Preencha todos os campos antes de finalizar a compra.");
            return;
        } else if (total <= 0) {
            alert("O carrinho está sem itens adicione itens para finalizar a venda.");
            return   
        } else if (formaPagamento === "Selecionar" || formaPagamento === "") {
            alert("Escolha a forma de pagamento para finalizar a venda.");
            return  
        }

        const novoCarrinho = [...carrinho];

        try {
            for (const produtoDoCarrinho of novoCarrinho) {
                const novaQuantidade = produtoDoCarrinho.qtd || 1;
                const urlEstoque = `http://localhost:3000/updateProduto/${produtoDoCarrinho._id}`;

                // Verifique se a quantidade no carrinho é menor ou igual ao estoque disponível
                if (produtoDoCarrinho.estoque >= novaQuantidade) {
                    const response = await axios.patch(urlEstoque, { estoque: produtoDoCarrinho.estoque - novaQuantidade });
                    console.log("Estoque atualizado com sucesso:", response.data);
                } else {
                    console.error("Quantidade no carrinho maior que o estoque disponível:", produtoDoCarrinho);
                    // Lide com o erro de estoque insuficiente
                }
            }
            const relatorioVenda = {
                cliente: adicionarCliente,
                total: total,
                formaPagamento: formaPagamento,
                dinheiroRecebido: inputTroco,
                carrinho: carrinho,
                dateVenda: dateVenda,
            };
            const response = await axios.post(urlPost, relatorioVenda);

            console.log("Produto registrado com sucesso:", response.data);
            setCarrinho([]);
            setCodigo("");
            setQtd("");
            setTroco(0);
            setSearch("");
            setPagamento("");
            window.location.reload()
        } catch (error) {
            console.error("Erro ao registrar produto:", error);
        }
    }

    // Construção da URL para solicitar os produtos (verifique a configuração correta)
    const url = "http://localhost:3000/findProduto";
    const urlPost = "http://localhost:3000/detalhesdevendaPost"

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
            setSearch("")
            setCodigo("")
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
    }, [carrinho, inputTroco,]); // Atualiza o estado do carrinho sempre que um novo item é adicionado
    
    // Renderização do componente
    return (
        <div className="venda-container">
            <div className="z-index"></div>
            <div className="ajusteContainer">
                <div className="entradas-saidas">
                    <div className="menu"> <MenuToolbar /></div>
                    <div className=" ulCupon">
                        <h1 className="tituloVendas">Tela de Vendas</h1>
                    <ul className="cupom-form"><span className="carrinhoSpan">Carrinho de Compras</span>
                        <li className="descricaoItens">
                            <span className="cod">EAN</span>
                            <span className="index">num.</span>
                            <span className="nome-produto">Produto</span>
                            <span className="Qtd">Qtd</span>
                            <span className="preco-produto">Preço</span>
                            <span className="remover" >Excluir</span>
                        </li><li className="correcaoEspacoLi"></li>
                        {carrinho.map((produto, index) => (
                            <li className="liCriar1" key={index}>
                                <span className="index1">{`${index + 1}`}</span>
                                <span className="cod1">{produto.codigoDeBarras}</span>
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
                    <div className="formBusca">
                        <span className="Produto">Produto</span>
                        <span className="produtoPreco">Preço</span>
                        <span className="estoque">Estoque</span>
                        <span className="buscarItem">Buscar item</span>
                        <span className="dadosProduto">Dados do Produto</span>
                        <ul className="produto-encontrado">
                    {filterData.map((produto, index) => (
                        <li key={index}>
                            {`${produto.nome} - ${produto.descricao}`}
                        </li>
                    ))}</ul>
                        
                        <ul className="precoEncotrado">
                    {filterData.map((produto, index) => (
                        <li key={index}>
                            {`${produto.preco.toFixed(2)}`}
                        </li>

                    ))}</ul>
                        <ul className="estoqueAtual">
                            {filterData.map((produto, index) => (
                                <li key={index}>
                                    {`${produto.estoque}`}
                                </li>
                            ))}</ul>

                            <form>
                                <label htmlFor="EAN" className="buscar">Digite EAN &rarr;</label>
                                <label htmlFor="EAN" className="labelEAN">EAN</label><input
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCodigo(e.target.value)
                            }}
                            value={codigo} id="EAN" className="EAN" type="number" />
                                <label htmlFor="inputQtd" className="labelQtd">Qtd</label><input
                              id="inputQtd"  className="inputQtd" type="number"
                                value={Qtd}
                                onChange={(e) => {
                                    setQtd(e.target.value)
                                }
                                }
                            />
                        
                        <button className="buttonAdd"
                            onClick={(e) => {
                                e.preventDefault()
                                adicionarAoCarrinho()
                               
                            }} >Adicionar Item</button>
                    
                    </form>
                </div>
                </div>
                <div className="div-Form">  
                    <div className="divDadosCliente">
                        <form className="form-venda">
                            <p className="dadosCliente">Dados Cliente</p>
                            <span className="spanData">Data</span><span className="inputDate">{formatDate(dateVenda)}</span>
                            <label className="labelCliente">Cliente<input value={'Consumidor'} className="inputCliente" type="string" 
                            onChange={(e) => {
                                setCliente(e.target.value)
                            }}
                            /></label>
                            
                                <label></label>
                                
                                <div className="grupoRadios">
                                    {/* <input
                                        type="radio"
                                        id="pagamentoSelecionar"
                                        className="inputFormaPagamento"
                                        name="formaPagamento"
                                        value="Selecionar"
                                        checked={formaPagamento === 'Selecionar'}
                                        onChange={() => setPagamento('Selecionar')}
                                    />
                                    <label htmlFor="pagamentoSelecionar">Selecionar:</label> */}

                                  
                                    <label id="labelRadios" htmlFor="pagamentoAVista"><input
                                        type="radio"
                                        id="pagamentoAVista"
                                        className="inputFormaPagamento"
                                        name="formaPagamento"
                                        value="À Vista(BRL)"
                                        checked={formaPagamento === 'À Vista(BRL)'}
                                        onChange={() => setPagamento('À Vista(BRL)')}
                                    />À Vista(BRL)</label>

                                    <label id="labelRadios" htmlFor="pagamentoPIX">
                                        <input
                                            type="radio"
                                            id="pagamentoPIX"
                                            className="inputFormaPagamento"
                                            name="formaPagamento"
                                            value="PIX"
                                            checked={formaPagamento === 'PIX'}
                                            onChange={() => setPagamento('PIX')}
                                        />PIX</label>

                                  
                                    <label id="labelRadios" htmlFor="pagamentoCartao">  <input
                                        type="radio"
                                        id="pagamentoCartao"
                                        className="inputFormaPagamento"
                                        name="formaPagamento"
                                        value="Cartão"
                                        checked={formaPagamento === 'Cartão'}
                                        onChange={() => setPagamento('Cartão')}
                                    />Cartão</label>
                                </div>
                                <label htmlFor="inputTroco" className="trocoRecebido">
                                    Dinheiro recebido
                                </label>
                        <label  className="labelTroco"><input
                                value={inputTroco === 0 ? "" : inputTroco}
                                onChange={(e) => {
                                    setTroco(parseFloat(e.target.value));
                                    }}
                                    id="inputTroco"
                                className="inputTroco"
                                type="number"
                            /></label>
                        </form>
                        <div className="informacoes-cupom">
                            <table className="table-informacoes">
                                <tbody >
                                        <tr>
                                            <td className="formaPagamento">
                                         Forma de Pagamento
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pagamentoTitulo">Total Venda</td>
                                    </tr>
                                    <tr>
                                        
                                    </tr>
                                    <tr>
                                            <td className="trocoLabel">
                                            <span >Troco</span>
                                        </td>
                                        <td className="tdResultado">
                                            <span className="trocoResultado">{resultadoTroco >= 0 ? `${resultadoTroco.toFixed(2)}` : '0.00'}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="totalVendaEnd">
                                            <span>Total da Venda</span>
                                        </td>
                                            <td className="totalVenda">
                                            <span className="totalVendaResultado">{`${total.toFixed(2)}`}</span>
                                            </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    <form onSubmit={(e) => { e.preventDefault(); finalizarVenda(); }}>
                        <button className="buttonFinalizar" type="submit">
                            Pagamento
                        </button>
                            <button onClick={(e) => { e.preventDefault(); cancelarVenda();  }} className="buttonCancelar" type="submit">
                            Cancelar venda
                        </button>
                    </form> 
                </div>
                </div>
                </div>
               </div>
            {/* <footer className="footerVenda">© 2023 Fabiano Fregnani - Front-End Developer. v1.0</footer> */}
    </div>
   
    );
}
export default SalesScreen;

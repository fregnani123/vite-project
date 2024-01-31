// Importação das bibliotecas e módulos necessários
import axios from "axios";
import { useEffect, useState } from "react";
import imgRemover from '../../assets/imagens gestaoLite/remover.png';
import { format } from 'date-fns'
// import lupa from '../../assets/imagens gestaoLite/procurar.png';
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
interface Cliente {
    cliente: string;
    cpfFake: string;
    rgFake: string;
    nascimento: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    fone: string;
    email: string;
    ocupacao: string;
    _id: string;
}

function SalesScreen() {

    const [data, setData] = useState<Produto[]>([]);
    const [dataCli, setDataCli] = useState<Cliente[]>([]);
    const [codigo, setCodigo] = useState("");
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [Qtd, setQtd] = useState("");
    const [inputTroco, setTroco] = useState(0);
    const [search, setSearch] = useState("");
    const [formaPagamento, setPagamento] = useState("");
    // const [adicionarCliente, setAdicionarCliente] = useState('');
    const [dateVenda] = useState(new Date());
    const [filtrarCliente, setFiltrarCliente] = useState("")



    const formatDate = (date: Date) => {
        return format(date, 'dd/MM/yyyy');
    };


    const atualizarEstoqueNoBanco = async (produtoDoCarrinho: Produto) => {
        const urlEstoque = `https://204.216.187.179:3000/updateProduto/${produtoDoCarrinho._id}`;

        try {
            const novaQuantidade = produtoDoCarrinho.qtd || 1;
            const response = await axios.patch(urlEstoque, { estoque: produtoDoCarrinho.estoque - novaQuantidade });
            console.log("Estoque atualizado com sucesso:", response.data);

        } catch (error) {
            console.error("Erro ao atualizar estoque:", error);
        }
    }

    const filterClienteNome = dataCli.filter((clienteFiltrado) => {
        return clienteFiltrado.cliente.toLocaleLowerCase().includes(filtrarCliente.toLocaleLowerCase())
    });

    console.log(filterClienteNome)

    const cancelarVenda = () => {
        setCarrinho([]);
        setCodigo("");
        setQtd("");
        setTroco(0);
        setSearch("");
    }

    const finalizarVenda = async () => {
        if (inputTroco === 0) {
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

                const urlEstoque = `https://204.216.187.179:3000/updateProduto/${produtoDoCarrinho.codigoDeBarras}`;

                // Verifique se a quantidade no carrinho é menor ou igual ao estoque disponível
                if (produtoDoCarrinho.estoque >= novaQuantidade) {
                    const response = await axios.patch(urlEstoque, { estoque: produtoDoCarrinho.estoque - novaQuantidade });

                    const responseProduto = await axios.get(url);
                    setData(responseProduto.data);   //aqui resolvi a questão do estoque na tela de venda ao finalizar o estoque e mostrar o novo estoque.

                    console.log("Estoque atualizado com sucesso:", response.data);
                } else {
                    console.error("Quantidade no carrinho maior que o estoque disponível:", produtoDoCarrinho);
                    // tratar erro de estoque insuficiente
                }
            }
            const relatorioVenda = {
                cliente: filtrarCliente.length > 0 && filterClienteNome.length > 0
                    ? filterClienteNome[0].cliente
                    : 'Consumidor',
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
            setFiltrarCliente('');

        } catch (error) {
            console.error("Erro ao registrar produto:", error);
        }
    }

    const url = "https://204.216.187.179:3000/findProduto";
    const urlPost = "https://204.216.187.179:3000/detalhesdevendaPost";
    const urlClientes = 'https://204.216.187.179:3000/clientes';

    console.log(url)

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

    useEffect(() => {
        axios.get(urlClientes)
            .then(responseCli => {
                setDataCli(responseCli.data);
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
            setCodigo("");
            setQtd("");
            setSearch("");
            setCodigo("");
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

    const resultadoTroco = calcularTroco(inputTroco, total);


    function removerDoCarrinho(index: number) {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1); // Remove o item do carrinho
        setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
        calcularTotal();
    }

    useEffect(() => {
        calcularTotal();
    }, [carrinho, inputTroco]); // Atualiza o estado do carrinho sempre que um novo item é adicionado


    return (
        <div className="venda-container">
            <div className="z-index"></div>
            <div className="ajusteContainer">
                <div className="entradas-saidas">
                    <div className="menu"> <MenuToolbar /></div>
                    <div className=" ulCupon">
                        <p className="tituloVendas">Tela de Vendas</p>
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
                            <span className="Produto">Produto Encontrado</span>
                            <span className="produtoPreco">Preço</span>
                            <span className="estoque">Estoque</span>
                            <span className="buscarItem">Buscar Produto - EAN</span>
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
                                    id="inputQtd" className="inputQtd" type="number"
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
                                <label className="buscarCliente">
                                    Dados do Cliente
                                </label><input
                                    value={filtrarCliente}
                                    className="inputCliente"
                                    type="text"
                                    onChange={(e) => setFiltrarCliente(e.target.value)}
                                />
                                <p className="codigoCliente">Buscar: Digite o nome do cliente &darr;</p>

                                {filtrarCliente.length > 0 && filterClienteNome.length > 0 ? (
                                    <ul>{filterClienteNome.map((clienteAdd) => (
                                        <li><input className="consumidor" type="text" value={clienteAdd.cliente} readOnly />
                                            <span className="spanInfo">
                                                <span className="spanInfo1">CPF:{clienteAdd.cpfFake}<br />
                                                </span>
                                                <span className="spanInfo1">Cidade: {clienteAdd.cidade}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="spanInfo1">Bairro: {clienteAdd.bairro}</span>&nbsp;<br /><span className="spanInfo1">Contato: {clienteAdd.fone}</span></span>
                                        </li>
                                    ))}</ul>
                                ) : (
                                    <input className="consumidor" type="text" value="Consumidor" readOnly />
                                )}
                                <div className="grupoRadios">
                                    <select
                                        id="selectFormaPagamento"
                                        className="inputSelect"
                                        value={formaPagamento}
                                        onChange={(e) => setPagamento(e.target.value)}
                                    >
                                        <option value="selecionar">selecionar</option>
                                        <option value="à vista (Dinheiro)">à vista (Dinheiro)</option>
                                        <option value="PIX">PIX</option>
                                        <option value="Cartão">Cartão</option>
                                    </select>

                                </div>
                                <label htmlFor="inputTroco" className="trocoRecebido">
                                    Dinheiro recebido
                                </label>
                                <label className="labelTroco"><input
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
                                            <td className="trocoSeta">Valor recebido &rarr;</td>
                                        </tr>
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
                                            <td className="trocoTitulo">
                                                <span>Troco</span>
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
                                                <span>{`${total.toFixed(2)}`}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            finalizarVenda();
                        }}>
                            <button className="buttonFinalizar" type="submit">
                                Finalizar Venda
                            </button>
                            <button onClick={(e) => { e.preventDefault(); cancelarVenda(); }} className="buttonCancelar" type="submit">
                                Cancelar venda
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <footer className="footerVenda">© 2023 Fabiano Fregnani - Front-End Developer. v1.0</footer> */}
        </div>

    );
}
export default SalesScreen;

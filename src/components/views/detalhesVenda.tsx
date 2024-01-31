import MenuToolbar from "../MenuToolbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../views/detalhes.css";
import { format } from 'date-fns'

interface Relatorio {
    cliente: string;
    total: number;
    formaPagamento: string;
    dinheiroRecebido: number;
    troco: number
    carrinho: [{ codigoDeBarras:number, nome: String, preco: number, qtd: number, }];
    dateVenda: Date;
    _id: string;
}

function detalhesVendasScreen() {
    const [data, setData] = useState<Relatorio[]>([]);
    const [dataInicio, setDataInicio] = useState(format(new Date('2023-11-03'), 'yyyy-MM-dd'));
    const [dataFim, setDataFim] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [codigoDaVenda, setCodigoDaVenda] = useState('')
 
    console.log(data)

    const URL = "http://204.216.187.179:3000/detalhes";

    useEffect(() => {
        axios.get(URL)
            .then((response => {
                setData(response.data);
            }))
            .catch(error => console.log(error));
    }, []);

    const totalVendasNoPeriodo = data
        .filter((venda) => {
            const vendaDate = new Date(venda.dateVenda);
            const inicioDate = new Date(dataInicio);
            const fimDate = new Date(dataFim);

            // Remover a parte do tempo
            vendaDate.setUTCHours(0, 0, 0, 0);
            inicioDate.setUTCHours(0, 0, 0, 0);
            fimDate.setUTCHours(0, 0, 0, 0);

            return vendaDate >= inicioDate && vendaDate <= fimDate;
        })
        .reduce((acc, venda) => acc + venda.total, 0)
        .toFixed(2);

    const totalVendasNoPeriodoPix = data
        .filter((venda) => {
            const vendaDate = new Date(venda.dateVenda);
            const inicioDate = new Date(dataInicio);
            const fimDate = new Date(dataFim);

            // Remover a parte do tempo
            vendaDate.setUTCHours(0, 0, 0, 0);
            inicioDate.setUTCHours(0, 0, 0, 0);
            fimDate.setUTCHours(0, 0, 0, 0);

            return vendaDate >= inicioDate && vendaDate <= fimDate;
        }).filter((venda) => {
            return venda.formaPagamento === 'PIX'
        })
        .reduce((acc, venda) => acc + venda.total, 0)
        .toFixed(2);
    
    const totalVendasNoPeriodoAvista = data
        .filter((venda) => {
            const vendaDate = new Date(venda.dateVenda);
            const inicioDate = new Date(dataInicio);
            const fimDate = new Date(dataFim);

            // Remover a parte do tempo
            vendaDate.setUTCHours(0, 0, 0, 0);
            inicioDate.setUTCHours(0, 0, 0, 0);
            fimDate.setUTCHours(0, 0, 0, 0);

            return vendaDate >= inicioDate && vendaDate <= fimDate;
        }).filter((venda) => {
            return venda.formaPagamento === 'À Vista(BRL)'
        })
        .reduce((acc, venda) => acc + venda.total, 0)
        .toFixed(2);
    
    const totalVendasNoPeriodoCartao = data
        .filter((venda) => {
            const vendaDate = new Date(venda.dateVenda);
            const inicioDate = new Date(dataInicio);
            const fimDate = new Date(dataFim);

            // Remover a parte do tempo
            vendaDate.setUTCHours(0, 0, 0, 0);
            inicioDate.setUTCHours(0, 0, 0, 0);
            fimDate.setUTCHours(0, 0, 0, 0);

            return vendaDate >= inicioDate && vendaDate <= fimDate;
        }).filter((venda) => {
            return venda.formaPagamento === 'Cartão'
        })
        .reduce((acc, venda) => acc + venda.total, 0)
        .toFixed(2);
    
    const detalhesVenda = data
        .filter((venda) => venda._id === codigoDaVenda)
        
   
    return (
        <div className="detalhesContainer">
            <div className="divCorrecaoCorFundo"></div>
            <div className="menuDetalhes">
                <MenuToolbar />
            </div>
            <h1 className="tituloDetalhes">Histórico de Vendas</h1>
            
            <div className="divBorder">
              
            <ul>
                <li className="detalhesTable">
                    <span className="codigoVenda">código da venda</span>
                    <span className="dataDetalhes">Data venda</span>
                    <span className="clienteDetalhes">Cliente</span>
                    <span className="pagamentoDetalhes">Pagamento</span>
                    <span className="totalDetalhes">Total</span>
                    <span className="dinheiroDetalhes">Dinheiro Recebido</span>
                    <span className="trocoDetalhes">Troco</span>
                    <span className="correcaoSpan">.</span>
                </li>
            </ul>
            <ul className="ulRelative">
                {data
                    .filter((venda) => {
                        const vendaDate = new Date(venda.dateVenda);
                        const inicioDate = new Date(dataInicio);
                        const fimDate = new Date(dataFim);

                        // Remover a parte do tempo
                        vendaDate.setUTCHours(0, 0, 0, 0);
                        inicioDate.setUTCHours(0, 0, 0, 0);
                        fimDate.setUTCHours(0, 0, 0, 0);

                        return vendaDate >= inicioDate && vendaDate <= fimDate;

                    })
                    .slice().reverse().map((venda, index) => (
                        <li key={index} className="detalhesTable1">
                            <span className="codigoVenda1">{venda._id}</span>
                            <span className="dataDetalhes1">
                                {format(new Date(venda.dateVenda), 'dd/MM/yyyy')}
                            </span>
                            <span className="clienteDetalhes1">{venda.cliente.toString()}</span>
                            <span className="pagamentoDetalhes1">{venda.formaPagamento.toString()}</span>
                            <span className="totalDetalhes1">{`R$ ${venda.total.toFixed(2)}`}</span>
                            <span className="dinheiroDetalhes1">{`R$ ${venda.dinheiroRecebido.toFixed(2)}`}</span>
                            <span className="trocoDetalhes1">{`R$ ${(Number(venda.dinheiroRecebido) - Number(venda.total)).toFixed(2)}`}</span>
                            <span className="correcaoSpan">.</span>
                        </li>

                    ))}
            </ul>
                <form className="totalVendasMes" >
                    <h1 className="tituloVenda">Detalhes da venda selecionada</h1>
                <span className="periodo">Selecione o Período &rarr;</span>
                <label className="dataInicio">Início: <input className="inputInicioFim" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} /></label>

                    <label className="dataFim">Fim: <input className="inputFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} /></label>
                    
                    <span className="totalVendasFiltro1">Total de vendas no Período selecionado</span>
                    <span className="spanFiltroPeriodo">{`R$ ${totalVendasNoPeriodo}`}</span>

                    <span className="spanTituloPix">Total vendas no PIX </span> <span className="spanPeriodoPix">{`R$ ${totalVendasNoPeriodoPix}`}</span>

                    <span className="spanTituloDinheiro">Total vendas à vista(BRL) </span> <span className="spanPeriodoDinheiro">{`R$ ${totalVendasNoPeriodoAvista}`}</span>

                    <span className="spanTituloCartao">Total vendas Cartão/Cred/Deb </span> <span className="spanPeriodoCartao">{`R$ ${totalVendasNoPeriodoCartao}`}</span>
                    <label className="labelInputCodigoVenda">Insira o código da venda para visualizar os detalhes &rarr;</label>
                    <input className="inputCodigoVenda" value={codigoDaVenda} onChange={(e) => {
                        setCodigoDaVenda(e.target.value)
                    }} />

                </form>

                <ul className="spanPeriodoProdutos">
                    <span>{detalhesVenda.map((detalhes,index) => (
                        <ul><li key={index} className="cupom">Cupom não fiscal </li> <li> Data: {format(new Date(detalhes.dateVenda), 'dd/MM/yyyy')}</li>
                            <li>Cliente: {detalhes.cliente}</li><li>Pagamento: {detalhes.formaPagamento}</li></ul>
                    ))}</span>
                    {detalhesVenda.map((venda) => (
                        <ul>
                            <b><li>Produtos</li></b>
                            {venda.carrinho.map((produto, index) => (<b><li key={index}><span> {Number(produto.codigoDeBarras)}</span> - <span> {produto.nome}</span> - <span>Preco {Number(produto.preco).toFixed(2)}</span> - <span>Qtd: {Number(produto.qtd)}</span></li></b>))}</ul>
                    ))}

                    <span>{detalhesVenda.map((detalhes, index) => (
                        <ul><u><li key={index}>Total: R${Number(detalhes.total).toFixed(2)}</li></u>
                            <li key={index}>Recebido: R${Number(detalhes.dinheiroRecebido).toFixed(2)}</li>
                            <li key={index}>Troco: R${Number(detalhes.dinheiroRecebido - detalhes.total).toFixed(2)}</li>
                            <li key={index}>cod.Venda: {detalhes._id}</li>
                            </ul>
                    ))}</span>
                </ul>
               
            </div></div>
    );
}

export default detalhesVendasScreen;

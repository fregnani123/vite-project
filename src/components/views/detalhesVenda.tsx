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
    carrinho: [];
    dateVenda: Date;
    _id: string;
}

function detalhesVendasScreen() {
    const [data, setData] = useState<Relatorio[]>([]);
    const [dataInicio, setDataInicio] = useState(format(new Date('2023-11-03'), 'yyyy-MM-dd'));
    const [dataFim, setDataFim] = useState(format(new Date(), 'yyyy-MM-dd'));


    console.log(data)

    const URL = "http://localhost:3000/detalhes";

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

    return (
        <div className="detalhesContainer">
            <div className="divCorrecaoCorFundo"></div>
            <div className="menuDetalhes">
                <MenuToolbar />
            </div>
            <p className="tituloDetalhes">Histórico de Vendas</p>
           <div className="divBorder">
            <ul>
                <li className="detalhesTable">
                    <span className="codigoVenda">cod. da venda</span>
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
                <span className="periodo">Selecione o Período &rarr;</span>
                <label className="dataInicio">Início: <input className="inputInicioFim" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} /></label>

                <label className="dataFim">Fim: <input className="inputFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} /></label>  
                <span className="totalVendasFiltro1">Total de Vendas no Período: <span className="totalVendasFiltro">{totalVendasNoPeriodo}</span></span>
            </form>
            </div></div>
    );
}

export default detalhesVendasScreen;

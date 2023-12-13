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
    const [dataInicio, setDataInicio] = useState(format(new Date(), 'yyyy-MM-dd'));
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

    const formatDate = (date: Date) => {
        return format(date, 'yyyy-MM-dd');
    };

    return (
        <div className="detalhesContainer">
            <div className="menuDetalhes">
                <MenuToolbar />
            </div>
            <h1 className="tituloDetalhes">Histórico de Vendas</h1>

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
                <span>Selecione o período</span>
                <label className="dataInicio">Início: <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} /></label>
                
                <label className="dataFim">Fim: <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} /></label>
                
            </form>
        </div>
    );
}

export default detalhesVendasScreen;

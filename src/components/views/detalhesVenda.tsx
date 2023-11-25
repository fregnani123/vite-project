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
    carrinho: []; // Uso do tipo Produto[] para representar um array de produtos
    dateVenda: Date;
}

function detalhesVendasScreen() {

    const [data, setData] = useState<Relatorio[]>([]);

    console.log(data)
    
    const URL = "http://localhost:3000/detalhes"

    useEffect(() => {
        axios.get(URL).then((response => setData(response.data) )
            
        ).catch(error => console.log(error)); 
    },[])

    return (
        <div className="detalhesContainer">
            <div className="menuDetalhes">
                <MenuToolbar/>
            </div>
            <h1 className="tituloDetalhes">Detalhes de Venda</h1>
            <li className="detalhesTable">
                <span className="dataDetalhes">Data venda</span>
                <span className="clienteDetalhes">Cliente</span>
                <span className="pagamentoDetalhes">Pagamento</span>
                <span className="totalDetalhes">Total</span>
                <span className="dinheiroDetalhes">Dinheiro Recebido</span>
                <span className="trocoDetalhes">Troco</span>
                <span className="correcaoSpan">.</span>
            </li>
                    <ul className="ulRelative">

                            {data.map((venda, index) => (
                                <li key={index} className="detalhesTable1">
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
                    {/* <ul className="detalhesTable" >
                        <li className="totalVendasMes">
                            {`Total vendas: R$ ${data.reduce(
                                (acumulador, totalVendas) => acumulador + totalVendas.total,
                                0
                            ).toFixed(2)}`}
                        </li>
                    </ul> */}
            </div>
            )}


export default detalhesVendasScreen;
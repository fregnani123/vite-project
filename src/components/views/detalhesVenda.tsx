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
                <MenuToolbar />
            </div>
            <div className="detalhesBody">
                <h1 className="tituloDetalhes">Detalhes de Venda</h1>
                <div className="detalhes">
                    <table className="detalhesTable">
                        <thead>
                            <tr>
                                <th className="dataVenda">Data venda</th>
                                <th >Cliente</th>
                                <th >Pagamento</th>
                                <th >Total</th>
                                <th >Dinheiro Recebido</th>
                                <th >Troco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((venda, index) => (
                                <tr key={index}>
                                    <td className="">
                                        {format(new Date(venda.dateVenda), 'dd/MM/yyyy')}
                                    </td>
                                    <td>{venda.cliente.toString()}</td>
                                    <td>{venda.formaPagamento.toString()}</td>
                                    <td>{`R$ ${venda.total.toFixed(2)}`}</td>
                                    <td>{`R$ ${venda.dinheiroRecebido.toFixed(2)}`}</td>
                                    <td>{`R$ ${(Number(venda.dinheiroRecebido) - Number(venda.total)).toFixed(2)}`}</td>
                                </tr>
                            ))}
                           
                        </tbody>
                        
                    </table>
                </div>
                <table className="detalhesTable" > <tr>
                    <td colSpan={6} className="totalVendasMes">
                        {`Total vendas: R$ ${data.reduce(
                            (acumulador, totalVendas) => acumulador + totalVendas.total,
                            0
                        ).toFixed(2)}`}
                    </td>
                </tr></table>
            </div>
        </div>
    );
}

export default detalhesVendasScreen;
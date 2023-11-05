import MenuToolbar from "../MenuToolbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../views/detalhes.css"

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
            <div className="detalhesContainer"><div><MenuToolbar /></div>
                <div>
                    <ul>
                        {
                            data.map((venda, index) => (<li key={index}>{venda.dateVenda.toString()}</li>))
                        }
                        {
                            data.map((venda, index) => (<li key={index}>{venda.cliente.toString()}</li>))
                        }
                        {
                            data.map((venda, index) => (<li key={index}>{venda.formaPagamento.toString()}</li>))
                        }
                        {
                            data.map((venda, index) => (<li key={index}>{`Total Venda: ${venda.total.toFixed(2)}`}</li>))
                        }
                        {
                            data.map((venda, index) => (<li key={index}>{`Dinheiro Recebido: ${venda.dinheiroRecebido.toFixed(2)}`}</li>))
                        }
                        {
                            data.map((venda, index) => (<li key={index}>{`Troco: ${(Number(venda.dinheiroRecebido) - Number(venda.total)).toFixed(2)}`}</li>))
                        }
                    </ul>
                </div>
            </div>
            
        )
    
}



export default detalhesVendasScreen;
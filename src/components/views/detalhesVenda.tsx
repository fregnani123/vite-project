import MenuToolbar from "../MenuToolbar";
import { useEffect, useState } from "react";
import axios from "axios";

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
            <div><MenuToolbar /></div>
        )
    


}



export default detalhesVendasScreen;
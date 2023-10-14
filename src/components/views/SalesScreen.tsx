import MenuToolbar from "../MenuToolbar";
import axios from "axios";
import { useEffect, useState } from "react";
import carrinhoCompras from "../../assets/imagens gestaoLite/carrinho-de-compras.png";
import '../views/queryProdutos.css';


interface Produto {
    _id: string;
    nome: string;
    preco: number;
    descricao: string;
    categoria: string;
    estoque: string;
}

function SalesScreen() {
    const [nome, setNome] = useState('');
    const [data, setData] = useState<Produto[]>([]);

    // O URL da solicitação deve ser construído corretamente
    const url = `http://localhost:3000/findProduto`;

    useEffect(() => {
        // Certifique-se de que a URL esteja corretamente construída
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, [nome]); // O efeito deve ser executado quando 'nome' é alterado.

    return (
        <div className="sales-container">
            <MenuToolbar />
            <div className="cupom"><div className="cupom-div"><h1 className="tituloVenda">Carrinho de Compras</h1>
                
                <div className="cupom-form">
                    <ul className="carrinho">
                    </ul>
                    <form >  
                        <label className="labelCodigo">Código de Barras
                            <input type="number" />
                        </label>
                        
                        <label className="labelQtd">Qtd<input type="number" /></label>

                        <button className="buttonSales">Adicionar</button>
                        <button className="buttonFinalizar" type="submit">Finalizar</button>
                    </form>
                </div>
                <p className="totalCarrinho">Total R$ <span className="span" >0.00</span></p>
            </div>
        
       </div> 
        </div>
    );
}

export default SalesScreen;

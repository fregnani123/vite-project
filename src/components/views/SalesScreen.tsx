import MenuToolbar from "../MenuToolbar";
import axios from "axios";
import { useEffect, useState } from "react";
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
            <div className="sales-form">
                <h1 className="registroH1">Tela de Vendas</h1>
                <div className="cupom">
                    <form className="cupom-form">
                        <br />
                        <p className="relatorio">
                        </p>
                        <label className="labelSales">Código de Barras
                            <input className="inputProduto"
                            />
                        </label>
                        <label className="labelQtd">Qtd.
                            <input type="number" />
                        </label>

                        <button className="buttonSales">Adicionar</button>
                    </form>
                </div>
                <div className="h4Sales">
                    <h4 className="h4register">TOTAL<br />VENDA</h4>
                    <p className="spanVendas">R$ 0,00</p>
                </div>
            </div>
        </div>
    );
}

export default SalesScreen;

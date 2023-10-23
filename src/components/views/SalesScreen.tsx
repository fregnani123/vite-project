// import MenuToolbar from "../MenuToolbar";
import axios from "axios";
import { useEffect, useState } from "react";
// import carrinhoTotal from '../../assets/imagens gestaoLite/carrinhoTotal.png';
import imgRemover from '../../assets/imagens gestaoLite/remover.png';
import imgCarrinho from '../../assets/imagens gestaoLite/carrinho-de-compras.png';
import lupa from '../../assets/imagens gestaoLite/procurar.png'
import '../views/queryProdutos.css';


interface Produto {
    _id: string;
    nome: string;
    codigoDeBarras: number;
    preco: number;
    descricao: string;
    categoria: string;
    estoque: string;
    qtd: number;
  
}


function SalesScreen() {
    const [data, setData] = useState<Produto[]>([]);
    const [codigo, setCodigo] = useState("");
    const [carrinho, setCarrinho] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);
    const [Qtd, setQtd] = useState(""); 
    const [TRD, setTRD] = useState(0);
    const [produtoImprimir, setProdutoImprimir] = useState<Produto[]>([]);

    

    // O URL da solicitação deve ser construído corretamente
    const url = "http://localhost:3000/findProduto";

    useEffect(() => {
        // Certifique-se de que a URL esteja corretamente construída
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

  

    function encontrarProdutoPorCodigo(codigo: number) {
        return data.find(produto => produto.codigoDeBarras === codigo);
    }


    function adicionarAoCarrinho() {
        const produtoSelecionado = encontrarProdutoPorCodigo(parseInt(codigo));
        if (produtoSelecionado && parseInt(Qtd) > 0) {
            const produtoComQtd = { ...produtoSelecionado, qtd: parseInt(Qtd)};
            setCarrinho([...carrinho, produtoComQtd]);
            setCodigo(""); // Limpa o campo de código
            setQtd(""); // Limpa o campo de quantidade
        } else {
            console.log("Erro: Produto não encontrado ou quantidade inválida.");
        }
    }

    function calcularTotal() {
        const novoTotal = carrinho.reduce((acc, produto) => acc + produto.preco * (produto.qtd || 1), 0);
        setTotal(novoTotal);
    }
    
    function calcularTroco(trocoRecebido: number, total: number): number {
        return trocoRecebido - total;
    }

    function removerDoCarrinho(index: number) {
        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1); // Remove o item do carrinho
        setCarrinho(novoCarrinho); // Atualiza o estado do carrinho
        calcularTotal(); // Recalcula o total
    }

    useEffect(() => {
        calcularTotal();
      
    }, [carrinho,TRD,]); //atualiza o estado do carrinho sempre que for add um novo item

    return (
        <div className="venda-container">
            <div className="entradas-saidas">
                <h1 className="titulo-venda">Tela de venda</h1>
            <ul className="cupom-form">
                {carrinho.map((produto, index) => (
                    <li key={index}>
                        <span className="nome-produto">{produto.nome}</span>
                        <span className="preco-produto">{produto.preco.toFixed(2)}</span>
                        {<img 
                            onClick={() => {
                                removerDoCarrinho(index)
                        }}
                        className="imgRemover" src={imgRemover}/>}
                    </li>
                ))}
            </ul>
            
        <form>

        <label className="labelEAN">
        EAN:</label ><input
                    onChange={(e) => {
                            setCodigo(e.target.value)   
        }}
                    value={codigo} className="inputEAN" type="numbem" />
        
        <label className="labelQtd">
                    Qtd:</label><input
                    className="inputQtd" type="number"
                    value={Qtd}
                    onChange={(e) => {
                        setQtd(e.target.value) 
                    }
                    }
                   
                    />
                    <label className="labelTRD">Dinheiro recebido:</label><input className="inputTRD" type="number" />           
                
                <button className="buttonAdd" 
                    onClick={(e) => {
                        e.preventDefault()
                        adicionarAoCarrinho()
        }} >Adicionar ao carrinho</button>
                    
                </form> 

              <div className="informacoes-cupom">       
                    <p className="total" >Total R$:</p>
                    <span className="spanTotal" > {total.toFixed(2)}</span>
                </div> 
                <img className="imgCarrinho" src={imgCarrinho} />
                <ul className="produto-encontrado">
                    {produtoImprimir.map((produto,index) => (
                        <li key={index}>{produto.nome}</li>
                    ))}
                </ul>

<img className="lupa" src={lupa} />
            </div>
        </div>
       
    );
}

export default SalesScreen;

import '../views/queryProdutos.css'


import axios from "axios";
import { useEffect, useState} from "react";
import MenuToolbar from "../MenuToolbar";
import imgExcluir from '../../assets/imagens gestaoLite/remover.png';
import '../views/cadastrarProduto.css';

interface Produto {
    _id: string;
    nome: string;
    preco: string;
    descricao: string;
    categoria: string;
    estoque: string;
    codigoDeBarras: number;
}

function MyComponent() {

    const [data, setData] = useState<Produto[]>([]);
    const [EAN, setEAN] = useState("");
    const [EANAlterar, setEANAlterar] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState(0);

    const [nomeAlterar, setNomeAlterar] = useState("");
    const [descricaoAlterar, setDescricaoAlterar] = useState("");
    const [precoAlterar, setPrecoAlterar] = useState("");
    const [categoriaAlterar, setCategoriaAlterar] = useState("");
    const [estoqueAlterar, setEstoqueAlterar] = useState(0);
    const [EANDeletar, setEANDeletar] = useState("")
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [filtrarNome, SetfiltrarNome] = useState('')


    const handleSubmit = async () => {

        const data = {
            nome: nome,
            codigoDeBarras: EAN,
            descricao: descricao,
            preco: preco,
            categoria: categoria,
            estoque: estoque,
        };
        const url = "http://204.216.187.179:3000/newProduto";

        try {
            const response = await axios.post(url, data);
            console.log("Produto registrado com sucesso:", response.data);
         
            setNome("");
            setPreco('');
            setDescricao("");
            setPreco('');
            setCategoria("");
            setEstoque(0);
            setEAN('');

            const updatedData = await axios.get(urlProdutoFind);
            setData(updatedData.data);

        } catch (error) {
            console.error("Erro ao registrar produto:", error);
        }
    };

    const VerificarInputs = () => {
        if (
            EAN.trim() === '' ||
            nome.trim() === '' ||
            descricao.trim() === '' ||
            preco.trim() === '' ||
            categoria === 'Selecionar' ||
            isNaN(parseFloat(preco)) ||
            estoque <= 0
        ) {
            alert('Preencha todos os campos corretamente!');
            return;
        }
    };

    const excluirProdutoDB = async () => {

        const urlExcluirDB = `http://204.216.187.179:3000/deleteproduto/${EANDeletar}`
        try {

            const response = await axios.delete(urlExcluirDB)
            console.log(`Produto excluido do Banco de Dados`, response.data);

            const updatedData = await axios.get(urlProdutoFind);
            setData(updatedData.data);

        } catch (error) { console.error("Erro ao alterar produto:", error); }
    }


    const alterarInformacoesProduto = async () => {
        const urlAlterar = `http://204.216.187.179:3000/updateProduto/${EANAlterar}`;

        const dataAlterar: {
            nome?: string;
            descricao?: string;
            preco?: string;
            categoria?: string;
            estoque?: number;
        } = {};

        if (nomeAlterar.trim() !== "") {
            dataAlterar.nome = nomeAlterar;
        }

        if (descricaoAlterar.trim() !== "") {
            dataAlterar.descricao = descricaoAlterar;
        }

        if (precoAlterar !== "") {
            dataAlterar.preco = precoAlterar;
        }

        if (categoriaAlterar !== "") {
            dataAlterar.categoria = categoriaAlterar;
        }

        if (estoqueAlterar !== 0) {
            dataAlterar.estoque = estoqueAlterar;
        }

        try {
            const response = await axios.patch(urlAlterar, dataAlterar);
            console.log("Produto alterado com sucesso:", response.data);

            setNomeAlterar("");
            setDescricaoAlterar("");
            setPrecoAlterar('');
            setCategoriaAlterar("");
            setEstoqueAlterar(0);
            setEAN('')

            const updatedData = await axios.get(urlProdutoFind);
            setData(updatedData.data);


        } catch (error) {
            console.error("Erro ao alterar produto:", error);
        }
    };

    const urlProdutoFind = "http://204.216.187.179:3000/findProduto";

    useEffect(() => {
        axios.get(urlProdutoFind)
            .then(response => {
                setData(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

    const urlBuscar = "http://204.216.187.179:3000/findProduto";

    useEffect(() => {
        axios.get(urlBuscar)
            .then(response => {
                setData(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

    const handleEditarProduto = (codigoDeBarras: number) => {
        const produto = data.find(produto => produto.codigoDeBarras === codigoDeBarras);
        if (produto) {
            setProdutoSelecionado(produto);
            setEANAlterar(String(produto.codigoDeBarras));
            setNomeAlterar(produto.nome || "");
            setDescricaoAlterar(produto.descricao || "");
            setPrecoAlterar((produto.preco) || "");
            setCategoriaAlterar(produto.categoria || "");
            setEstoqueAlterar(Number(produto.estoque) || 0);
        }
    };

    const hamdleLimparImput = () => {
        setEANAlterar("");
        setNomeAlterar("");
        setDescricaoAlterar("");
        setPrecoAlterar('');
        setCategoriaAlterar("");
        setEstoqueAlterar(0);
        return;
    };
    const handleDelete = async () => {
        if (window.confirm('Deseja realmente excluir este produto?')) {
            await excluirProdutoDB();
            alert('Produto excluído com sucesso!');
        } else {
            alert('Exclusão cancelada.');
        }
    };

    return (<div className="query-Container">
        <div className="correcaoCorFundo"></div>
        <div className="menu"><MenuToolbar /></div>
        <h1 className="registroH1">Informações de todos os Produtos</h1>
        <div className="register-queryProdutos">
            <ul className="ulInformacoes">
                <li>
                    <span className="thEAN">EAN</span>
                    <span className="thNome">Nome do Produto</span>
                    <span className="thPreco">Preço</span>
                    <span className="thDescricao">Descrição</span>
                    <span className="thCategoria">Categoria</span>
                    <span className="thEstoque">Estoque</span>
                    <span></span>
                </li>
            </ul>
            <div className="containerTable">
                <ul className="ulInformacoesTabela">
                    <span className="correcaoEspacoLi"></span>
                    {data
                        .filter(produto => produto.nome.toLowerCase().includes(filtrarNome.toLowerCase()))
                        .map((produto, index) => (
                            <li className="liSpan" key={index}>
                                {<li className="liSpan" key={index}>
                                    <span className="thEAN1">{produto.codigoDeBarras}</span>
                                    <span className="thNome1" >{produto.nome}</span>
                                    <span className="thPreco1" >{Number(produto.preco).toFixed(2)}</span>
                                    <span className="thDescricao1">{produto.descricao.length > 25 ? produto.descricao.slice(0, 50) + "..." : produto.descricao}</span>
                                    <span className="thCategoria1">{produto.categoria}</span>
                                    <span className="thestoque1">{produto.estoque}</span>
                                    <span className="thestoque">correçãoTabela</span>
                                </li>}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <div className="register-container">
                    <div className="divForm">
                        <form className='formCadastro' onSubmit={(event) => {
                            event.preventDefault();
                            VerificarInputs();
                            handleSubmit();
                        }}><h1 className='titulo'>Cadastrar novo produto</h1>
                            <label className="labelEANCadastro1">EAN (Código de barras)</label>
                            <input className="inputEANCadastro11"
                                type="number"
                                value={parseInt(EAN)}
                                onChange={(e) => setEAN(e.target.value)}
                            />
                            <label className="labelNomeCadastro1">Nome do Produto</label>
                            <input className="inputNomeCadastro1"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <label className="labelDescricaoCadastro">Descrição</label>
                            <input className="inputDescricaoCadastro"
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                            <label className='labelPrecoCadastro'>Preço de Venda</label>
                            <input
                                className="inputPrecoCadastro"

                                type="text"
                                value={preco}
                                onChange={(e) => {
                                    setPreco(e.target.value);
                                }}
                            />
                            <label className="labelCategoriaCadastro">Categoria:</label>
                            <select className="inputCategoriaCadastro" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option className="selecionar">Selecionar</option>
                                <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
                                <option value="Beleza e Cuidados Pessoais">Beleza e Cuidados Pessoais</option>
                                <option value="Brinquedos">Brinquedos</option>
                                <option value="Calçados">Calçados</option>
                                <option value="Eletrodomésticos">Eletrodomésticos</option>
                                <option value="Eletrônicos">Eletrônicos</option>
                                <option value="Esportes e Fitness">Esportes e Fitness</option>
                                <option value="Joias e Relógios">Joias e Relógios</option>
                                <option value="Livros">Livros</option>
                                <option value="Móveis">Móveis</option>
                                <option value="Roupas">Roupas</option>
                            </select>
                            <label className="labelEstoqueCadastro">Estoque Inicial</label>
                            <input className="inputEstoqueCadastro"
                                type="number"
                                value={estoque === 0 ? '' : estoque}
                                onChange={(e) => setEstoque(parseInt(e.target.value))}
                            /><br></br>

                            <button type="submit" className="buttonCadastrar">Cadastrar</button>

                        </form>

                        <label className="labelFiltrarCadastro11">Buscar produto através do nome: <input
                            className="inputFiltrarCadastro"
                            type="text"
                            value={filtrarNome}
                            onChange={(e) => {
                                SetfiltrarNome(e.target.value);
                            }}
                        /></label>
                        
                        <form className='formCadastro2' onSubmit={(event) => {
                            event.preventDefault()
                            alterarInformacoesProduto()
                            setEANAlterar('')
                        }}>
                            <h1 className='tituloAlterar'>Alterar / Excluir Produto</h1>
                            <label className="labelEANCadastro">Buscar Produto - EAN</label>
                            <input
                                className="inputEANCadastro"
                                type="number"
                                value={parseInt(EANAlterar)}
                                onChange={(e) => {
                                    const newEAN = e.target.value;
                                    setEANAlterar(newEAN);
                                    handleEditarProduto(Number(newEAN));
                                    setEANDeletar(newEAN);
                                }}
                            />
                           

                            <label className="labelNomeCadastro">Alterar Nome do Produto</label>
                            <input className="inputNomeCadastro"
                                type="text"
                                value={nomeAlterar}
                                onChange={(e) => setNomeAlterar(e.target.value)}
                            />
                            <label className="labelDescricaoCadastro">Alterar Descrição</label>
                            <input className="inputDescricaoCadastro"
                                type="text"
                                value={descricaoAlterar}
                                onChange={(e) => setDescricaoAlterar(e.target.value)}
                            />
                            <label className='labelPrecoCadastro'>Alterar Preço</label>
                            <input
                                className="inputPrecoCadastro"
                                type="text"
                                value={precoAlterar}
                                onChange={(e) => {
                                    setPrecoAlterar(e.target.value);
                                }
                                }
                            />

                            <label className="labelCategoriaCadastro">Alterar Categoria:</label>
                            <select className="inputCategoriaCadastro" value={categoriaAlterar} onChange={(e) => setCategoriaAlterar(e.target.value)}>
                                <option className="selecionar">Selecionar</option>
                                <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
                                <option value="Beleza e Cuidados Pessoais">Beleza e Cuidados Pessoais</option>
                                <option value="Brinquedos">Brinquedos</option>
                                <option value="Calçados">Calçados</option>
                                <option value="Eletrodomésticos">Eletrodomésticos</option>
                                <option value="Eletrônicos">Eletrônicos</option>
                                <option value="Esportes e Fitness">Esportes e Fitness</option>
                                <option value="Joias e Relógios">Joias e Relógios</option>
                                <option value="Livros">Livros</option>
                                <option value="Móveis">Móveis</option>
                                <option value="Roupas">Roupas</option>
                            </select>
                            <label className="labelEstoqueCadastro">Alterar Estoque</label>
                            <input className="inputEstoqueCadastro"
                                type="number"
                                value={estoqueAlterar === 0 ? '' : estoqueAlterar}
                                onChange={(e) => setEstoqueAlterar(parseInt(e.target.value))}
                            /><br></br>
                            <button type="submit" className="buttonAlterar">Alterar</button>
                            <button onClick={hamdleLimparImput} className="buttonLimparAlterar">Limpar todos os Campos</button>
                        </form>
                       
                    </div>
                </div>

            </div>


        </div></div>
    );
}

export default MyComponent;



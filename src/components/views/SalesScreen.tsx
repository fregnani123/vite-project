import MenuToolbar from "../MenuToolbar";


const SalesScreen = () => {
    return (<div className= "sales-container">
        <MenuToolbar /><div className="sales-form"><h1 className="registroH1">Tela de Vendas</h1>
            <div className="cupom">
                <form className="cupom-form">
                   <br></br><p className="relatorio"></p>
                    <p></p>
                    <label className="labelSales">Produto<input className="inputProduto" /></label>
                    <label className="labelQtd">Qtd.<input type="number"/></label>
                </form>
            </div>
            <div className="h4Sales">
                <h4 className="h4register" >TOTAL<br/>VENDA
                </h4><p className="spanVendas">R$ 0,00</p>
            </div>
            </div>
    </div>
    );
};

export default SalesScreen;

import MenuToolbar from "../MenuToolbar";


const SalesScreen = () => {
    return (<div className= "sales-container">
        <MenuToolbar /><div className="sales-form"><h1 className="registroH1">Tela de Vendas</h1>
            <div className="cupom">
                <form className="cupom-form">
                   <br></br> <p>Relogio R$ 50,00 - 1x</p>
                    <p></p>
                </form>
            </div>
            <div className="h4Sales">
                <h4 >TOTAL<br/>VENDA
                </h4><p className="spanVendas">R$ 50,00</p>
            </div>
            </div>
    </div>
    );
};

export default SalesScreen;

import axios from "axios";
import { useEffect, useState } from "react";

interface Produto {
    nome: string;
    preco: Number;
    descricao: string;
    categoria: string;
}

function registerProduct() {
    const url = "http://localhost:3000//newProduto";

    const data = {
        nome: "Nome do Produto",
        descricao: "Descrição do Produto",
        preco: 10.00,
        categoria: "teste",
        estoque: "1"
    };

    useEffect(() => {
        axios.post(url, data)
    }, []);

    return (
        <div>
            registrar produtos
        </div>
    )

}

export default registerProduct;
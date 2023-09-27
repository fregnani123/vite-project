import '../components/Login.css'
import imgMenu from '../assets/imagens gestaoLite/f.png';
import React, { useState } from 'react';

function PaginaLogin() {
    
    const usuario = 'Fabiano';
    const senha = 1308;


    const [usuarioInput, setUsuario] = useState('')
    const [senhaInput, setSenha] = useState('')

    return (<><h1 className='logo'><img className='imgMenuLogin' src={ imgMenu} /> Gestão Lite</h1>
        <form>
            <h1 >Login {usuarioInput}</h1> 
            <input type='text' placeholder='Digite o seu usuário'
                value={usuarioInput} onChange={(e) => {
                setUsuario(e.target.value)
            } }
            required />
            <input type='password' placeholder='Digite a sua senha' value={senhaInput} onChange={(e) => {
                setSenha(e.target.value)
            }} required/>
            <button className='logar'>Logar</button>
        </form>
        <footer>
            <p className="copy">© 2023 Fabiano Fregnani - Front-End Developer.</p>
        </footer>
    </>)
}

export default PaginaLogin
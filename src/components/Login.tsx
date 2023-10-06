import '../components/Login.css'
import imgMenu from '../assets/imagens gestaoLite/f.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface PaginaLoginProps {
    setIsAuthenticated: (value: boolean) => void; // Define o tipo esperado para setIsAuthenticated
}

function PaginaLogin({ setIsAuthenticated }: PaginaLoginProps ) {
    const Login = useNavigate();
    const [usuarioInput, setUsuario] = useState('')
    const [senhaInput, setSenha] = useState('');
    const keySenha = 'adm';
    const keyUsuario = 'adm'
    return (
        <>
            <h1 className='logo'><img className='imgMenuLogin' src={imgMenu} /> Gestão Lite</h1>
            <form>
                <h1 >Login</h1>
                <input
                    type='text'
                    placeholder='Digite o seu usuário'
                    value={usuarioInput}
                    onChange={(e) => {
                        setUsuario(e.target.value)
                    }}
                    required
                />
                <input
                    type='password'
                    placeholder='Digite a sua senha'
                    value={senhaInput}
                    onChange={(e) => {
                        setSenha(e.target.value)
                    }}
                    required
                />
                <button
                    className='logar'
                    onClick={() => {
                        if (usuarioInput === keyUsuario && senhaInput === keySenha) {
                            console.log('ok');
                            setIsAuthenticated(true);
                            Login('/painel'); // Redireciona para a página MenuPage;
                        } else {
                            console.log('erro')
                        }
                    }}
                >
                    Logar
                </button>
            </form>
            <footer>
                <p className="copy">© 2023 Fabiano Fregnani - Front-End Developer.</p>
            </footer>
        </>
    )
}

export default PaginaLogin;

import '../components/Login.css'
import imgMenu from '../assets/imagens gestaoLite/f.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from '../assets/imagens gestaoLite/menu-aberto.png'

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
            <h1 className='logo'><img className='imgMenuLogin' src={imgLogo} /> Gestão Lite</h1>
            <form className='formLogin'>
                <h1 className='loginH1' >Login</h1>
                <input className='inputLogin'
                    type='text'
                    placeholder='Digite o seu usuário'
                    value={usuarioInput}
                    onChange={(e) => {
                        setUsuario(e.target.value)
                    }}
                    required
                />
                <input
                    type='password' className='inputSenha'
                    placeholder='Digite a sua senha'
                    value={senhaInput}
                    onChange={(e) => {
                        setSenha(e.target.value)
                    }}
                    required
                />

                <button
                    className='buttonlogar'
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
                <p className="copy">© 2023 Fabiano Fregnani - Front-End Developer. v1.0</p>
            </footer>
        </>
    )
}

export default PaginaLogin;

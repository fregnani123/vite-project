import '../components/index.css'
import imgMenu from '../assets/imagens gestaoLite/f.png'

function PaginaLogin() {
    return (<><h1 className='logo'><img className='imgMenuLogin' src={ imgMenu} /> Gestão Lite</h1>
      <form>
            <h1 >Login</h1> 
            <input type='text' placeholder='Digite o seu usuário' required />
            <input type='password' placeholder='Digite a sua senha' required/>
            <input type='submit'/>
        </form>
        <footer>
            <p className="copy">© 2023 Fabiano Fregnani - Front-End Developer.</p>
        </footer>
    </>)
}

export default PaginaLogin
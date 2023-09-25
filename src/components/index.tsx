import '../components/index.css'

function PaginaLogin() {
    return (<>
      <form>
            <h1>Login</h1> 
            <input type='text' placeholder='Digite o seu usuário' />
            <input type='password' placeholder='Digite a sua senha' />
            <input type='submit'/>
      </form>
    </>)
}

export default PaginaLogin
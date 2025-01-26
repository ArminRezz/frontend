import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login(email, password)
    }

    return (
        <div>
            <form className="login" onSubmit={handleSubmit}>
                <h3>Business Login</h3> 
                <label>Email:</label>
                <input 
                    required
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <label>Password:</label>
                <input 
                    required
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />  
                <button disabled={isLoading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}
    
export default Login
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
            
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Business Signup</h3>
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
                <button type="submit" disabled={isLoading}>Signup</button>
                {error && <div className="error">{error}</div>}
            </form>
    )
}

export default Signup
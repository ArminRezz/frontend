import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { logout } = useLogout()
    const { businessUser } = useAuthContext()

    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to="/">
                <h1>QuickRefer</h1>
                </Link>
                <nav>
                    {businessUser && (

                        <div>
                            <span>{businessUser.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!businessUser && (
                        <div>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
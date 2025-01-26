import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { businessUser: action.payload }
        case 'LOGOUT':
            return { businessUser: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        businessUser: null
    })

    useEffect(() => {
        const businessUser = JSON.parse(localStorage.getItem('businessUser'))
        if (businessUser) {
            dispatch({type: 'LOGIN', payload: businessUser})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
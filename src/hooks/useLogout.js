import { useAuthContext } from './useAuthContext'
import { useCustomersContext } from './useCustomersContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: customersDispatch } = useCustomersContext()

    const logout = () => {  
        localStorage.removeItem('businessUser')
        dispatch({type: 'LOGOUT'})
        customersDispatch({type: 'SET_CUSTOMERS', payload: null})
    }

    return { logout }
}
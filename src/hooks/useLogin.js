import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    // State to store error messages
    const [error, setError] = useState(null)
    // State to track loading status
    const [isLoading, setIsLoading] = useState(null)
    // Get the dispatch function from the authentication context
    const { dispatch } = useAuthContext()
    
    const login = async (email, password) => {
        // Reset error state and set loading to true
        setError(null)
        setIsLoading(true)

        // Make a POST request to the login API
        const response = await fetch('/api/businessUser/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        // Parse the JSON response
        const json = await response.json()

        // If the response is not okay, set the error state
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }

        // If the response is okay, store user data and update context
        if (response.ok) {
            localStorage.setItem('businessUser', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    // Return the login function and state variables
    return { login, isLoading, error }
}
import { useState } from 'react'
import { useCustomersContext } from '../hooks/useCustomersContext'
import { useAuthContext } from '../hooks/useAuthContext'

const CustomerForm = () => {
    const { dispatch } = useCustomersContext()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const { businessUser } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!businessUser) {
            setError('You must be logged in')
            return
        }

        const customer = { name, phone }

        // Validate fields before making the API request
        const newEmptyFields = []
        if (!name) newEmptyFields.push('name')
        if (!phone) newEmptyFields.push('phone')

        if (newEmptyFields.length > 0) {
            setEmptyFields(newEmptyFields)
            setError('Please fill in all fields')
            return
        }

        const response = await fetch('/api/customers', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${businessUser.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setEmptyFields(json.emptyFields)
            setError(json.error)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setName('')
            setPhone('')
            dispatch({type: 'CREATE_CUSTOMER', payload: json})
        }
    }

    return (
        <form className="customer-form" onSubmit={handleSubmit}>
            <h3>Add Customer</h3>

            <label>Name:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                // Ensure emptyfields is an array before using includes
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Phone:</label>
            <input 
                type="text" 
                onChange={(e) => setPhone(e.target.value)} 
                value={phone} 
                // Ensure emptyfields is an array before using includes
                className={emptyFields.includes('phone') ? 'error' : ''}
            />

            <button>Add Customer</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CustomerForm
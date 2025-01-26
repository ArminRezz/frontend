import { useCustomersContext } from '../hooks/useCustomersContext'
import { useAuthContext } from '../hooks/useAuthContext'

const CustomerDetails = ({ customer }) => {
    const { dispatch } = useCustomersContext()
    const { businessUser } = useAuthContext()

    const handleDelete = async () => {
        if (!businessUser) {
            return
        }
        const response = await fetch('/api/customers/' + customer._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${businessUser.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CUSTOMER', payload: json})
        }
    }

    return (
        <div className="customer-details">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>ID:</strong> {customer._id}</p>
            <p><strong>Created At:</strong> {customer.createdAt}</p>
            <span onClick={handleDelete}>delete</span>
        </div>

    )
}

export default CustomerDetails
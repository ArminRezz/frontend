import { useEffect } from 'react'

// components 
import CustomerForm from '../components/customerForm'
import CreateBusinessQR from '../components/createBusinessQR'
import { useCustomersContext } from '../hooks/useCustomersContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePcustomersContext } from '../hooks/usePcustomersContext'
import CustomerTable from '../components/customerTable'
import PotentialCustomerTable from '../components/pcustomerTable'
const Home = () => {
    const { customers, dispatch } = useCustomersContext()
    const { businessUser } = useAuthContext()
    const { potentialCustomers, dispatch: dispatchPotentialCustomers } = usePcustomersContext()

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch('/api/customers', {
                headers: {
                    'Authorization': `Bearer ${businessUser.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_CUSTOMERS', payload: json})
            }
        }

        if (businessUser) {
            fetchCustomers()
        }
    }, [dispatch, businessUser])

    return (
        <div className="home">
            {/* <div className="customers">
                {customers && customers.map((customer) => (
                    <CustomerDetails key={customer._id} customer={customer} />
                ))}
            </div> */}
            <CreateBusinessQR /> 
            <CustomerForm /> 
            <CustomerTable data={customers} />
            <PotentialCustomerTable data={potentialCustomers} />
        </div>
    )
}

export default Home
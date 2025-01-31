import React from 'react';
import { useCustomersContext } from '../hooks/useCustomersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const CustomerTable = () => {
    const { customers, dispatch } = useCustomersContext();
    const { businessUser } = useAuthContext();

    const handleSetCustomers = async () => {
        if (!businessUser) {
            return;
        }
        const response = await fetch('/api/customers/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${businessUser.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_CUSTOMERS', payload: json });
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        if (!businessUser) {
            return;
        }
        const response = await fetch(`/api/customers/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${businessUser.token}`
            }
        });

        if (response.ok) {
            dispatch({ type: 'DELETE_CUSTOMER', payload: customerId });
        }
    };

    // set the initial customers list
    useEffect(() => {
        handleSetCustomers();
    }, [businessUser]);

    return (
        <table style={{ border: 'solid 1px blue', width: '100%' }}>
            <thead>
                <tr>
                    <th style={{
                        borderBottom: 'solid 3px #1aac83',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px',
                    }}>
                        Name
                    </th>
                    <th style={{
                        borderBottom: 'solid 3px #1aac83',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px',
                    }}>
                        Phone
                    </th>
                    <th style={{
                        borderBottom: 'solid 3px #1aac83',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px',
                    }}>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {customers && customers.map((row, index) => (
                    <tr key={index}>
                        <td style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                        }}>
                            {row.name}
                        </td>
                        <td style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                        }}>
                            {row.phone}
                        </td>
                        <td style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                        }}>
                            <button 
                                onClick={() => handleDeleteCustomer(row._id)}
                                style={{
                                    background: '#1aac83',
                                    border: 0,
                                    color: '#fff',
                                    padding: '4px',
                                    fontFamily: 'Poppins',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;

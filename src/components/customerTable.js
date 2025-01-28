import React, { useState, useEffect } from 'react';
import { useCustomersContext } from '../hooks/useCustomersContext';
import { useAuthContext } from '../hooks/useAuthContext';

function CustomerTable() {
    const { customers, dispatch } = useCustomersContext();
    const { businessUser } = useAuthContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!businessUser) {
            setError('You must be logged in');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch('/api/customers', {
                    headers: {
                        'Authorization': `Bearer ${businessUser.token}`,
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('Unauthorized. Please log in again.');
                        // Optionally, redirect to login page
                        return;
                    }
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    dispatch({ type: 'SET_CUSTOMERS', payload: data });
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                console.error('Error fetching customer data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, [businessUser, dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <table style={{ border: 'solid 1px blue', width: '100%' }}>
            <thead>
                <tr>
                    <th style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px',
                    }}>
                        Name
                    </th>
                    <th style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '10px',
                    }}>
                        Phone
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CustomerTable;

import React from 'react';
import { usePcustomersContext } from '../hooks/usePcustomersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';

const CustomerTable = () => {
    const { pcustomers, dispatch } = usePcustomersContext();
    const { businessUser } = useAuthContext();

    const handleSetCustomers = async () => {
        if (!businessUser) {
            return;
        }
        const response = await fetch('/api/pcustomers/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${businessUser.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'SET_PCUSTOMERS', payload: json });
        }
    };

    // set the initial customers list
    useEffect(() => {
        handleSetCustomers();
    }, [businessUser]);

    return (
        <>
            <table style={{ border: 'solid 1px blue', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{
                            background: 'aliceblue',
                            color: 'black',
                            fontWeight: 'bold',
                            padding: '10px',
                        }}>
                            Potential Customer List
                        </th>
                        <th style={{
                            background: '#f1f1f1',
                            color: 'black',
                            fontWeight: 'bold',
                            padding: '10px',
                            borderTop: 'solid 1px #f1f1f1',
                            borderRight: 'solid 1px #f1f1f1',
                        }}>            
                        </th>       
                        <th style={{
                            background: '#f1f1f1',
                            color: 'black',
                            fontWeight: 'bold',
                            padding: '10px',
                            borderLeft: 'solid 1px #f1f1f1',
                            borderTop: 'solid 1px #f1f1f1',
                            borderRight: 'solid 1px #f1f1f1',
                        }}>
                        </th>   
                    </tr>
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
                    {pcustomers && pcustomers.map((row, index) => (
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CustomerTable;

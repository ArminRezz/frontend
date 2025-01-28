import { useContext } from 'react';
import { CustomersContext } from '../context/customersContext';

export const useCustomersContext = () => {
    const context = useContext(CustomersContext);

    if (!context) {
        throw new Error('useCustomersContext must be used within a CustomersContextProvider');
    }

    return context;
};
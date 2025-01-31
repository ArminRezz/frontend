import { useContext } from 'react';
import { PCustomersContext } from '../context/pcustomersContext';

export const usePcustomersContext = () => {
    const context = useContext(PCustomersContext);
    
    if (!context) {
        throw new Error('usePcustomersContext must be used within a PCustomersContextProvider');
    }

    return context;
};
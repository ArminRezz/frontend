import React, { createContext, useReducer, useEffect } from 'react';

export const CustomersContext = createContext();

export const customersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CUSTOMERS':
            return { customers: action.payload }
        case 'CREATE_CUSTOMER':
            return { customers: [action.payload, ...state.customers] }
        case 'DELETE_CUSTOMER':
            return { customers: state.customers.filter((c) => c._id !== action.payload) }
        default:
            return state
    }
}

export const CustomersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customersReducer, {
    customers: []
  })

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch('/api/customers/', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('businessUser')).token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CUSTOMERS', payload: json})
      }
    }

    const user = JSON.parse(localStorage.getItem('businessUser'))
    if (user) {
      fetchCustomers()
    }
  }, [])

  return (
    <CustomersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomersContext.Provider>
  );
}; 
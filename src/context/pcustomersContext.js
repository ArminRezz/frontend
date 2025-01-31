import React, { createContext, useReducer, useEffect } from 'react';

export const PCustomersContext = createContext();

export const pcustomersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PCUSTOMERS':
            return { pcustomers: action.payload }
        case 'CREATE_PCUSTOMER':
            return { pcustomers: [action.payload, ...state.pcustomers] }
        case 'DELETE_PCUSTOMER':
            return { pcustomers: state.pcustomers.filter((c) => c._id !== action.payload) }
        default:
            return state
    }
}

export const PCustomersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pcustomersReducer, {
    pcustomers: []
  })

  useEffect(() => {
    const fetchPCustomers = async () => {
      const response = await fetch('/api/pcustomers/', {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('businessUser')).token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_PCUSTOMERS', payload: json})
      }
    }

    const user = JSON.parse(localStorage.getItem('businessUser'))
    if (user) {
      fetchPCustomers()
    }
  }, [])

  return (
    <PCustomersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PCustomersContext.Provider>
  );
}; 
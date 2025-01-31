// Import required React hooks and routing components
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Import pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CustomerCreation from './pages/CustomerCreation'
import PotentialCustomerForm from './pages/PotentialCustomerForm'
import Navbar from './components/Navbar'


// Main App component
function App() {
  // Get business user from auth context
  const { businessUser } = useAuthContext()
  // Get current location for routing
  const location = useLocation()
  // State to track if current link/route is valid
  const [isLinkValid, setIsLinkValid] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // New loading state
  
  // Effect to validate links on location change
  useEffect(() => {
    const isValidLink = async () => {
      const params = new URLSearchParams(location.search)
      const email = params.get('email')
      const customerId = params.get('id')

      if (location.pathname === '/CustomerCreation') {
        if (!email) return false

        try {
          const response = await fetch('/api/businessUser/existence', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const data = await response.json()
          console.log('API response for email existence:', data)
          return data.exists
        } catch (error) {
          console.error('Error verifying email:', error)
          return false
        }
      } else if (location.pathname === '/PotentialCustomerForm') {
        if (!customerId) return false

        try {
          const response = await fetch(`/api/customers/public/${customerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

          const data = await response.json()
          console.log('API response for customer ID existence:', data)
          return data._id == customerId // Assuming the response contains an 'exists' field
        } catch (error) {
          console.error('Error verifying customer ID:', error)
          return false
        }
      }
      return false;
    };

    // Check link validity and update state
    const checkLinkValidity = async () => {
      const valid = await isValidLink();
      console.log('Setting link validity to:', valid); // Log the value being set
      setIsLinkValid(valid);
      setIsLoading(false); // Set loading to false after validity check
    };

    // Call the checkLinkValidity function
    checkLinkValidity();
  }, [location]); // Re-run when location changes

  // Render app with navigation and routes
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        {isLoading ? ( // Conditional rendering based on loading state
          <div>Loading...</div>
        ) : (
          <Routes>
            {/* Home route - requires business user auth */}
            <Route
              path="/"
              element={businessUser ? <Home /> : <Navigate to="/login" />}
            />
            {/* Login route - only accessible if not logged in */}
            <Route
              path="/login"
              element={!businessUser ? <Login /> : <Navigate to="/" />}
            />
            {/* Signup route - only accessible if not logged in */}
            <Route
              path="/signup"
              element={!businessUser ? <Signup /> : <Navigate to="/" />}
            />
            {/* CustomerCreation route - requires valid link with business email */}
            <Route
              path="/CustomerCreation"
              element={isLinkValid ? <CustomerCreation /> : <Navigate to="/login" />}
            />
            {/* PotentialCustomerForm route - requires valid link with customer ID */}
            <Route
              path="/PotentialCustomerForm"
              element={isLinkValid ? <PotentialCustomerForm /> : <Navigate to="/login" />}
            />
          </Routes>
        )}
      </div>
    </div>
  )
}

export default App
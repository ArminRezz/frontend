import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CustomerCreation from './pages/CustomerCreation'
import Navbar from './components/Navbar'


function App() {
  const { businessUser } = useAuthContext()
  const location = useLocation()
  const [isLinkValid, setIsLinkValid] = useState(null)

  useEffect(() => {
    const isValidLink = async () => {
      const params = new URLSearchParams(location.search)
      const email = params.get('email')

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
        return data.exists
      } catch (error) {
        console.error('Error verifying email:', error)
        return false
      }
    }

    const checkLinkValidity = async () => {
      const valid = await isValidLink()
      setIsLinkValid(valid)
    }

    checkLinkValidity()
  }, [location])

  if (isLinkValid === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={businessUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!businessUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!businessUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/CustomerCreation"
            element={isLinkValid ? <CustomerCreation /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('token') ? true : null
  })
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      setUser(true)
    }
  }, [token])

  const login = (accessToken) => {
    localStorage.setItem('token', accessToken)
    setToken(accessToken)
    setUser(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

// This file defines the AuthContext and AuthProvider components to manage authentication state across the application. 
// It provides login and logout functions, and stores the JWT token in localStorage for persistence. 
// The useAuth hook allows components to access the authentication context easily.
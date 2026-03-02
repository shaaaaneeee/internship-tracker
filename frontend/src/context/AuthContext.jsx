import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    return token ? { email } : null
  })

  const login = (accessToken, email) => {
    localStorage.setItem('token', accessToken)
    localStorage.setItem('email', email)
    setUser({ email })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
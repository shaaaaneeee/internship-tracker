import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute

// This component checks if the user is authenticated. If not, it redirects to the login page. Otherwise, it renders the child components.
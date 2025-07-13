import { Navigate } from 'react-router-dom';
import { useUserInfoQuery } from '../store/api/authEndpoints';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const { data: user, isLoading, error } = useUserInfoQuery();

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If there's an error or no user data, redirect to home
  if (error || !user) {
    return <Navigate to="/" replace />;
  }

  // Check if user has the required role
  if (user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If user is authorized, render the protected content
  return children;
};

export default ProtectedRoute;

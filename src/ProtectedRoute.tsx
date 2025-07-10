// routes/ProtectedRoute.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useLogto } from '@logto/react';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useLogto();

  if (isLoading) {
    return <p>Verificando autenticação...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
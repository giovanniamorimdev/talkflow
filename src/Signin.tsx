import { useLogto } from '@logto/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const { isAuthenticated, signIn } = useLogto();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Redireciona para a home se já estiver autenticado
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = () => {
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    signIn({ redirectUri });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Faça login</h1>
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Entrar com Logto V6
      </button>
    </div>
  );
}
import { useEffect } from 'react';
import { useLogto } from '@logto/react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const { isAuthenticated, isLoading, signIn } = useLogto();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Aguarda verificação

    if (isAuthenticated) {
      // Já está autenticado → vai direto para o chat
      navigate('/');
    } else {
      // Não está autenticado → vai direto para o login do Logto
      const redirectUri = import.meta.env.VITE_REDIRECT_URI;
      signIn({ redirectUri });
    }
  }, [isAuthenticated, isLoading, navigate, signIn]);

  return null; // Não mostra nada, apenas redireciona
}
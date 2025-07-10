import { useHandleSignInCallback } from '@logto/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const { isLoading, error } = useHandleSignInCallback();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) {
      navigate('/');
    }
  }, [isLoading, error, navigate]);

  if (isLoading) return <p>Processando login...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return null;
}

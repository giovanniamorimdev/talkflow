import { useLogto } from '@logto/react';

export default function Signin() {
  const { signIn } = useLogto();

  const handleLogin = () => {
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    signIn({ redirectUri });
  };

  return (
    <button onClick={handleLogin}>
      Entrar com Logto
    </button>
  );
}
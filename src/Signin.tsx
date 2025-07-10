import { useEffect } from 'react';
import { useLogto } from '@logto/react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const { isAuthenticated, signIn } = useLogto();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = () => {
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    signIn({ redirectUri });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
          <p className="text-lg text-gray-600">
            Ao <span className="font-semibold text-indigo-600">Agente de IA Sintia</span>
          </p>
        </div>

        {/* Texto de descrição */}
        <p className="text-sm text-gray-500">
          Faça login para acessar as funcionalidades inteligentes e interativas da Sintia.
        </p>

        {/* Botão de login */}
        <button
          onClick={handleSignIn}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span>Acessar tela de login</span>
        </button>

        {/* Rodapé */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Versão Beta • © {new Date().getFullYear()} Sintia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
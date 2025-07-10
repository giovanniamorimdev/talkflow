import { useLogto } from '@logto/react';
import { useEffect } from 'react';
import { useChatSessions } from '@/hooks/useChatSessions';
import { ChatLayout } from '@/components/chat/ChatLayout';

const Signin = () => {
  const { isAuthenticated, signIn } = useLogto();

  useEffect(() => {
    if (!isAuthenticated) {
      signIn({ redirectUri: 'https://administrativo.sintia.app.br/callback' });
    }
  }, [isAuthenticated, signIn]);

  // Enquanto está redirecionando, pode mostrar um loading
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Redirecionando para login...</p>
      </div>
    );
  }

  // Se estiver autenticado, renderiza o chat normalmente
  const {
    sessions,
    currentSessionId,
    isLoading,
    isTyping,
    createNewSession,
    deleteSession,
    renameSession,
    sendMessage,
    setCurrentSessionId,
    toggleFavorite,
  } = useChatSessions();

  return (
    <div className="relative">
      <ChatLayout
        sessions={sessions}
        currentSessionId={currentSessionId}
        isLoading={isLoading}
        isTyping={isTyping}
        onNewChat={createNewSession}
        onSessionSelect={setCurrentSessionId}
        onDeleteSession={deleteSession}
        onRenameSession={renameSession}
        onToggleFavorite={toggleFavorite}
        onSendMessage={sendMessage}
      />
    </div>
  );
};

export default Signin;
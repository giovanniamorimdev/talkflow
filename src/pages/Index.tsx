import { useLogto } from '@logto/react';
import { useChatSessions } from '@/hooks/useChatSessions';
import { ChatLayout } from '@/components/chat/ChatLayout';

const Index = () => {
  const { isAuthenticated, signIn } = useLogto();

  // Se não estiver logado, exibe botão para login e não renderiza o chat
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2>Você precisa entrar para acessar o chat.</h2>
        <button
          onClick={() => signIn({ redirectUri: window.location.origin })}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Entrar
        </button>
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

export default Index;

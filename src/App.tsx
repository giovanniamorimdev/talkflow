import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import NotFound from "./pages/NotFound";
import { v4 as uuidv4 } from 'uuid';

// **Import LogtoProvider e tipo de config**
import { LogtoProvider, LogtoConfig } from '@logto/react';
import Callback from "./Callback";
import Signin from "./Signin";
import Home from "./pages/Home";
import Index from "./pages/Index";
import ProtectedRoute from "./ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 0,
      queryKeyHashFn: () => uuidv4(),
    },
  },
});

// **Configuração Logto (copie do admin console)**
const config: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
};

const App = () => {
  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  return (
    // **Envolvendo tudo no LogtoProvider**
    <LogtoProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Index />} />
              </Route>
              <Route path="/signin" element={<Signin />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/callback" element={<Callback />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LogtoProvider>
  );
};

export default App;

import { useLogto } from '@logto/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";

// Nome temporário (opcional, pode vir do token depois)
const nomeCompleto = import.meta.env.VITE_NOME || "Usuário";
const iniciais = nomeCompleto
  .split(" ")
  .map((p) => p[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function Header() {
  const { signOut } = useLogto(); // Hook do Logto

  const handleLogout = () => {
    // ✅ Use apenas a string do redirect URI
    const postLogoutRedirectUri = import.meta.env.VITE_LOGOUT_REDIRECT_URI as string || '/signin';

    // 🔐 Chama o logout do Logto com o redirect correto
    signOut(postLogoutRedirectUri);
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-background">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm text-white"
            style={{ backgroundColor: "#1b3e6e" }}
          >
            {iniciais}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleLogout}>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
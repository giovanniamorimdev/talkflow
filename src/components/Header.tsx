import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

// Nome temporário (opcional)
const nomeCompleto = import.meta.env.VITE_NOME || "Usuário";
const iniciais = nomeCompleto
  .split(" ")
  .map((p) => p[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Se tiver algo para limpar (ex.: tokens no localStorage), faça aqui:
    // localStorage.removeItem("token");
    // sessionStorage.clear();

    // Redireciona para a tela inicial ou de login (ajuste conforme sua necessidade)
    navigate("/"); 
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

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const correctUsername = import.meta.env.VITE_USERNAME
    const correctPassword = import.meta.env.VITE_PASSWORD

    if (username === correctUsername && password === correctPassword) {
        localStorage.setItem("isLoggedIn", "true")
        toast.success("Login bem-sucedido!")
        navigate("/", { replace: true })
      } else {
      setError("Usuário ou senha incorretos.")
      toast.error("Falha no login")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

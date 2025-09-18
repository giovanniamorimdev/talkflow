import { useState } from "react";

export default function Home() {
  const [user] = useState({ nome: "Usuário Exemplo", email: "usuario@exemplo.com" });

  return (
    <div>
      <h1>Bem-vindo, {user.nome}</h1>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(user).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useLogto, type IdTokenClaims } from '@logto/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isAuthenticated, signIn, signOut, getIdTokenClaims } = useLogto();
  const [user, setUser] = useState<IdTokenClaims>();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUser(claims);
      } else {
        setUser(undefined);
      }
    })();
  }, [getIdTokenClaims, isAuthenticated]);

  if (!isAuthenticated) {
    return <button onClick={() => signIn({ redirectUri: window.location.href })}>Entrar</button>;
  }

  return (
    <div>
      <button onClick={() => signOut()}>Sair</button>

      {user && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(user).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{typeof value === 'string' ? value : JSON.stringify(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

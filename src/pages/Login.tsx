import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">
      <div className="bg-black/75 rounded-md p-12 w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-8">Se connecter</h1>

        {error && (
          <p className="bg-[#e87c03]/20 text-[#e87c03] text-sm rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Adresse email"
            onChange={handleEmailChange}
            className="bg-[#333] text-white text-sm rounded px-4 py-3.5 focus:outline-none focus:bg-[#454545] placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
            className="bg-[#333] text-white text-sm rounded px-4 py-3.5 focus:outline-none focus:bg-[#454545] placeholder-gray-400"
          />
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-[#E50914] hover:bg-[#f6121d] text-white font-bold py-3 rounded transition-colors mb-6"
        >
          Se connecter
        </button>

        <p className="text-gray-400 text-sm">
          Nouveau sur Sport Tracker ?{' '}
          <Link to="/signup" className="text-white hover:underline">
            Inscrivez-vous maintenant
          </Link>
        </p>
      </div>
    </div>
  );
}

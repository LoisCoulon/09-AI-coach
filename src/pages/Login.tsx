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
    <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center px-4">
      <div className="bg-white border border-[#E5DFD3] rounded-xl p-10 w-full max-w-md">
        <h1 className="text-[#3D3929] text-2xl font-semibold mb-8">
          Se connecter
        </h1>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-md px-4 py-2.5 mb-4">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Adresse email"
            onChange={handleEmailChange}
            className="bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-3 focus:outline-none focus:border-[#D97757] placeholder-[#8A8478]"
          />
          <input
            onKeyDown={(e) => e.key === 'Enter' && handleSignIn}
            type="password"
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
            className="bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-3 focus:outline-none focus:border-[#D97757] placeholder-[#8A8478]"
          />
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-[#D97757] hover:bg-[#c56847] text-white font-medium py-3 rounded-md transition-colors mb-6 cursor-pointer"
        >
          Se connecter
        </button>

        <p className="text-[#8A8478] text-sm">
          Nouveau sur Coach Nutrition ?{' '}
          <Link
            to="/signup"
            className="text-[#D97757] hover:underline font-medium"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}

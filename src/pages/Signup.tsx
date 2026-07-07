import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signUp } = useAuth();
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  async function handleSignUp() {
    try {
      await signUp(email, password);
      setSignUpSuccess(true);
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
      {signUpSuccess ? (
        <div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Vérifiez vos emails
          </h1>
          <p className="text-gray-400 text-sm">
            Un email de confirmation a été envoyé à{' '}
            <span className="text-white">{email}</span>
          </p>
        </div>
      ) : (
        <div className="bg-black/75 rounded-md p-12 w-full max-w-md">
          <h1 className="text-white text-3xl font-bold mb-8">S'inscrire</h1>

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
            onClick={handleSignUp}
            className="w-full bg-[#E50914] hover:bg-[#f6121d] text-white font-bold py-3 rounded transition-colors mb-6"
          >
            S'inscrire
          </button>

          <p className="text-gray-400 text-sm">
            Déjà inscrit ? {''}
            <Link to="/login" className="text-white hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

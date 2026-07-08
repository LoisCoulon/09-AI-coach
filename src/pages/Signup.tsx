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
    <div className="min-h-screen bg-[#F5F1EA] flex items-center justify-center px-4">
      {signUpSuccess ? (
        <div>
          <h1 className="text-[#D97757] text-2xl font-bold mb-4">
            Vérifiez vos emails
          </h1>
          <p className="text-gray-600 text-sm">
            Un email de confirmation a été envoyé à{' '}
            <span className="text-[#D97757]">{email}</span>
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#E5DFD3] rounded-xl p-10 w-full max-w-md">
          <h1 className="text-[#3D3929] text-2xl font-semibold mb-8">
            S'inscrire
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
              type="password"
              placeholder="Mot de passe"
              onChange={handlePasswordChange}
              className="bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-3 focus:outline-none focus:border-[#D97757] placeholder-[#8A8478]"
            />
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-[#D97757] hover:bg-[#c56847] text-white font-medium py-3 rounded-md transition-colors mb-6 cursor-pointer"
          >
            S'inscrire
          </button>

          <p className="text-[#8A8478] text-sm">
            Déjà inscrit ?{' '}
            <Link
              to="/login"
              className="text-[#D97757] hover:underline font-medium"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useState } from 'react';

export default function Navbar() {
  const { signOut } = useAuth();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <nav className="bg-[#F5F1EA] border-b border-[#E5DFD3] px-8 py-4 flex items-center justify-between">
      <h1 className="text-[#3D3929] font-semibold text-xl tracking-tight">
        Coach Nutrition
      </h1>
      <div className="flex items-center gap-4">
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          onClick={handleSignOut}
          className="bg-[#D97757] hover:bg-[#c56847] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

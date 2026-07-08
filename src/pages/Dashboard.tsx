import { useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import { useProfile } from '../context/useProfile';
import type { UserProfile } from '../types/UserProfile';
import calculateTDEE from '../utils/calculateTDEE';
import Navbar from '../components/Navbar';
export default function Dashboard() {
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function getActivityLabel(level: UserProfile['activityLevel']): string {
    switch (level) {
      case 'sedentary':
        return 'Sédentaire';
      case 'light':
        return 'Légèrement actif';
      case 'moderate':
        return 'Modérément actif';
      case 'active':
        return 'Actif';
      case 'veryActive':
        return 'Très actif';
      default:
        return '';
    }
  }
  function getGoalLabel(goal: UserProfile['goal']): string {
    switch (goal) {
      case 'lose':
        return 'Perdre du poids';
      case 'maintain':
        return 'Garder le même poids';
      case 'gain':
        return 'Prendre du poids';
      default:
        return '';
    }
  }

  function openForm() {
    setIsEditing(true);
  }

  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-semibold text-[#3D3929] tracking-tight mb-8">
          Tableau de bord
        </h1>

        {!profile ? (
          <ProfileForm />
        ) : isEditing ? (
          <ProfileForm profile={profile} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="bg-white border border-[#E5DFD3] rounded-xl p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                  Âge
                </p>
                <p className="text-[#3D3929] font-medium">{profile.age} ans</p>
              </div>
              <div>
                <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                  Poids
                </p>
                <p className="text-[#3D3929] font-medium">
                  {profile.weight} kg
                </p>
              </div>
              <div>
                <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                  Taille
                </p>
                <p className="text-[#3D3929] font-medium">
                  {profile.height} cm
                </p>
              </div>
              <div>
                <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                  Sexe
                </p>
                <p className="text-[#3D3929] font-medium">
                  {profile.gender === 'male' ? 'Homme' : 'Femme'}
                </p>
              </div>
              <div>
                <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                  Activité
                </p>
                <p className="text-[#3D3929] font-medium">
                  {getActivityLabel(profile.activityLevel)}
                </p>
              </div>
              <div>
                <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                  Objectif
                </p>
                <p className="text-[#3D3929] font-medium">
                  {getGoalLabel(profile.goal)}
                </p>
              </div>
            </div>

            <div className="bg-[#F5F1EA] rounded-lg p-6 mb-6 text-center">
              <p className="text-[#8A8478] text-xs uppercase tracking-wider mb-1">
                Besoin calorique quotidien
              </p>
              <p className="text-[#D97757] text-3xl font-bold">
                {calculateTDEE(profile)} <span className="text-lg">kcal</span>
              </p>
            </div>

            <button
              onClick={openForm}
              className="text-[#D97757] hover:text-[#c56847] text-sm font-medium transition-colors cursor-pointer"
            >
              Modifier mon profil →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import ProfileForm from '../components/ProfileForm';
import { useProfile } from '../context/useProfile';
import type { UserProfile } from '../types/UserProfile';
import calculateTDEE from '../utils/calculateTDEE';
export default function Dashboard() {
  const { profile } = useProfile();

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

  return (
    <>
      <h1>Dashboard</h1>
      {!profile ? (
        <ProfileForm />
      ) : (
        <div className="flex gap-2 mb-3">
          <span>Age : {profile.age}ans</span>
          <span>Poids : {profile.weight}kg</span>
          <span>Taille : {profile.height}cm</span>
          <span>Sexe : {profile.gender === 'male' ? 'Homme' : 'Femme'}</span>
          <span>Activité : {getActivityLabel(profile.activityLevel)}</span>
          <span>Objectif : {getGoalLabel(profile.goal)}</span>
          <p className="text-l font-bold mt-4">
            Besoin calorique quotidien : {calculateTDEE(profile)} kcal
          </p>
        </div>
      )}
    </>
  );
}

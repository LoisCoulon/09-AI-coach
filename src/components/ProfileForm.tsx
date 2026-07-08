import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useProfile } from '../context/useProfile';
import type { UserProfile } from '../types/UserProfile';

interface ProfileFormProps {
  profile?: UserProfile;
  onCancel?: () => void;
}

export default function ProfileForm({ profile, onCancel }: ProfileFormProps) {
  const [age, setAge] = useState<number | undefined>(profile?.age);
  const [weight, setWeight] = useState<number | undefined>(profile?.weight);
  const [height, setHeight] = useState<number | undefined>(profile?.height);
  const [gender, setGender] = useState<'male' | 'female' | null>(
    profile?.gender ?? null,
  );
  const [activityLevel, setActivityLevel] = useState<
    UserProfile['activityLevel'] | null
  >(profile?.activityLevel ?? null);
  const [goal, setGoal] = useState<UserProfile['goal'] | null>(
    profile?.goal ?? null,
  );
  const { user } = useAuth();
  const { saveProfile, updateProfile } = useProfile();

  async function handleSave() {
    if (
      !user ||
      !age ||
      !weight ||
      !height ||
      !gender ||
      !activityLevel ||
      !goal
    )
      return;

    if (profile) {
      const updatedProfile: UserProfile = {
        user_id: user.id,
        age,
        weight,
        height,
        gender,
        activityLevel,
        goal,
      };
      await updateProfile(updatedProfile);
    } else {
      // Mode création : pas d'id encore
      const newProfile: Omit<UserProfile, 'id'> = {
        user_id: user.id,
        age,
        weight,
        height,
        gender,
        activityLevel,
        goal,
      };
      await saveProfile(newProfile);
    }

    onCancel?.();
  }

  function handleAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAge(event.target.valueAsNumber);
  }

  function handleWeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWeight(event.target.valueAsNumber);
  }
  function handleHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHeight(event.target.valueAsNumber);
  }
  function handleGenderChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setGender(event.target.value as 'male' | 'female');
  }
  function handleActivityLevelChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setActivityLevel(
      event.target.value as
        | 'sedentary'
        | 'light'
        | 'moderate'
        | 'active'
        | 'veryActive',
    );
  }
  function handleGoalChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setGoal(event.target.value as 'lose' | 'maintain' | 'gain');
  }

  return (
    <div className="bg-white border border-[#E5DFD3] rounded-xl p-8">
      <h2 className="text-lg font-semibold text-[#3D3929] mb-6">
        {profile ? 'Modifier mon profil' : 'Créer mon profil'}
      </h2>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-[#8A8478] text-xs uppercase tracking-wider mb-1.5">
            Âge
          </label>
          <input
            value={age ?? ''}
            onChange={handleAgeChange}
            placeholder="Ex: 28"
            type="number"
            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#D97757]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8A8478] text-xs uppercase tracking-wider mb-1.5">
              Poids (kg)
            </label>
            <input
              value={weight ?? ''}
              onChange={handleWeightChange}
              type="number"
              placeholder="Ex: 75"
              className="w-full bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#D97757]"
            />
          </div>
          <div>
            <label className="block text-[#8A8478] text-xs uppercase tracking-wider mb-1.5">
              Taille (cm)
            </label>
            <input
              value={height ?? ''}
              onChange={handleHeightChange}
              type="number"
              placeholder="Ex: 178"
              className="w-full bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#D97757]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#8A8478] text-xs uppercase tracking-wider mb-1.5">
            Genre
          </label>
          <select
            value={gender ?? ''}
            onChange={handleGenderChange}
            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#D97757]"
          >
            <option value="">-- Choisir --</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>

        <div>
          <label className="block text-[#8A8478] text-xs uppercase tracking-wider mb-1.5">
            Niveau d'activité physique
          </label>
          <select
            value={activityLevel ?? ''}
            onChange={handleActivityLevelChange}
            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#D97757]"
          >
            <option value="">-- Choisir --</option>
            <option value="sedentary">Sédentaire</option>
            <option value="light">Léger</option>
            <option value="moderate">Modéré</option>
            <option value="active">Actif</option>
            <option value="veryActive">Très actif</option>
          </select>
        </div>

        <div>
          <label className="block text-[#8A8478] text-xs uppercase tracking-wider mb-1.5">
            Objectif
          </label>
          <select
            value={goal ?? ''}
            onChange={handleGoalChange}
            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] text-[#3D3929] text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#D97757]"
          >
            <option value="">-- Choisir --</option>
            <option value="lose">Perdre du poids</option>
            <option value="maintain">Se maintenir</option>
            <option value="gain">Prendre du poids</option>
          </select>
        </div>
      </div>

      <button
        disabled={
          !user ||
          !age ||
          !weight ||
          !height ||
          !gender ||
          !activityLevel ||
          !goal
        }
        onClick={handleSave}
        className="w-full bg-[#D97757] hover:bg-[#c56847] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-md transition-colors cursor-pointer"
      >
        {profile ? 'Enregistrer les modifications' : 'Créer mon profil'}
      </button>
    </div>
  );
}

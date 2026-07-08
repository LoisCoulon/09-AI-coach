import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useProfile } from '../context/useProfile';
import type { UserProfile } from '../types/UserProfile';

export default function ProfileForm() {
  const [age, setAge] = useState<number | null>();
  const [weight, setWeight] = useState<number | null>();
  const [height, setHeight] = useState<number | null>();
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [activityLevel, setActivityLevel] = useState<
    'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | null
  >(null);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain' | null>(null);
  const { user } = useAuth();
  const { saveProfile } = useProfile();

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
    console.log(newProfile);
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
    <div>
      <input
        value={age}
        onChange={handleAgeChange}
        placeholder="age"
        type="number"
      />
      <input
        value={weight}
        onChange={handleWeightChange}
        type="number"
        placeholder="poids"
      />
      <input
        value={height}
        onChange={handleHeightChange}
        type="number"
        placeholder="taille"
      />
      <div>
        <label htmlFor="gender">Choisir un genre</label>
        <select
          value={gender ?? ''}
          onChange={handleGenderChange}
          name="gender"
          id="gender"
        >
          <option value="">-- Choisir --</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
      </div>
      <div>
        <label htmlFor="activityLevel">Votre niveau d'activité physique</label>
        <select
          value={activityLevel ?? ''}
          onChange={handleActivityLevelChange}
          name="activityLevel"
          id="activityLevel"
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
        <label htmlFor="goal">Choisir un objectif</label>
        <select
          value={goal ?? ''}
          onChange={handleGoalChange}
          name="goal"
          id="goal"
        >
          <option value="">-- Choisir --</option>
          <option value="lose">Perdre du poids</option>
          <option value="maintain">Se maintenir</option>
          <option value="gain">Prendre du poids</option>
        </select>
      </div>
      <button
        className="border border-amber-600"
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
      >
        Valider
      </button>
    </div>
  );
}

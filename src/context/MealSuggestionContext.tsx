import { useState } from 'react';
import { useAuth } from './useAuth';
import type { MealSuggestions } from '../types/MealSuggestion';
import { supabase } from '../config/supabase';
import { MealSuggestionContext } from './MealSuggestionContextInstance';

interface MealSuggestionProviderProps {
  children: React.ReactNode;
}

export default function MealSuggestionProvider({
  children,
}: MealSuggestionProviderProps) {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<MealSuggestions[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function generateMeals(targetCalories: number, goal: string) {
    if (!user) return;
    setIsLoading(true);

    try {
      const response = await fetch('api/generate-meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCalories, goal }),
      });

      const data = await response.json();

      const newSuggestion: Omit<MealSuggestions, 'id'> = {
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        meals: data.meals,
        totalCalories: data.totalCalories,
      };

      const { data: savedData, error } = await supabase
        .from('meal_suggestions')
        .insert([newSuggestion])
        .select()
        .single();

      if (error) throw error;

      if (savedData) {
        setSuggestions([...suggestions, savedData]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <MealSuggestionContext.Provider
      value={{ suggestions, isLoading, generateMeals }}
    >
      {children}
    </MealSuggestionContext.Provider>
  );
}

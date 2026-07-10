import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import type { MealSuggestions } from '../types/MealSuggestion';
import { supabase } from '../config/supabase';
import { MealSuggestionContext } from './MealSuggestionContextInstance';
import {
  fromDbMealSuggestion,
  toDbMealSuggestion,
} from '../utils/mealSuggestionMapper';

interface MealSuggestionProviderProps {
  children: React.ReactNode;
}

export default function MealSuggestionProvider({
  children,
}: MealSuggestionProviderProps) {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<MealSuggestions[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function generateMeals(targetCalories: number, goal: string) {
    if (!user) return;
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCalories, goal }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Échec de la génération des repas');
      }

      const data = await response.json();

      const newSuggestion: Omit<MealSuggestions, 'id'> = {
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        meals: data.meals,
        totalCalories: data.totalCalories,
      };

      const { data: savedData, error } = await supabase
        .from('meal_suggestions')
        .insert([toDbMealSuggestion(newSuggestion)])
        .select()
        .single();

      if (error) throw error;

      if (savedData) {
        setSuggestions([...suggestions, fromDbMealSuggestion(savedData)]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    async function fetchSuggestions() {
      if (!user) return;

      const { data, error } = await supabase
        .from('meal_suggestions')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setSuggestions(data.map(fromDbMealSuggestion));
      }
    }

    fetchSuggestions();
  }, [user]);

  return (
    <MealSuggestionContext.Provider
      value={{ suggestions, isLoading, generateMeals, error }}
    >
      {children}
    </MealSuggestionContext.Provider>
  );
}

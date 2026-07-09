import { useContext } from 'react';
import { MealSuggestionContext } from './MealSuggestionContextInstance';

export function useMealSuggestions() {
  const context = useContext(MealSuggestionContext);
  if (context === null) {
    throw new Error(
      'useMealSuggestions doit être utilisé dans un MealSuggestionProvider',
    );
  }
  return context;
}

import Navbar from '../components/Navbar';
import { useMealSuggestions } from '../context/useMealSuggestions';

export default function History() {
  const { suggestions } = useMealSuggestions();
  const sortedSuggestions = suggestions.sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  return (
    <div className="min-h-screen bg-[#F5F1EA]">
      <Navbar />
      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-[#3D3929] tracking-tight mb-8 text-center">
          Historique des repas
        </h1>
        {sortedSuggestions &&
          sortedSuggestions.map((suggestion) => (
            <div>
              <p className="font-medium text-[#3D3929] m-2">
                {suggestion.date}
              </p>

              <div
                key={suggestion.id}
                className="grid grid-cols-4 gap-1 mr-1 ml-1"
              >
                {suggestion.meals.map((meal, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#E5DFD3] rounded-lg p-4 mb-3 "
                  >
                    <p className="font-medium text-[#3D3929]">{meal.name}</p>
                    <p className="text-[#D97757] font-semibold">
                      {meal.calories} kcal
                    </p>
                    <p className="text-sm text-[#8A8478]">
                      Protéines : {meal.protein}g · Glucides : {meal.carbs}g ·
                      Lipides : {meal.fat}g
                    </p>
                    <p className="text-sm text-[#8A8478] mt-2">Ingrédients :</p>
                    <ul className="text-sm text-[#3D3929] list-disc list-inside">
                      {meal.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

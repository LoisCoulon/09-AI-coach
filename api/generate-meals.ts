import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { targetCalories, goal } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  const prompt = `Tu es un coach nutritionniste. Génère une journée complète de repas (petit-déjeuner, déjeuner, dîner, une collation) pour une personne dont l'objectif est de ${goal === 'lose' ? 'perdre du poids' : goal === 'gain' ? 'prendre du poids' : 'maintenir son poids'}, avec un total d'environ ${targetCalories} calories pour la journée.

Réponds UNIQUEMENT avec un JSON valide, sans texte avant ou après, au format exact suivant :
{
  "meals": [
    { "name": "string", "calories": number, "protein": number, "carbs": number, "fat": number, "ingredients": ["string"] }
  ],
  "totalCalories": number
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey!,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;

    res.status(200).json(JSON.parse(textResponse));
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate meals' });
  }
}

import React, { Suspense } from 'react';

import createRecipeDetailsResource from '@/resources/createRecipeDetailsResource';
import { Ingredient } from '@/types';

type RecipeDetailsProps = { params: { id: string } };

export default async function RecipeDetails({ params }: RecipeDetailsProps) {
  const { id } = await params;

  const recipeResource = createRecipeDetailsResource(id);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Details</h1>
      <Suspense fallback={<div>Loading recipe details...</div>}>
        <RecipeDetailsContent resource={recipeResource} />
      </Suspense>
    </div>
  );
}

function RecipeDetailsContent({
  resource,
}: {
  resource: ReturnType<typeof createRecipeDetailsResource>;
}) {
  const recipe = resource.read();

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">{recipe?.title}</h2>
      <ul className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        {recipe?.extendedIngredients.map((ingredient: Ingredient) => (
          <li key={ingredient.id} className="border-b p-2">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

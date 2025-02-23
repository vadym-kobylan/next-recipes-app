import Link from 'next/link';
import React, { Suspense } from 'react';

import RecipeCard from '@/components/RecipeCard';
import createRecipeResource from '@/resources/createRecipeResource';
import { ParamsType } from '@/types';

type RecipesPageProps = {
  searchParams: ParamsType;
};

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const { query, cuisine, maxReadyTime } = await searchParams;

  const recipeResource = createRecipeResource({ query, cuisine, maxReadyTime });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>
      <Suspense fallback={<div>Loading recipes...</div>}>
        <RecipesList resource={recipeResource} />
      </Suspense>
    </div>
  );
}

function RecipesList({ resource }: { resource: ReturnType<typeof createRecipeResource> }) {
  const recipes = resource.read();

  if (recipes?.length === 0) {
    return (
      <div className="text-center">
        <p className="text-xl font-semibold mb-4">No recipes found.</p>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Go Back to Search
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recipes?.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </div>
  );
}

import fetchRecipes from '@/lib/fetchRecipes';
import { ParamsType, RecipeType } from '@/types';

const createRecipeResource = (searchParams: ParamsType) => {
  let status = 'pending';
  let result: RecipeType[] | null = null;
  let error: Error | null = null;

  const promise = fetchRecipes(searchParams)
    .then((res) => {
      status = 'success';
      result = res;
    })
    .catch((err) => {
      status = 'error';
      error = err;
    });

  return {
    read() {
      if (status === 'pending') {
        throw promise; // This will trigger the loading state in Suspense
      } else if (status === 'error') {
        throw error;
      } else if (status === 'success') {
        return result!;
      }
    },
  };
};

export default createRecipeResource;

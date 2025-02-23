export type RecipeType = {
  id: number;
  image: string;
  imageType: string;
  title: string;
};

export type ParamsType = {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
};

export type Ingredient = { id: number; name: string };

export type RecipeDetails = {
  id: number;
  title: string;
  extendedIngredients: Ingredient[];
};

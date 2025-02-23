import 'server-only';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

type ParamsType = {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
};

const api = setupCache(axios.create());

export default async function fetchRecipes(searchParams: ParamsType) {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    console.error('API key is missing');
    throw new Error('API key is missing');
  }

  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

  if (searchParams.query) {
    url += `&query=${searchParams.query}`;
  }
  if (searchParams.cuisine) {
    url += `&cuisine=${searchParams.cuisine}`;
  }
  if (searchParams.maxReadyTime) {
    url += `&maxReadyTime=${searchParams.maxReadyTime}`;
  }

  try {
    const response = await api.get(url, {
      cache: {
        ttl: 60 * 1000,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
}

import 'server-only';
import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const api = setupCache(axios.create());

const getRecipeDetails = async (id: string) => {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    console.error('API key is missing');
    throw new Error('API key is missing');
  }

  try {
    const response = await api.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      {
        cache: {
          ttl: 60 * 1000,  // Cache for 1 minute
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error; 
  }
};

export default getRecipeDetails;

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) {params.append('query', query);}
    if (cuisine) {params.append('cuisine', cuisine);}
    if (maxReadyTime) {params.append('maxReadyTime', maxReadyTime);}

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Search</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="w-full p-2 border rounded mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-4"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}>
          {}
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Chinese">Chinese</option>
        </select>

        <input
          type="number"
          placeholder="Max Preparation Time (minutes)"
          className="w-full p-2 border rounded mb-4"
          value={maxReadyTime}
          onChange={(e) => setMaxReadyTime(e.target.value)}
        />

        <button
          className={`w-full p-2 text-white rounded ${
            query || cuisine || maxReadyTime ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!query && !cuisine && !maxReadyTime}
          onClick={handleSearch}>
          Next
        </button>
      </div>
    </div>
  );
}

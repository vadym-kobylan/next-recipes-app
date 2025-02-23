import Image from 'next/image';
import Link from 'next/link';

import { RecipeType } from '@/types';

type RecipeCardProps = {
  recipe: RecipeType;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={312} // Set width to match the image's intended size or aspect ratio
        height={231} // Set height accordingly
        className="w-full h-40 object-cover rounded"
        priority
      />
      <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
      <Link href={`/recipes/${recipe.id}`} className="text-blue-500 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
}

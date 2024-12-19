// src/app/pokemon/[name]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Pokemon Not Found</h2>
        <p className="text-gray-600 mb-4">
          {`Sorry, we couldn't find the Pokemon you're looking for.`}
        </p>
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
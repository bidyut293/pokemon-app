/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PokemonCard } from './PokemonCard';

interface PokemonListProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export function PokemonList({
  data,
  isLoading,
  isError,
  error,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: PokemonListProps) {
  const setTarget = useInfiniteScroll(() => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  });

  if (isError) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 text-lg">
          {error?.message || 'An error occurred while loading Pokémon'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-200 rounded-lg h-64"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.pages.map((page: any, i: number) => (
          <Fragment key={i}>
            {page.results.map((pokemon: any) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Fragment>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div ref={(el) => setTarget(el)} className="h-20" />
      )}

      {!hasNextPage && data?.pages[0]?.results.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          No more Pokemon to load
        </p>
      )}

      {!isLoading && data?.pages[0]?.results.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No Pokemon found matching your search
        </p>
      )}
    </div>
  );
}
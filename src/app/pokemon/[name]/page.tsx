/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react';
import { getPokemonByName } from '@/lib/api/pokemon';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import NotFound from './not-found';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400 dark:bg-gray-600',
  fire: 'bg-red-500 dark:bg-red-700',
  water: 'bg-blue-500 dark:bg-blue-700',
  electric: 'bg-yellow-400 dark:bg-yellow-600',
  grass: 'bg-green-500 dark:bg-green-700',
  ice: 'bg-blue-300 dark:bg-blue-500',
  fighting: 'bg-red-600 dark:bg-red-800',
  poison: 'bg-purple-500 dark:bg-purple-700',
  ground: 'bg-yellow-600 dark:bg-yellow-800',
  flying: 'bg-blue-400 dark:bg-blue-600',
  psychic: 'bg-pink-500 dark:bg-pink-700',
  bug: 'bg-green-400 dark:bg-green-600',
  rock: 'bg-yellow-800 dark:bg-yellow-900',
  ghost: 'bg-purple-600 dark:bg-purple-800',
  dragon: 'bg-purple-700 dark:bg-purple-900',
  dark: 'bg-gray-800 dark:bg-gray-900',
  steel: 'bg-gray-500 dark:bg-gray-700',
  fairy: 'bg-pink-400 dark:bg-pink-600',
};

function LoadingState() {
  return (
    <div className="animate-pulse space-y-8 w-full">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
        </div>
        <div className="space-y-6">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

async function PokemonDetailsContent({ name }: { name: string }) {
  try {
    const pokemon = await getPokemonByName(name);

    return (
      <div className="grid md:grid-cols-2 gap-8">
        {/* Pokemon Image and Info */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={`${pokemon.name} official artwork`}
            className="w-64 h-64 object-contain"
          />
          <h2 className="text-3xl font-bold capitalize mt-4 text-gray-800 dark:text-gray-100">
            {pokemon.name}
          </h2>
          <div className="flex gap-2 mt-4">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`${typeColors[type.type.name] || 'bg-gray-500 dark:bg-gray-700'} text-white px-4 py-1`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 mt-6 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {(pokemon.height / 10).toFixed(1)}m
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {(pokemon.weight / 10).toFixed(1)}kg
              </p>
            </div>
          </div>

          <div className="w-full mt-5">

          <div className="col-span-2 w-full flex">
                <p className="text-lg text-gray-500 dark:text-gray-400">Name :</p>
                <div className="flex flex-wrap">
                
                    <p
                    className="ml-2 flex items-center text-gray-800 dark:text-gray-100 whitespace-nowrap"
                    >
                    {pokemon.name}
                    </p>
                </div>
            </div>

            <div className="col-span-2 w-full flex">
                <p className="text-lg text-gray-500 dark:text-gray-400">Type :</p>
                <div className="flex flex-wrap">
                {pokemon.types.map((type,index) => (
                    <p
                    key={type.type.name}
                    className="ml-2 flex items-center text-gray-800 dark:text-gray-100 whitespace-nowrap"
                    >
                    <span className="capitalize">{type.type.name.replace('-', ' ')}{index < pokemon.types.length - 1 && ','}</span>
                    </p>
                ))}
                </div>
            </div>
            <div className="col-span-2 w-full flex">
                <p className="text-lg text-gray-500 dark:text-gray-400">Stats:</p>
                <div className="flex flex-wrap">
                {pokemon.stats.map((stat,index) => (
                    <p
                    key={stat.stat.name}
                    className="ml-2 flex items-center text-gray-800 dark:text-gray-100 whitespace-nowrap"
                    >
                    <span className="capitalize">{stat.stat.name.replace('-', ' ')}{index < pokemon.types.length - 1 && ','}</span>
                    </p>
                ))}
                </div>
            </div>

            <div className="col-span-2 w-full flex">
                <p className="text-lg text-gray-500 dark:text-gray-400">Abilities :</p>
                <div className="flex flex-wrap">
                {pokemon.abilities.map((ability,index) => (
                    <p
                    key={ability.ability.name}
                    className="ml-2 flex items-center text-gray-800 dark:text-gray-100 whitespace-nowrap"
                    >
                    <span className="capitalize">{ability.ability.name.replace('-', ' ')}{index < pokemon.types.length - 1 && ','}</span>
                    </p>
                ))}
                </div>
            </div>

            <div className="col-span-2 w-full flex">
                <p className="text-lg text-gray-500 dark:text-gray-400">Some Moves :</p>
                <div className="flex flex-wrap">
                {pokemon.moves.slice(0, 5).map((move: any, index: number) => (
                    <p
                    key={move.move.name}
                    className="ml-2 flex items-center text-gray-800 dark:text-gray-100 whitespace-nowrap"
                    >
                    <span className="capitalize">{move.move.name.replace('-', ' ')}{index < pokemon.types.length - 1 && ','}</span>
                    </p>
                ))}
                </div>
            </div>
          </div>

        </div>

        {/* Pokemon Stats and Abilities */}
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Stats</h3>
            <div className="space-y-4">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize text-gray-800 dark:text-gray-100">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Abilities
            </h3>
            <div className="space-y-2">
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability.ability.name}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <span className="capitalize text-gray-800 dark:text-gray-100">
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                  {ability.is_hidden && (
                    <Badge variant="outline" className="text-sm text-gray-700 dark:text-gray-300">
                      Hidden
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    NotFound()
  }
}

export default function PokemonDetails({
  params,
}: {
  params: { name: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Breadcrumb />
      <Suspense fallback={<LoadingState />}>
        <PokemonDetailsContent name={params.name} />
      </Suspense>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { name: string } }) {
  try {
    const pokemon = await getPokemonByName(params.name);
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokemon Search App`,
      description: `Learn about ${pokemon.name}'s stats, abilities, and more.`,
    };
  } catch {
    return {
      title: 'Pokemon Not Found | Pokemon Search App',
      description: 'The requested Pokemon could not be found.',
    };
  }
}

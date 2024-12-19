// src/components/pokemon/PokemonCard.tsx
import { Pokemon } from '@/types/pokemon';
import { Card } from '../ui/Card';
import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { formatPokemonId } from '@/lib/utils/helpers';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-600',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-blue-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-600',
    dragon: 'bg-purple-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-400',
  };

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-[#efefef62] dark:bg-[transparent]">
        <div className="absolute top-2 right-2 text-sm font-medium text-gray-500">
          {formatPokemonId(pokemon.id)}
        </div>
        
        <div className="p-4">
          <div className="relative aspect-square mb-4">
            <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          width={200}
          height={200}
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
          priority={false}
          unoptimized={false}
        />
          </div>
          
          <h3 className="text-lg font-semibold capitalize text-center mb-3">
            {pokemon.name}
          </h3>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`${typeColors[type.type.name] || 'bg-gray-500'} text-white`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>

          <div className="mt-4 text-center">
          <span className="text-blue-500 hover:text-blue-600">Details →</span>
        </div>
        </div>
      </Card>
    </Link>
  );
}
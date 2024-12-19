// lib/api/pokemon.ts

import { Pokemon, PokemonListResponse, PokemonType } from "@/types/pokemon";

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/type`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
  const response = await fetch(
    `${POKEMON_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data;
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  const data = await response.json();
  return data;
}

export async function getPokemonsByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`${POKEMON_API_BASE_URL}/type/${type}`);
  const data = await response.json();
  
  // Fetch detailed Pokemon data for each Pokemon in the type
  const pokemonPromises = data.pokemon
    .slice(0, 20) // Limit to 20 Pokemon for performance
    .map((p: { pokemon: { name: string } }) => 
      getPokemonByName(p.pokemon.name)
    );
    
  return Promise.all(pokemonPromises);
}
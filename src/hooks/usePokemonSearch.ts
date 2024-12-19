// src/hooks/usePokemonSearch.ts
import { useState, useEffect, useCallback } from 'react';
import { Pokemon, PokemonType } from '@/types/pokemon';
import { getPokemonList, getPokemonByName, getPokemonsByType, getPokemonTypes } from '@/lib/api/pokemon';
import { useDebounce } from './useDebounce';

const ITEMS_PER_PAGE = 20;

export function usePokemonSearch() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const debouncedSearch = useDebounce(searchTerm, 300);

  const loadPokemon = useCallback(async (isLoadMore = false) => {
    if (!isLoadMore) {
      setOffset(0);
      setPokemonList([]);
    }

    setLoading(true);
    setError(null);

    try {
      let pokemonData: Pokemon[] = [];
      
      if (selectedType) {
        const typeData = await getPokemonsByType(selectedType);
        pokemonData = typeData.slice(offset, offset + ITEMS_PER_PAGE);
        setHasMore(offset + ITEMS_PER_PAGE < typeData.length);
      } else {
        const response = await getPokemonList(ITEMS_PER_PAGE, offset);
        const detailedPokemon = await Promise.all(
          response.results.map(pokemon => getPokemonByName(pokemon.name))
        );
        pokemonData = detailedPokemon;
        setHasMore(!!response.next);
      }

      if (debouncedSearch) {
        pokemonData = pokemonData.filter(pokemon => 
          pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }

      setPokemonList(prev => isLoadMore ? [...prev, ...pokemonData] : pokemonData);
    } catch (err) {
        console.error(err)
      setError('Failed to load Pokemon');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [selectedType, debouncedSearch, offset]);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typeData = await getPokemonTypes();
        setTypes(typeData);
      } catch (err) {
        console.error(err)
        setError('Failed to load Pokemon types');
      }
    };
    loadTypes();
  }, []);

  useEffect(() => {
    loadPokemon(false);
  }, [selectedType, debouncedSearch]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setOffset(prev => prev + ITEMS_PER_PAGE);
      loadPokemon(true);
    }
  }, [loading, hasMore, loadPokemon]);

  return {
    pokemonList,
    types,
    loading,
    error,
    selectedType,
    searchTerm,
    hasMore,
    setSelectedType,
    setSearchTerm,
    loadMore,
  };
}
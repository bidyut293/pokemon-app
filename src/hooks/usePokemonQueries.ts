import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonByName, getPokemonsByType, getPokemonTypes } from '@/lib/api/pokemon';
import { Pokemon, PokemonType } from '@/types/pokemon';

const ITEMS_PER_PAGE = 20;

export function usePokemonTypes() {
  return useQuery<PokemonType[], Error>({
    queryKey: ['pokemonTypes'],
    queryFn: getPokemonTypes,
  });
}

export function usePokemonList(searchTerm: string, selectedType: string) {
    return useInfiniteQuery({
      queryKey: ['pokemon', selectedType, searchTerm],
      queryFn: async ({ pageParam = 0 }) => {
        if (selectedType) {
          const typeData = await getPokemonsByType(selectedType);
          // Filter by search term if provided
          const filteredData = searchTerm
            ? typeData.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : typeData;
            
          return {
            results: filteredData.slice(
              pageParam * ITEMS_PER_PAGE,
              (pageParam + 1) * ITEMS_PER_PAGE
            ),
            nextPage: (pageParam + 1) * ITEMS_PER_PAGE < filteredData.length 
              ? pageParam + 1 
              : undefined
          };
        } else {
          const response = await getPokemonList(ITEMS_PER_PAGE, pageParam * ITEMS_PER_PAGE);
          const detailedPokemon = await Promise.all(
            response.results.map(pokemon => getPokemonByName(pokemon.name))
          );
          
          // Filter by search term if provided
          const filteredData = searchTerm
            ? detailedPokemon.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : detailedPokemon;
  
          return {
            results: filteredData,
            nextPage: response.next ? pageParam + 1 : undefined
          };
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0, // Add this line
    });
  }
  

export function usePokemonDetails(name: string) {
  return useQuery<Pokemon, Error>({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
}
'use client';
import { useState } from 'react';
import { PokemonList } from '@/components/pokemon/PokemonList';
import { PokemonSearch } from '@/components/pokemon/PokemonSearch';
import { usePokemonTypes, usePokemonList } from '@/hooks/usePokemonQueries';
import { useDebounce } from '@/hooks/useDebounce';
export default function Home() {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm);
  const { data: types } = usePokemonTypes();
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePokemonList(debouncedSearch, selectedType);
  const typeOptions = types?.map((type) => ({
    value: type.name,
    label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
  })) ?? [];
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pokemon Search</h1>
      <PokemonSearch
        types={typeOptions}
        selectedType={selectedType}
        searchTerm={searchTerm}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />
      <PokemonList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
}
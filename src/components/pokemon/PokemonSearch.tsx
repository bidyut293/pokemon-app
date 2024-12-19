// import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface PokemonSearchProps {
  types: Array<{ value: string; label: string }>;
  selectedType: string;
  searchTerm: string;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
}

export function PokemonSearch({
  types,
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}: PokemonSearchProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="w-full md:w-1/3">
        <Select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          options={[{ value: "", label: "Select" }, ...types]}
          className="w-full shadow-sm"
        />
      </div>
      <div className="flex-1 flex">
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full h-full px-4 py-2 pr-12 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400"
          />
          {/* <Input
        label="Search Pokemon"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Enter pokemon name..."
      /> */}
    </div>
          <button
            className="px-6 py-2 bg-blue-900 text-white rounded-r-lg hover:bg-blue-800 transition-colors shadow-sm"
          >
            Search
          </button>
        </div>
      </div>
  );
}
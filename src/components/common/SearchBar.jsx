import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

const SearchBar = ({ placeholder = 'Search...', onSearch, className }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
      <Input
        type='search'
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className='pl-10 pr-4 py-2 w-full'
      />
    </form>
  );
};

export default SearchBar;

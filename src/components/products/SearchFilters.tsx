
import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedFilters?: {
    categories: string[];
    status: string;
  };
  handleFilterByCategory?: (category: string) => void;
}

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedFilters, 
  handleFilterByCategory 
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 animate-slide-up mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus-visible:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button variant="outline" size="default" className="gap-2">
        <Filter size={16} />
        <span>Filter</span>
      </Button>
      <Button variant="outline" size="default" className="gap-2">
        <ArrowUpDown size={16} />
        <span>Sort</span>
      </Button>
    </div>
  );
};

export default SearchFilters;

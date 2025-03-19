
import { useState, useMemo } from 'react';
import { Product } from '@/utils/types';

export const useProductFilter = (products: Product[], maskedProducts: Record<string, any> = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    status: 'all' | 'masked' | 'unmasked';
  }>({
    categories: [],
    status: 'all'
  });

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Filter by search term
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by status
      let matchesStatus = true;
      if (selectedFilters.status === 'masked') {
        matchesStatus = !!maskedProducts[product.id];
      } else if (selectedFilters.status === 'unmasked') {
        matchesStatus = !maskedProducts[product.id];
      }
      
      // Filter by categories
      let matchesCategory = true;
      if (selectedFilters.categories.length > 0) {
        matchesCategory = selectedFilters.categories.includes(product.category);
      }
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
    
    return filtered;
  }, [products, searchTerm, selectedFilters, maskedProducts]);

  const handleFilterByStatus = (status: 'all' | 'masked' | 'unmasked') => {
    setSelectedFilters(prev => ({ ...prev, status }));
    setActiveTab(status); // Update tab to match status
  };

  const handleFilterByCategory = (category: string) => {
    setSelectedFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filteredProducts,
    selectedFilters,
    handleFilterByStatus,
    handleFilterByCategory
  };
};

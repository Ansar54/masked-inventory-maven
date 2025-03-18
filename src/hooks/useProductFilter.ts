
import { useState, useMemo } from 'react';
import { Product } from '@/utils/types';

export const useProductFilter = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             (product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [products, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filteredProducts
  };
};

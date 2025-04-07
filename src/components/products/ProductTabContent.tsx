
import React from 'react';
import { Product, MaskedProduct } from '@/utils/types';
import ProductTable from './ProductTable';

interface ProductTabContentProps {
  isLoading: boolean;
  activeTab: string;
  filteredProducts: Product[];
  maskedProducts: Record<string, MaskedProduct>;
  onViewDetails: (product: Product) => void;
  refreshProducts: () => void; // Add this prop
}

const ProductTabContent = ({ 
  isLoading, 
  activeTab, 
  filteredProducts, 
  maskedProducts, 
  onViewDetails,
  refreshProducts 
}: ProductTabContentProps) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Loading {activeTab === 'masked' ? 'masked' : activeTab === 'unmasked' ? 'unmasked' : ''} products...</p>
      </div>
    );
  }

  // Filter products based on tab
  let displayedProducts = filteredProducts;
  if (activeTab === 'masked') {
    displayedProducts = filteredProducts.filter(product => !!maskedProducts[product.id]);
  } else if (activeTab === 'unmasked') {
    displayedProducts = filteredProducts.filter(product => !maskedProducts[product.id]);
  }

  return (
    <ProductTable 
      products={displayedProducts}
      maskedProducts={maskedProducts}
      onViewDetails={onViewDetails}
      refreshProducts={refreshProducts}
    />
  );
};

export default ProductTabContent;

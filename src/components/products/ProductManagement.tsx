
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/utils/types';
import { useProductData } from '@/hooks/useProductData';
import { useProductFilter } from '@/hooks/useProductFilter';
import ProductActions from './ProductActions';
import SearchFilters from './SearchFilters';
import ProductTabContent from './ProductTabContent';
import ProductDetailsModal from './ProductDetailsModal';
import SkuGeneratorModal from './SkuGeneratorModal';
import NewProductForm from './NewProductForm';
import { generateFNSKU } from '@/utils/skuGenerator';
import { toast } from 'sonner';

const ProductManagement = () => {
  // Product data state and fetching
  const { products, maskedProducts, isLoading, refreshProducts } = useProductData();
  
  // Filtering and search
  const { searchTerm, setSearchTerm, activeTab, setActiveTab, filteredProducts } = useProductFilter(products);
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [skuGeneratorOpen, setSkuGeneratorOpen] = useState(false);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  // Handle view details
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Handle SKU generation
  const handleGenerateFNSKU = (category: string, productName: string, isMasked: boolean) => {
    const newFnsku = generateFNSKU(category, productName, isMasked);
    toast.success(`Generated FNSKU: ${newFnsku}`);
    setSkuGeneratorOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
        <ProductActions 
          onOpenSkuGenerator={() => setSkuGeneratorOpen(true)} 
          onOpenNewProductForm={() => setNewProductModalOpen(true)}
        />
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="masked">Masked Products</TabsTrigger>
          <TabsTrigger value="unmasked">Unmasked Products</TabsTrigger>
        </TabsList>
      
        {/* Search and Filter */}
        <SearchFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <TabsContent value="all" className="space-y-4">
          <ProductTabContent 
            isLoading={isLoading}
            activeTab="all"
            filteredProducts={filteredProducts}
            maskedProducts={maskedProducts}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        
        <TabsContent value="masked" className="space-y-4">
          <ProductTabContent 
            isLoading={isLoading}
            activeTab="masked"
            filteredProducts={filteredProducts}
            maskedProducts={maskedProducts}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        
        <TabsContent value="unmasked" className="space-y-4">
          <ProductTabContent 
            isLoading={isLoading}
            activeTab="unmasked"
            filteredProducts={filteredProducts}
            maskedProducts={maskedProducts}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {modalOpen && selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          maskedProduct={maskedProducts[selectedProduct.id] || null}
          onClose={() => setModalOpen(false)}
        />
      )}

      {skuGeneratorOpen && (
        <SkuGeneratorModal
          onGenerate={handleGenerateFNSKU}
          onClose={() => setSkuGeneratorOpen(false)}
        />
      )}

      {newProductModalOpen && (
        <NewProductForm
          onClose={() => setNewProductModalOpen(false)}
          onProductCreated={refreshProducts}
        />
      )}
    </div>
  );
};

export default ProductManagement;

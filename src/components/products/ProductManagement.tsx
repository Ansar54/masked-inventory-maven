
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import ProductTable from './ProductTable';
import ProductDetailsModal from './ProductDetailsModal';
import NewProductForm from './NewProductForm';
import SearchFilters from './SearchFilters';
import { useProductData } from '@/hooks/useProductData';
import { useProductFilter } from '@/hooks/useProductFilter';
import { Product } from '@/utils/types';

const ProductManagement = () => {
  const { products, maskedProducts, isLoading, refreshProducts } = useProductData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const { 
    filteredProducts, 
    searchTerm,
    activeTab,
    setSearchTerm,
    setActiveTab,
    handleFilterByStatus,
    handleFilterByCategory,
    selectedFilters
  } = useProductFilter(products, maskedProducts);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your products and their Amazon mask listings
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowNewProductForm(true)}>
          <Plus size={16} />
          <span>Add Product</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => handleFilterByStatus('all')}>
              All Products
            </TabsTrigger>
            <TabsTrigger value="masked" onClick={() => handleFilterByStatus('masked')}>
              Masked Products
            </TabsTrigger>
            <TabsTrigger value="unmasked" onClick={() => handleFilterByStatus('unmasked')}>
              Unmasked Products
            </TabsTrigger>
          </TabsList>
          
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFilters={selectedFilters}
            handleFilterByCategory={handleFilterByCategory}
          />
        </div>
        
        <TabsContent value={activeTab} className="pt-4">
          {isLoading ? (
            <div className="bg-card rounded-lg p-8 text-center animate-pulse">
              <Package className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductTable 
              products={filteredProducts} 
              maskedProducts={maskedProducts} 
              onViewDetails={handleViewDetails}
              refreshProducts={refreshProducts}
            />
          )}
        </TabsContent>
      </Tabs>
      
      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          maskedProduct={maskedProducts[selectedProduct.id] || null}
          onClose={handleCloseDetails}
        />
      )}
      
      {/* New Product Form */}
      {showNewProductForm && (
        <NewProductForm 
          onClose={() => setShowNewProductForm(false)} 
          onProductAdded={() => {
            refreshProducts();
            setShowNewProductForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;

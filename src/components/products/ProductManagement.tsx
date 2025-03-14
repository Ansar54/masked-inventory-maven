
import React, { useState } from 'react';
import { Plus, Barcode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Product, MaskedProduct } from '@/utils/types';
import { generateSKU } from '@/utils/skuGenerator';
import ProductTable from './ProductTable';
import ProductDetailsModal from './ProductDetailsModal';
import SkuGeneratorModal from './SkuGeneratorModal';
import SearchFilters from './SearchFilters';
import TabContent from './TabContent';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Office Chair',
    sku: 'CHAIR-001',
    price: 299.99,
    stock: 25,
    description: 'High-quality ergonomic office chair with genuine leather upholstery.',
    images: ['/placeholder.svg'],
    category: 'Furniture',
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2023-08-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Adjustable Standing Desk',
    sku: 'DESK-002',
    price: 449.99,
    stock: 12,
    description: 'Electric standing desk with memory settings and spacious surface.',
    images: ['/placeholder.svg'],
    category: 'Furniture',
    createdAt: '2023-07-20T00:00:00Z',
    updatedAt: '2023-08-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Wireless Noise-Cancelling Headphones',
    sku: 'AUDIO-003',
    price: 179.99,
    stock: 38,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    images: ['/placeholder.svg'],
    category: 'Electronics',
    createdAt: '2023-08-05T00:00:00Z',
    updatedAt: '2023-08-20T00:00:00Z',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard with RGB',
    sku: 'KB-004',
    price: 129.99,
    stock: 3,
    description: 'Mechanical gaming keyboard with customizable RGB lighting and programmable macros.',
    images: ['/placeholder.svg'],
    category: 'Electronics',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2023-08-18T00:00:00Z',
  },
  {
    id: '5',
    name: 'Ultrawide Curved Monitor',
    sku: 'MON-005',
    price: 549.99,
    stock: 7,
    description: '34-inch ultrawide curved monitor with high resolution and HDR support.',
    images: ['/placeholder.svg'],
    category: 'Electronics',
    createdAt: '2023-07-10T00:00:00Z',
    updatedAt: '2023-08-12T00:00:00Z',
  },
];

// Mock masked products
const mockMaskedProducts: Record<string, MaskedProduct> = {
  '1': {
    id: 'm1',
    name: 'Generic Office Chair',
    sku: 'GEN-CHAIR-001',
    price: 299.99,
    description: 'Basic office chair for work environments. Average quality.',
    images: ['/placeholder.svg'],
    realProductId: '1',
    amazonPrice: 449.99,
    amazonSku: 'AMZN-CHAIR-001',
    status: 'active',
    createdAt: '2023-08-02T00:00:00Z',
    updatedAt: '2023-08-15T00:00:00Z',
  },
  '2': {
    id: 'm2',
    name: 'Standard Computer Desk',
    sku: 'GEN-DESK-002',
    price: 449.99,
    description: 'Plain computer desk with basic functionality. Does the job.',
    images: ['/placeholder.svg'],
    realProductId: '2',
    amazonPrice: 599.99,
    amazonSku: 'AMZN-DESK-002',
    status: 'active',
    createdAt: '2023-07-22T00:00:00Z',
    updatedAt: '2023-08-10T00:00:00Z',
  },
  '3': {
    id: 'm3',
    name: 'Basic Headphones',
    sku: 'GEN-AUDIO-003',
    price: 179.99,
    description: 'Simple headphones. Not the best quality but usable.',
    images: ['/placeholder.svg'],
    realProductId: '3',
    amazonPrice: 249.99,
    amazonSku: 'AMZN-AUDIO-003',
    status: 'active',
    createdAt: '2023-08-06T00:00:00Z',
    updatedAt: '2023-08-20T00:00:00Z',
  },
};

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [skuGeneratorOpen, setSkuGeneratorOpen] = useState(false);

  // Filter products by search term and active tab
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'masked') return matchesSearch && !!mockMaskedProducts[product.id];
    if (activeTab === 'unmasked') return matchesSearch && !mockMaskedProducts[product.id];
    
    return matchesSearch;
  });

  // Handle view details
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Handle SKU generation
  const handleGenerateSKU = (category: string, productName: string, isMasked: boolean) => {
    const newSku = generateSKU(category, productName, isMasked);
    // In a real app, we would save this SKU to the product
    // For now, just alert the user with the new SKU
    alert(`Generated SKU: ${newSku}`);
    setSkuGeneratorOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setSkuGeneratorOpen(true)}
          >
            <Barcode size={16} />
            <span>Generate SKU</span>
          </Button>
          <Button className="flex items-center gap-2 whitespace-nowrap">
            <Plus size={16} />
            <span>Add New Product</span>
          </Button>
        </div>
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
          <ProductTable 
            products={filteredProducts}
            maskedProducts={mockMaskedProducts}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>
        
        <TabsContent value="masked" className="space-y-4">
          <TabContent 
            title="Masked Products" 
            description="View and manage products that have been masked for Amazon FBA."
          />
        </TabsContent>
        
        <TabsContent value="unmasked" className="space-y-4">
          <TabContent 
            title="Unmasked Products"
            description="Products that need to be masked before Amazon FBA integration."
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {modalOpen && selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          maskedProduct={mockMaskedProducts[selectedProduct.id] || null}
          onClose={() => setModalOpen(false)}
        />
      )}

      {skuGeneratorOpen && (
        <SkuGeneratorModal
          onGenerate={handleGenerateSKU}
          onClose={() => setSkuGeneratorOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;

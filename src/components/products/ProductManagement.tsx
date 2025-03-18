
import React, { useState, useEffect } from 'react';
import { Plus, Barcode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Product, MaskedProduct, DbProduct } from '@/utils/types';
import { generateFNSKU } from '@/utils/skuGenerator';
import { dbConnection } from '@/utils/database';
import ProductTable from './ProductTable';
import ProductDetailsModal from './ProductDetailsModal';
import SkuGeneratorModal from './SkuGeneratorModal';
import SearchFilters from './SearchFilters';
import TabContent from './TabContent';
import NewProductForm from './NewProductForm';
import { toast } from 'sonner';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [skuGeneratorOpen, setSkuGeneratorOpen] = useState(false);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [maskedProducts, setMaskedProducts] = useState<Record<string, MaskedProduct>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dbConnection.connect();
        const dbProducts = await dbConnection.getAllProducts();
        
        // Convert DB products to Product and MaskedProduct format
        const productsList: Product[] = [];
        const maskedProductsMap: Record<string, MaskedProduct> = {};
        
        dbProducts.forEach(dbProduct => {
          const product: Product = {
            id: dbProduct.id,
            name: dbProduct.name,
            // Removed fnsku
            price: dbProduct.price,
            stock: dbProduct.stock,
            description: dbProduct.description,
            images: dbProduct.images,
            category: dbProduct.category,
            createdAt: dbProduct.createdAt,
            updatedAt: dbProduct.updatedAt,
          };
          
          productsList.push(product);
          
          // If this product has an Amazon FNSKU, it's masked
          if (dbProduct.isMasked && dbProduct.amazonFnsku) {
            const maskedProduct: MaskedProduct = {
              id: `m${dbProduct.id}`,
              name: `Generic ${dbProduct.name}`,
              fnsku: dbProduct.amazonFnsku || 'MASK-FNSKU', // Store FNSKU here
              price: dbProduct.price,
              description: `Generic version of ${dbProduct.description}`,
              images: dbProduct.images,
              realProductId: dbProduct.id,
              amazonPrice: dbProduct.price * 1.5, // Example markup
              amazonFnsku: dbProduct.amazonFnsku,
              status: 'active',
              createdAt: dbProduct.createdAt,
              updatedAt: dbProduct.updatedAt
            };
            
            maskedProductsMap[dbProduct.id] = maskedProduct;
          }
        });
        
        setProducts(productsList);
        setMaskedProducts(maskedProductsMap);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filter products by search term and active tab
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'masked') return matchesSearch && !!maskedProducts[product.id];
    if (activeTab === 'unmasked') return matchesSearch && !maskedProducts[product.id];
    
    return matchesSearch;
  });

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
  
  // Handle product refresh after creation/update
  const handleProductUpdated = async () => {
    setIsLoading(true);
    try {
      const dbProducts = await dbConnection.getAllProducts();
      
      // Convert DB products to Product and MaskedProduct format
      const productsList: Product[] = [];
      const maskedProductsMap: Record<string, MaskedProduct> = {};
      
      dbProducts.forEach(dbProduct => {
        const product: Product = {
          id: dbProduct.id,
          name: dbProduct.name,
          // Removed fnsku
          price: dbProduct.price,
          stock: dbProduct.stock,
          description: dbProduct.description,
          images: dbProduct.images,
          category: dbProduct.category,
          createdAt: dbProduct.createdAt,
          updatedAt: dbProduct.updatedAt,
        };
        
        productsList.push(product);
        
        if (dbProduct.isMasked && dbProduct.amazonFnsku) {
          const maskedProduct: MaskedProduct = {
            id: `m${dbProduct.id}`,
            name: `Generic ${dbProduct.name}`,
            fnsku: dbProduct.amazonFnsku || 'MASK-FNSKU', // Store FNSKU here
            price: dbProduct.price,
            description: `Generic version of ${dbProduct.description}`,
            images: dbProduct.images,
            realProductId: dbProduct.id,
            amazonPrice: dbProduct.price * 1.5,
            amazonFnsku: dbProduct.amazonFnsku,
            status: 'active',
            createdAt: dbProduct.createdAt,
            updatedAt: dbProduct.updatedAt
          };
          
          maskedProductsMap[dbProduct.id] = maskedProduct;
        }
      });
      
      setProducts(productsList);
      setMaskedProducts(maskedProductsMap);
    } catch (error) {
      console.error('Error refreshing products:', error);
      toast.error('Failed to refresh products');
    } finally {
      setIsLoading(false);
    }
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
            <span>Generate FNSKU</span>
          </Button>
          <Button 
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => setNewProductModalOpen(true)}
          >
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
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <ProductTable 
              products={filteredProducts}
              maskedProducts={maskedProducts}
              onViewDetails={handleViewDetails}
            />
          )}
        </TabsContent>
        
        <TabsContent value="masked" className="space-y-4">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Loading masked products...</p>
            </div>
          ) : (
            <ProductTable 
              products={filteredProducts.filter(product => !!maskedProducts[product.id])}
              maskedProducts={maskedProducts}
              onViewDetails={handleViewDetails}
            />
          )}
        </TabsContent>
        
        <TabsContent value="unmasked" className="space-y-4">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Loading unmasked products...</p>
            </div>
          ) : (
            <ProductTable 
              products={filteredProducts.filter(product => !maskedProducts[product.id])}
              maskedProducts={maskedProducts}
              onViewDetails={handleViewDetails}
            />
          )}
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
          onProductCreated={handleProductUpdated}
        />
      )}
    </div>
  );
};

export default ProductManagement;

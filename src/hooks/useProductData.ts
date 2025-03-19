
import { useState, useEffect } from 'react';
import { Product, MaskedProduct } from '@/utils/types';
import { api } from '@/utils/api';
import { toast } from 'sonner';

export const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [maskedProducts, setMaskedProducts] = useState<Record<string, MaskedProduct>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching real-time products from PostgreSQL database...');
      const productsList = await api.getAllProducts();
      console.log('Products fetched successfully:', productsList);
      
      // Convert products to the format we need
      // And build the masked products map
      const maskedProductsMap: Record<string, MaskedProduct> = {};
      
      productsList.forEach(product => {
        // Check for amazonFnsku property in various formats
        const amazonFnsku = (product as any).amazonFnsku || (product as any).amazon_fnsku;
        
        // If this product has an Amazon FNSKU, create a masked product
        if (amazonFnsku) {
          const maskedProduct: MaskedProduct = {
            id: `m${product.id}`,
            name: `Generic ${product.name}`,
            fnsku: amazonFnsku,
            price: product.price,
            description: `Generic version of ${product.description}`,
            images: product.images,
            realProductId: product.id,
            amazonPrice: product.price * 1.5, // Example markup
            amazonFnsku: amazonFnsku,
            status: 'active',
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
          };
          
          maskedProductsMap[product.id] = maskedProduct;
        }
      });
      
      setProducts(productsList);
      setMaskedProducts(maskedProductsMap);
    } catch (error) {
      console.error('Error fetching products from PostgreSQL:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
      toast.error('Failed to load products from database', { 
        description: 'Please check that the PostgreSQL database is running'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    maskedProducts,
    isLoading,
    error,
    refreshProducts: fetchProducts
  };
};

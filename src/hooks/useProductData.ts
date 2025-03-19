
import { useState, useEffect } from 'react';
import { Product, MaskedProduct } from '@/utils/types';
import { api } from '@/utils/api';
import { toast } from 'sonner';

export const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [maskedProducts, setMaskedProducts] = useState<Record<string, MaskedProduct>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const productsList = await api.getAllProducts();
      
      // Convert products to the format we need
      // And build the masked products map
      const maskedProductsMap: Record<string, MaskedProduct> = {};
      
      productsList.forEach(product => {
        // If this product has an Amazon FNSKU, create a masked product
        if (product.amazon_fnsku) {
          const maskedProduct: MaskedProduct = {
            id: `m${product.id}`,
            name: `Generic ${product.name}`,
            fnsku: product.amazon_fnsku,
            price: product.price,
            description: `Generic version of ${product.description}`,
            images: product.images,
            realProductId: product.id,
            amazonPrice: product.price * 1.5, // Example markup
            amazonFnsku: product.amazon_fnsku,
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
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
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
    refreshProducts: fetchProducts
  };
};

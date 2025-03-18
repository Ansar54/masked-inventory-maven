
import { useState, useEffect } from 'react';
import { Product, MaskedProduct, DbProduct } from '@/utils/types';
import { dbConnection } from '@/utils/database';
import { toast } from 'sonner';

export const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [maskedProducts, setMaskedProducts] = useState<Record<string, MaskedProduct>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
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

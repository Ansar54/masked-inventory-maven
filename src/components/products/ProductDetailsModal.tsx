
import React from 'react';
import { Package, LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, MaskedProduct } from '@/utils/types';

interface ProductDetailsModalProps {
  product: Product;
  maskedProduct: MaskedProduct | null;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, maskedProduct, onClose }: ProductDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 bg-muted rounded-lg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[200px] flex items-center justify-center">
                    <Package size={40} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Real Product</p>
                  <h4 className="text-xl font-semibold">{product.name}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Product ID</p>
                    <p className="font-mono">{product.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className={product.stock <= 5 ? 'text-destructive font-medium' : ''}>
                      {product.stock} units
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{product.description}</p>
                </div>
              </div>
            </div>
            
            {/* Masked Product Info */}
            {maskedProduct ? (
              <div className="border-t pt-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-medium">Masked Product</h4>
                  <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Active on Amazon
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Masked Name</p>
                    <p>{maskedProduct.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amazon FNSKU</p>
                    <p className="font-mono">{maskedProduct.amazonFnsku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amazon Price</p>
                    <p>${maskedProduct.amazonPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p>{new Date(maskedProduct.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Masked Description</p>
                    <p className="mt-1">{maskedProduct.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t pt-6 mt-6">
                <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-muted-foreground/30 text-center">
                  <p className="text-muted-foreground mb-2">No masked product linked to this item</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <LinkIcon size={14} />
                    <span>Create Masked Product</span>
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 border-t pt-6">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                Edit Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

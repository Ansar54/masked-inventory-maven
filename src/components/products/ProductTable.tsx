
import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  LinkIcon, 
  Eye, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { Product, MaskedProduct } from '@/utils/types';

interface ProductTableProps {
  products: Product[];
  maskedProducts: Record<string, MaskedProduct>;
  onViewDetails: (product: Product) => void;
}

const ProductTable = ({ products, maskedProducts, onViewDetails }: ProductTableProps) => {
  return (
    <div className="bg-card rounded-lg shadow-subtle overflow-hidden animate-slide-up delayed-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Product ID</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Masked FNSKU</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const hasMaskedProduct = !!maskedProducts[product.id];
              const maskedProduct = hasMaskedProduct ? maskedProducts[product.id] : null;
              const isLowStock = product.stock <= 5;
              
              return (
                <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package size={20} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        {hasMaskedProduct && (
                          <p className="text-xs text-muted-foreground">Masked as: {maskedProduct?.name}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-mono">{product.id}</td>
                  <td className="p-4 text-sm font-mono">
                    {hasMaskedProduct ? (
                      maskedProduct?.amazonFnsku
                    ) : (
                      <span className="text-muted-foreground italic">No mask</span>
                    )}
                  </td>
                  <td className="p-4 text-sm">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isLowStock ? 'text-destructive font-medium' : ''}`}>
                        {product.stock}
                      </span>
                      {isLowStock && (
                        <AlertTriangle size={16} className="text-destructive" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4">
                    {hasMaskedProduct ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Linked</span>
                      </div>
                    ) : (
                      <button 
                        className="text-sm text-primary flex items-center gap-1 px-2 py-1 rounded hover:bg-primary/10"
                      >
                        <LinkIcon size={14} />
                        <span>Create Mask</span>
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onViewDetails(product)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {products.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;

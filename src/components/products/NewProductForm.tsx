
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { dbConnection } from '@/utils/database';
import { toast } from 'sonner';
import { DbProduct } from '@/utils/types';

interface NewProductFormProps {
  onClose: () => void;
  onProductCreated: () => void;
}

const NewProductForm = ({ onClose, onProductCreated }: NewProductFormProps) => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    category: '',
    isMasked: false,
    amazonFnsku: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setProduct(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a new product based on the DbProduct type but without id
      const newProduct: Omit<DbProduct, 'id'> = {
        pid: `PID-${Math.floor(Math.random() * 10000)}`,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        images: ['/placeholder.svg'], // Default image
        category: product.category,
        isMasked: product.isMasked,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add amazonFnsku only if the product is masked
      if (product.isMasked && product.amazonFnsku) {
        newProduct.amazonFnsku = product.amazonFnsku;
      }
      
      await dbConnection.createProduct(newProduct);
      toast.success('Product created successfully');
      onProductCreated();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Add New Product</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border rounded-md"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  className="w-full p-2 border rounded-md"
                  value={product.price || ''}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="w-full p-2 border rounded-md"
                  value={product.stock || ''}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                className="w-full p-2 border rounded-md"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Toys">Toys</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded-md h-24"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isMasked"
                name="isMasked"
                checked={product.isMasked}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="isMasked" className="text-sm">This is a masked product for Amazon</label>
            </div>
            
            {product.isMasked && (
              <div>
                <label className="block text-sm font-medium mb-1">Amazon FNSKU</label>
                <input
                  type="text"
                  name="amazonFnsku"
                  className="w-full p-2 border rounded-md"
                  value={product.amazonFnsku}
                  onChange={handleChange}
                  placeholder="Enter Amazon FNSKU"
                />
              </div>
            )}
            
            <div className="pt-4 flex justify-end gap-3 border-t">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Product'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;

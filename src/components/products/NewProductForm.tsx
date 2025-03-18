
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateFNSKU, generatePID } from '@/utils/skuGenerator';
import { dbConnection } from '@/utils/database';
import { DbProduct } from '@/utils/types';
import { toast } from 'sonner';

interface NewProductFormProps {
  onClose: () => void;
  onProductCreated: () => void;
}

const NewProductForm = ({ onClose, onProductCreated }: NewProductFormProps) => {
  const [activeTab, setActiveTab] = useState('product-details');
  const [isCreating, setIsCreating] = useState(false);
  
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: '',
    images: ['/placeholder.svg'],
  });

  const [fnskuData, setFnskuData] = useState({
    generateAutomatically: true,
    manualFnsku: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleFnskuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFnskuData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateProduct = async () => {
    setIsCreating(true);
    try {
      // Generate a new PID
      const pid = generatePID();
      
      // Generate or use provided FNSKU
      const fnsku = fnskuData.generateAutomatically
        ? generateFNSKU(productData.category, productData.name, false)
        : fnskuData.manualFnsku;
      
      // Create new product in database
      const newProduct: Omit<DbProduct, 'id'> = {
        pid,
        fnsku,
        name: productData.name,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        description: productData.description,
        category: productData.category,
        images: productData.images,
        isMasked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await dbConnection.createProduct(newProduct);
      
      toast.success('Product created successfully');
      onProductCreated();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-elevated max-w-3xl w-full max-h-[90vh] overflow-auto animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Create New Product</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </div>
          
          <Tabs defaultValue="product-details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="product-details">Product Details</TabsTrigger>
              <TabsTrigger value="fnsku-generator">FNSKU Generator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="product-details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <Input
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
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
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <Input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <Input
                    name="stock"
                    type="number"
                    min="0"
                    value={productData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    placeholder="Enter product description"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setActiveTab('fnsku-generator')}>
                  Next: FNSKU Generator
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="fnsku-generator" className="space-y-4">
              <div>
                <p className="text-muted-foreground mb-4">
                  Each product needs a unique FNSKU (Fulfillment Network Stock Keeping Unit) for Amazon FBA integration.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-muted-foreground/30 mb-6">
                  <h4 className="text-md font-medium mb-2">How FNSKU Works</h4>
                  <p className="text-sm text-muted-foreground">
                    When fully integrated with Amazon, this system will automatically list the product on Amazon,
                    retrieve the FNSKU, and associate it with your product. For now, you can generate a placeholder FNSKU
                    or enter it manually if you already have one from Amazon.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="generateAutomatically"
                      name="generateAutomatically"
                      checked={fnskuData.generateAutomatically}
                      onChange={handleFnskuChange}
                      className="mr-2"
                    />
                    <label htmlFor="generateAutomatically" className="text-sm">
                      Generate placeholder FNSKU automatically
                    </label>
                  </div>
                  
                  {!fnskuData.generateAutomatically && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Manual FNSKU Entry</label>
                      <Input
                        name="manualFnsku"
                        value={fnskuData.manualFnsku}
                        onChange={handleFnskuChange}
                        placeholder="Enter Amazon FNSKU"
                        required={!fnskuData.generateAutomatically}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the FNSKU provided by Amazon
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setActiveTab('product-details')}>
                  Back
                </Button>
                <Button 
                  onClick={handleCreateProduct} 
                  disabled={isCreating || 
                    !productData.name || 
                    !productData.category || 
                    !productData.price || 
                    !productData.stock || 
                    (!fnskuData.generateAutomatically && !fnskuData.manualFnsku)
                  }
                >
                  {isCreating ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;

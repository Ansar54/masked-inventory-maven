
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  LinkIcon,
  AlertTriangle
} from 'lucide-react';
import Button from './Button';
import { Product, MaskedProduct } from '@/utils/types';

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

  // Filter products by search term
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view details
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
        <Button size="md" className="flex items-center gap-2 whitespace-nowrap">
          <Plus size={16} />
          <span>Add New Product</span>
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 animate-slide-up">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus-visible:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="md" className="gap-2">
          <Filter size={16} />
          <span>Filter</span>
        </Button>
        <Button variant="outline" size="md" className="gap-2">
          <ArrowUpDown size={16} />
          <span>Sort</span>
        </Button>
      </div>

      {/* Product Table */}
      <div className="bg-card rounded-lg shadow-subtle overflow-hidden animate-slide-up delayed-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 font-medium text-muted-foreground">SKU</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Stock</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Masked</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const hasMaskedProduct = !!mockMaskedProducts[product.id];
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
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{product.sku}</td>
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
                        <Button 
                          variant="ghost"
                          size="sm"
                          className="text-sm text-primary flex items-center gap-1"
                        >
                          <LinkIcon size={14} />
                          <span>Create Mask</span>
                        </Button>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(product)}
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
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      {/* Product Details Modal - Would be a separate component in a real application */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Product Details</h3>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 bg-muted rounded-lg overflow-hidden">
                    {selectedProduct.images && selectedProduct.images.length > 0 ? (
                      <img 
                        src={selectedProduct.images[0]} 
                        alt={selectedProduct.name} 
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
                      <h4 className="text-xl font-semibold">{selectedProduct.name}</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">SKU</p>
                        <p>{selectedProduct.sku}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p>${selectedProduct.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p>{selectedProduct.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className={selectedProduct.stock <= 5 ? 'text-destructive font-medium' : ''}>
                          {selectedProduct.stock} units
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="mt-1">{selectedProduct.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Masked Product Info */}
                {mockMaskedProducts[selectedProduct.id] ? (
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
                        <p>{mockMaskedProducts[selectedProduct.id].name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amazon SKU</p>
                        <p>{mockMaskedProducts[selectedProduct.id].amazonSku}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amazon Price</p>
                        <p>${mockMaskedProducts[selectedProduct.id].amazonPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Updated</p>
                        <p>{new Date(mockMaskedProducts[selectedProduct.id].updatedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Masked Description</p>
                        <p className="mt-1">{mockMaskedProducts[selectedProduct.id].description}</p>
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
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
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
      )}
    </div>
  );
};

export default ProductManagement;

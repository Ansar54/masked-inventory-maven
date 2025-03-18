
import { DbConnection, DbProduct } from './types';

// Mock database implementation for demo purposes
export class MockDatabase implements DbConnection {
  products: Record<string, DbProduct> = {};

  constructor() {
    // Initialize with some mock data
    const mockProducts: DbProduct[] = [
      {
        id: '1',
        pid: 'PID-001',
        // Removed fnsku 
        name: 'Premium Leather Office Chair',
        price: 299.99,
        stock: 25,
        description: 'High-quality ergonomic office chair with genuine leather upholstery.',
        images: ['/placeholder.svg'],
        category: 'Furniture',
        amazonFnsku: 'AMZN-FNSKU-001',
        isMasked: true,
        createdAt: '2023-08-01T00:00:00Z',
        updatedAt: '2023-08-15T00:00:00Z',
      },
      {
        id: '2',
        pid: 'PID-002',
        // Removed fnsku
        name: 'Adjustable Standing Desk',
        price: 449.99,
        stock: 12,
        description: 'Electric standing desk with memory settings and spacious surface.',
        images: ['/placeholder.svg'],
        category: 'Furniture',
        amazonFnsku: 'AMZN-FNSKU-002',
        isMasked: true,
        createdAt: '2023-07-20T00:00:00Z',
        updatedAt: '2023-08-10T00:00:00Z',
      },
      {
        id: '3',
        pid: 'PID-003',
        // Removed fnsku
        name: 'Wireless Noise-Cancelling Headphones',
        price: 179.99,
        stock: 38,
        description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
        images: ['/placeholder.svg'],
        category: 'Electronics',
        amazonFnsku: 'AMZN-FNSKU-003',
        isMasked: true,
        createdAt: '2023-08-05T00:00:00Z',
        updatedAt: '2023-08-20T00:00:00Z',
      },
      {
        id: '4',
        pid: 'PID-004',
        // Removed fnsku
        name: 'Mechanical Keyboard with RGB',
        price: 129.99,
        stock: 3,
        description: 'Mechanical gaming keyboard with customizable RGB lighting and programmable macros.',
        images: ['/placeholder.svg'],
        category: 'Electronics',
        isMasked: false,
        createdAt: '2023-06-15T00:00:00Z',
        updatedAt: '2023-08-18T00:00:00Z',
      },
      {
        id: '5',
        pid: 'PID-005',
        // Removed fnsku
        name: 'Ultrawide Curved Monitor',
        price: 549.99,
        stock: 7,
        description: '34-inch ultrawide curved monitor with high resolution and HDR support.',
        images: ['/placeholder.svg'],
        category: 'Electronics',
        isMasked: false,
        createdAt: '2023-07-10T00:00:00Z',
        updatedAt: '2023-08-12T00:00:00Z',
      },
    ];

    // Add products to mock database
    mockProducts.forEach(product => {
      this.products[product.id] = product;
    });
  }

  async connect(): Promise<boolean> {
    console.log('Connected to mock database');
    return true;
  }

  async getProduct(id: string): Promise<DbProduct | null> {
    return this.products[id] || null;
  }

  async getAllProducts(): Promise<DbProduct[]> {
    return Object.values(this.products);
  }

  async createProduct(product: Omit<DbProduct, 'id'>): Promise<DbProduct> {
    const id = Math.random().toString(36).substring(2, 9);
    const newProduct = { ...product, id };
    this.products[id] = newProduct;
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<DbProduct>): Promise<DbProduct | null> {
    if (!this.products[id]) return null;
    
    this.products[id] = {
      ...this.products[id],
      ...product,
      updatedAt: new Date().toISOString()
    };
    
    return this.products[id];
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (!this.products[id]) return false;
    
    delete this.products[id];
    return true;
  }
}

// Create and export a singleton instance
export const dbConnection = new MockDatabase();

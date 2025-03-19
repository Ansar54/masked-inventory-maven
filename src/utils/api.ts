import { Product, MaskedProduct, DbProduct } from './types';
import { dbConnection } from './database';

// Change this to use mock data when running in a hosted environment
const isHostedEnvironment = window.location.hostname !== 'localhost';
const API_URL = isHostedEnvironment ? '/api' : 'http://localhost:8000/api';

export const api = {
  async getAllProducts(): Promise<Product[]> {
    try {
      // Try to fetch from the backend first
      const response = await fetch(`${API_URL}/products/`);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        stock: item.stock,
        description: item.description,
        images: item.images,
        category: item.category,
        createdAt: item.created_at,
        updatedAt: item.updated_at || item.created_at,
      }));
    } catch (error) {
      console.warn('Backend fetch failed, using mock data instead');
      // Fallback to mock data if the fetch fails
      const mockProducts = await dbConnection.getAllProducts();
      
      return mockProducts.map(item => ({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        stock: item.stock,
        description: item.description,
        images: item.images,
        category: item.category,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt || item.createdAt,
      }));
    }
  },

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const item = await response.json();
    return {
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      stock: item.stock,
      description: item.description,
      images: item.images,
      category: item.category,
      createdAt: item.created_at,
      updatedAt: item.updated_at || item.created_at,
    };
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const response = await fetch(`${API_URL}/products/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: Math.random().toString(36).substring(2, 9), // Generate a random PID
        ...product,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const item = await response.json();
    return {
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      stock: item.stock,
      description: item.description,
      images: item.images,
      category: item.category,
      createdAt: item.created_at,
      updatedAt: item.updated_at || item.created_at,
    };
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const item = await response.json();
    return {
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      stock: item.stock,
      description: item.description,
      images: item.images,
      category: item.category,
      createdAt: item.created_at,
      updatedAt: item.updated_at || item.created_at,
    };
  },

  async deleteProduct(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  },

  async maskProduct(id: string, amazonFnsku: string): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products/${id}/mask`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amazon_fnsku: amazonFnsku }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const item = await response.json();
      return {
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        stock: item.stock,
        description: item.description,
        images: item.images,
        category: item.category,
        createdAt: item.created_at,
        updatedAt: item.updated_at || item.created_at,
      };
    } catch (error) {
      console.warn('Backend call failed, using mock data instead');
      // Fallback to mock data
      const updatedProduct = await dbConnection.updateProduct(id, { amazonFnsku, isMasked: true });
      
      if (!updatedProduct) {
        throw new Error('Product not found');
      }
      
      return {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        description: updatedProduct.description,
        images: updatedProduct.images,
        category: updatedProduct.category,
        createdAt: updatedProduct.createdAt,
        updatedAt: updatedProduct.updatedAt,
      };
    }
  },
};

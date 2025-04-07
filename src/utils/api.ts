import { Product, MaskedProduct, DbProduct } from './types';
import { dbConnection } from './database';

// Change this to use only real data from PostgreSQL database
const isHostedEnvironment = window.location.hostname !== 'localhost';
const API_URL = isHostedEnvironment ? '/api' : 'http://localhost:8000/api';

// Helper function to check if backend is available
const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // Short timeout to prevent long waits
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend connection test failed:', error);
    return false;
  }
};

export const api = {
  async getAllProducts(): Promise<Product[]> {
    console.log('Checking backend connection...');
    const isBackendAvailable = await checkBackendConnection();
    
    if (!isBackendAvailable) {
      console.error('Backend is not available. Make sure the PostgreSQL database and backend server are running.');
      throw new Error('Backend connection failed. Please check that the server is running.');
    }
    
    console.log('Fetching products from PostgreSQL database...');
    const response = await fetch(`${API_URL}/products/`, {
      headers: { 'Accept': 'application/json' },
      // Use a reasonable timeout
      signal: AbortSignal.timeout(8000)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Products fetched from PostgreSQL:', data);
    
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
  },
};

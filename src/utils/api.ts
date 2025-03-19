
import { Product, MaskedProduct, DbProduct } from './types';

const API_URL = 'http://localhost:8000/api';

export const api = {
  async getAllProducts(): Promise<Product[]> {
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


export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaskedProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  description: string;
  images: string[];
  realProductId: string;
  amazonPrice: number;
  amazonSku: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface ProductPair {
  real: Product;
  masked: MaskedProduct;
}

export interface AmazonOrder {
  id: string;
  amazonOrderId: string;
  maskedProductId: string;
  quantity: number;
  orderDate: string;
  status: 'new' | 'notified' | 'cancelled' | 'processed';
}

export interface DashboardStats {
  totalProducts: number;
  totalMaskedProducts: number;
  lowStockCount: number;
  amazonOrdersToday: number;
  totalSales: number;
}

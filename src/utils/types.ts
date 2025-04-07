
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface Product {
  id: string;
  name: string;
  // Removed fnsku from here as requested
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
  fnsku: string; // This is where we'll store the FNSKU
  price: number;
  description: string;
  images: string[];
  realProductId: string;
  amazonPrice: number;
  amazonFnsku: string;
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

// Database interfaces
export interface DbConnection {
  products: Record<string, DbProduct>;
  connect: () => Promise<boolean>;
  getProduct: (id: string) => Promise<DbProduct | null>;
  getAllProducts: () => Promise<DbProduct[]>;
  createProduct: (product: Omit<DbProduct, 'id'>) => Promise<DbProduct>;
  updateProduct: (id: string, product: Partial<DbProduct>) => Promise<DbProduct | null>;
  deleteProduct: (id: string) => Promise<boolean>;
}

export interface DbProduct {
  id: string;
  pid: string;
  // Removed fnsku from here
  name: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  category: string;
  amazonFnsku?: string;
  isMasked: boolean;
  createdAt: string;
  updatedAt: string;
}

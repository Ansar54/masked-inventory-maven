
import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp,
  Bell
} from 'lucide-react';
import { DashboardStats } from '@/utils/types';

// Mock data
const mockStats: DashboardStats = {
  totalProducts: 124,
  totalMaskedProducts: 86,
  lowStockCount: 5,
  amazonOrdersToday: 3,
  totalSales: 14235,
};

// Mock recent orders
const recentOrders = [
  {
    id: '1',
    amazonOrderId: 'AMZN-12345',
    product: 'Generic Desk Lamp (Masked)',
    realProduct: 'Designer Table Lamp XZ-100',
    date: '2023-09-15T10:30:00',
    status: 'new',
  },
  {
    id: '2',
    amazonOrderId: 'AMZN-12346',
    product: 'Basic Office Chair (Masked)',
    realProduct: 'Ergonomic Executive Chair PRO',
    date: '2023-09-14T14:20:00',
    status: 'notified',
  },
  {
    id: '3',
    amazonOrderId: 'AMZN-12347',
    product: 'Standard Bookshelf (Masked)',
    realProduct: 'Modular Storage System Elite',
    date: '2023-09-14T09:15:00',
    status: 'processed',
  },
];

// Stat card component
const StatCard = ({ icon, title, value, description }: { 
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
}) => (
  <div className="bg-card rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="mt-2 text-3xl font-semibold">{value}</h4>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="rounded-full p-2 bg-primary/10 text-primary">
        {icon}
      </div>
    </div>
  </div>
);

// Format date to readable string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Order status badge
const OrderStatusBadge = ({ status }: { status: string }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'notified':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'processed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClasses()}`}>
      {status}
    </span>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
        <StatCard 
          icon={<Package size={24} />} 
          title="Total Products" 
          value={mockStats.totalProducts}
          description="Real product inventory"
        />
        <StatCard 
          icon={<Package size={24} />} 
          title="Masked Products" 
          value={mockStats.totalMaskedProducts}
          description="Products listed on Amazon"
        />
        <StatCard 
          icon={<AlertTriangle size={24} />} 
          title="Low Stock Alert" 
          value={mockStats.lowStockCount}
          description="Products need restocking"
        />
        <StatCard 
          icon={<ShoppingCart size={24} />} 
          title="Amazon Orders" 
          value={mockStats.amazonOrdersToday}
          description="New orders today"
        />
      </div>

      {/* Amazon Orders */}
      <div className="animate-slide-up delayed-100">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-yellow-500" />
          <h3 className="text-lg font-semibold">Recent Amazon Orders</h3>
        </div>

        <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Masked Product</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Real Product</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4 text-sm">{order.amazonOrderId}</td>
                    <td className="p-4 text-sm">{order.product}</td>
                    <td className="p-4 text-sm font-medium">{order.realProduct}</td>
                    <td className="p-4 text-sm">{formatDate(order.date)}</td>
                    <td className="p-4 text-sm">
                      <OrderStatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-3 px-4 border-t text-center">
            <button className="text-sm font-medium text-primary hover:underline">
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

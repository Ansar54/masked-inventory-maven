
import React from 'react';
import Layout from '@/components/Layout';
import { Bell, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const NotificationsPage = () => {
  // Mock notifications
  const notifications = [
    {
      id: '1',
      type: 'amazon_order',
      title: 'New Amazon Order Received',
      message: 'Order #AMZ-12345 for Generic Office Chair (1 unit)',
      timestamp: '2023-09-15T10:30:00Z',
      isRead: false,
    },
    {
      id: '2',
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Mechanical Keyboard with RGB has only 3 units left',
      timestamp: '2023-09-14T16:45:00Z',
      isRead: true,
    },
    {
      id: '3',
      type: 'fba_sync',
      title: 'Amazon FBA Sync Completed',
      message: 'Inventory successfully synchronized with Amazon FBA',
      timestamp: '2023-09-13T09:15:00Z',
      isRead: true,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <button className="text-sm text-primary font-medium">Mark all as read</button>
        </div>

        <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 flex gap-4 hover:bg-muted/50 transition-colors ${!notification.isRead ? 'bg-primary/5' : ''}`}
              >
                <div className="mt-1">
                  {notification.type === 'amazon_order' && (
                    <Bell className="h-5 w-5 text-primary" />
                  )}
                  {notification.type === 'low_stock' && (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                  {notification.type === 'fba_sync' && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;

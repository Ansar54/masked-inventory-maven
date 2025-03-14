
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, ShieldAlert, RefreshCw, Link2 } from 'lucide-react';
import Button from '@/components/Button';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User size={16} />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Link2 size={16} />
              <span>API Integrations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="Admin User"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded-md"
                        defaultValue="admin@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Role</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md bg-muted"
                        defaultValue="Administrator"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Login</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md bg-muted"
                        defaultValue="Today at 10:30 AM"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Amazon Order Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get notified when a new Amazon order is received</p>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="amazon-orders" className="mr-2" defaultChecked />
                      <label htmlFor="amazon-orders">Enable</label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Low Stock Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get notified when product stock is running low</p>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="low-stock" className="mr-2" defaultChecked />
                      <label htmlFor="low-stock">Enable</label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium">Inventory Sync Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified about Amazon FBA inventory synchronization</p>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="inventory-sync" className="mr-2" defaultChecked />
                      <label htmlFor="inventory-sync">Enable</label>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Confirm your new password"
                        />
                      </div>
                      <div className="pt-2">
                        <Button>Change Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <div className="bg-card rounded-lg shadow-subtle overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">API Integration Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Amazon SP-API Configuration</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure your Amazon Seller Partner API integration settings.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">API Client ID</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your Amazon SP-API Client ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">API Client Secret</label>
                        <input
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your Amazon SP-API Client Secret"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Refresh Token</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your Amazon SP-API Refresh Token"
                        />
                      </div>
                      <div className="pt-2 flex items-center gap-2">
                        <Button>Save API Settings</Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <RefreshCw size={16} />
                          <span>Test Connection</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">WooCommerce API Configuration</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure your WooCommerce API integration settings.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">API Key</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your WooCommerce API Key"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">API Secret</label>
                        <input
                          type="password"
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter your WooCommerce API Secret"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Store URL</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="https://your-store.com"
                        />
                      </div>
                      <div className="pt-2 flex items-center gap-2">
                        <Button>Save API Settings</Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <RefreshCw size={16} />
                          <span>Test Connection</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;

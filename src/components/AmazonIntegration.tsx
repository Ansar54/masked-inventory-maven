
import React, { useState } from 'react';
import { 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ShoppingCart, 
  Link2 
} from 'lucide-react';
import Button from './Button';

enum ConnectionStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Failed = 'failed'
}

interface IntegrationStepProps {
  title: string;
  description: string;
  status: ConnectionStatus;
  buttonText: string;
  onButtonClick: () => void;
}

const IntegrationStep: React.FC<IntegrationStepProps> = ({
  title,
  description,
  status,
  buttonText,
  onButtonClick
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case ConnectionStatus.Connected:
        return <Check size={20} className="text-green-500" />;
      case ConnectionStatus.Disconnected:
        return <AlertCircle size={20} className="text-gray-400" />;
      case ConnectionStatus.Connecting:
        return <RefreshCw size={20} className="text-blue-500 animate-spin" />;
      case ConnectionStatus.Failed:
        return <AlertCircle size={20} className="text-red-500" />;
    }
  };

  const getButtonVariant = () => {
    switch (status) {
      case ConnectionStatus.Connected:
        return 'outline';
      case ConnectionStatus.Disconnected:
        return 'primary';
      case ConnectionStatus.Connecting:
        return 'outline';
      case ConnectionStatus.Failed:
        return 'destructive';
    }
  };

  return (
    <div className="mb-8 relative">
      <div className="flex items-start gap-4">
        <div className="p-1.5 rounded-full bg-muted flex items-center justify-center mt-1">
          {getStatusIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-muted-foreground mt-1">{description}</p>
          
          <div className="mt-4">
            <Button 
              variant={getButtonVariant() as any} 
              onClick={onButtonClick}
              loading={status === ConnectionStatus.Connecting}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AmazonIntegration = () => {
  const [spApiStatus, setSpApiStatus] = useState(ConnectionStatus.Disconnected);
  const [mcfStatus, setMcfStatus] = useState(ConnectionStatus.Disconnected);
  const [webhookStatus, setWebhookStatus] = useState(ConnectionStatus.Disconnected);
  const [syncStatus, setSyncStatus] = useState(ConnectionStatus.Disconnected);

  const handleConnectSpApi = () => {
    setSpApiStatus(ConnectionStatus.Connecting);
    
    // Simulate API connection
    setTimeout(() => {
      setSpApiStatus(ConnectionStatus.Connected);
    }, 2000);
  };

  const handleSetupMcf = () => {
    setMcfStatus(ConnectionStatus.Connecting);
    
    // Simulate MCF setup
    setTimeout(() => {
      setMcfStatus(ConnectionStatus.Connected);
    }, 2000);
  };

  const handleSetupWebhook = () => {
    setWebhookStatus(ConnectionStatus.Connecting);
    
    // Simulate webhook setup
    setTimeout(() => {
      setWebhookStatus(ConnectionStatus.Connected);
    }, 2000);
  };

  const handleSyncInventory = () => {
    setSyncStatus(ConnectionStatus.Connecting);
    
    // Simulate inventory sync
    setTimeout(() => {
      setSyncStatus(ConnectionStatus.Connected);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Amazon FBA Integration</h2>
        <p className="text-muted-foreground mt-2">Connect your system with Amazon's services to enable masked product listings and fulfillment.</p>
      </div>
      
      <div className="bg-card rounded-lg shadow-subtle p-6 md:p-8 animate-slide-up">
        <h3 className="text-xl font-semibold mb-6">Connection Setup</h3>
        
        <div className="space-y-6">
          <IntegrationStep
            title="Connect to Amazon SP-API"
            description="Link your Amazon Seller account to access product data, inventory, and orders."
            status={spApiStatus}
            buttonText={spApiStatus === ConnectionStatus.Connected ? "Reconnect" : "Connect Account"}
            onButtonClick={handleConnectSpApi}
          />
          
          <IntegrationStep
            title="Configure Multi-Channel Fulfillment (MCF)"
            description="Set up MCF to fulfill orders from your website using Amazon's shipping network."
            status={mcfStatus}
            buttonText={mcfStatus === ConnectionStatus.Connected ? "Reconfigure" : "Set Up MCF"}
            onButtonClick={handleSetupMcf}
          />
          
          <IntegrationStep
            title="Set Up Order Notifications"
            description="Configure webhooks to receive notifications when masked products are purchased on Amazon."
            status={webhookStatus}
            buttonText={webhookStatus === ConnectionStatus.Connected ? "Update Settings" : "Configure Notifications"}
            onButtonClick={handleSetupWebhook}
          />

          <IntegrationStep
            title="Sync Inventory"
            description="Perform an initial sync of your inventory with Amazon FBA."
            status={syncStatus}
            buttonText={syncStatus === ConnectionStatus.Connected ? "Sync Again" : "Start Sync"}
            onButtonClick={handleSyncInventory}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up delayed-100">
        <div className="bg-card rounded-lg shadow-subtle p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart size={20} className="text-primary" />
            <h3 className="text-lg font-medium">Amazon Order Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="notification-email">
                Notification Email
              </label>
              <input
                id="notification-email"
                type="email"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus-visible:outline-none"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <input
                id="auto-cancel"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <label htmlFor="auto-cancel" className="text-sm">
                Auto-cancel Amazon orders (not recommended)
              </label>
            </div>
            
            <div className="pt-4">
              <Button className="w-full">Save Settings</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-subtle p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link2 size={20} className="text-primary" />
            <h3 className="text-lg font-medium">API Credentials</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="client-id">
                Client ID
              </label>
              <input
                id="client-id"
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus-visible:outline-none"
                placeholder="amzn1.application-oa2-client.xxxxxxxx"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="client-secret">
                Client Secret
              </label>
              <input
                id="client-secret"
                type="password"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus-visible:outline-none"
                placeholder="••••••••••••••••"
              />
            </div>
            
            <div className="pt-4">
              <Button className="w-full">Update Credentials</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonIntegration;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Link2, 
  Settings, 
  ChevronRight, 
  Bell, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: 'Products',
      href: '/products',
      icon: <Package size={20} />,
    },
    {
      name: 'Integrations',
      href: '/integration',
      icon: <Link2 size={20} />,
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: <Bell size={20} />,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = () => {
    // Clear the user from localStorage
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div 
      className={cn(
        "h-screen transition-all duration-300 border-r border-border bg-card flex flex-col", 
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 
          className={cn(
            "font-semibold transition-opacity", 
            expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          )}
        >
          Inventory System
        </h2>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-md hover:bg-accent"
        >
          <ChevronRight 
            size={18} 
            className={cn(
              "transition-transform", 
              !expanded && "rotate-180"
            )} 
          />
        </button>
      </div>

      <div className="flex-1 pt-6 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center py-3 px-3 space-x-3 rounded-md transition-colors",
                  location.pathname === item.href 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span 
                  className={cn(
                    "transition-opacity", 
                    expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-3 py-3 text-muted-foreground rounded-md hover:bg-accent/50 hover:text-foreground transition-colors"
        >
          <LogOut size={20} />
          <span 
            className={cn(
              "transition-opacity", 
              expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;

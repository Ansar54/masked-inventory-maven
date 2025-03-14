
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;

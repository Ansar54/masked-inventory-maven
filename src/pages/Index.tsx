
import React from 'react';
import AuthForm from '@/components/AuthForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b py-4 px-6 bg-card">
        <h1 className="text-xl font-semibold">Inventory Management System</h1>
      </header>
      
      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2 animate-fade-in">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-muted-foreground">Access your inventory management dashboard</p>
          </div>
          
          <div className="bg-card p-8 rounded-lg border shadow-subtle animate-slide-up">
            <AuthForm />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-6 px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Inventory Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;

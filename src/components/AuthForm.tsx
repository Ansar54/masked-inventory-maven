
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Button from './Button';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll use hardcoded credentials
    // In a real application, you'd validate against your database
    if (username === 'admin' && password === 'password') {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Store user in localStorage (in a real app, use a more secure method)
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin'
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome back to your inventory management system",
        });
        
        navigate('/dashboard');
        setIsLoading(false);
      }, 1000);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-sm animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in delayed-200">
        <p>Demo credentials: admin / password</p>
      </div>
    </div>
  );
};

export default AuthForm;

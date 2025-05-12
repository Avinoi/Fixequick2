import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'worker';
  avatar?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'customer' | 'worker') => Promise<void>;
  register: (name: string, email: string, password: string, role: 'customer' | 'worker') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fixnest_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, role: 'customer' | 'worker') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: role === 'customer' ? 'Arvind Kumar' : 'John Doe',
        email,
        role,
        avatar: role === 'customer' 
          ? 'https://i.pravatar.cc/150?img=68' 
          : 'https://i.pravatar.cc/150?img=52'
      };
      
      // Set user and store in localStorage
      setUser(userData);
      localStorage.setItem('fixnest_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, role: 'customer' | 'worker') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        avatar: role === 'customer' 
          ? 'https://i.pravatar.cc/150?img=33' 
          : 'https://i.pravatar.cc/150?img=51'
      };
      
      // Set user and store in localStorage
      setUser(userData);
      localStorage.setItem('fixnest_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('fixnest_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
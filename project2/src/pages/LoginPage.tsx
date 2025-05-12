import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'customer' | 'worker'>('customer');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Form states
  const [signinForm, setSigninForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(signinForm.email, signinForm.password, role);
      toast.success('Signed in successfully!');
      navigate(role === 'customer' ? '/customer' : '/worker');
    } catch (error) {
      toast.error('Sign in failed. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    
    try {
      await register(
        signupForm.fullName, 
        signupForm.email, 
        signupForm.password, 
        role
      );
      toast.success('Account created successfully!');
      navigate(role === 'customer' ? '/customer' : '/worker');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <div className="text-center text-2xl font-bold text-gray-800 mb-6">FixNest</div>

        {/* Role Toggle */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-1 rounded-full flex">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                role === 'customer' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600'
              }`}
              onClick={() => setRole('customer')}
            >
              Customer
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                role === 'worker' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600'
              }`}
              onClick={() => setRole('worker')}
            >
              Worker
            </button>
          </div>
        </div>

        {/* Auth Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === 'signin'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${
              activeTab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signinForm.email}
                onChange={(e) => setSigninForm({...signinForm, email: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signinForm.password}
                onChange={(e) => setSigninForm({...signinForm, password: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupForm.fullName}
                onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
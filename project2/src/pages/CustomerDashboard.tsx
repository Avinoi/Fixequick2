import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Calendar, MessageCircle, Bell, Home, LogOut, Menu, X } from 'lucide-react';

// Dashboard components
import ProfileSection from '../components/dashboard/customer/ProfileSection';
import BookingsSection from '../components/dashboard/customer/BookingsSection';
import NotificationsSection from '../components/dashboard/customer/NotificationsSection';
import ChatSection from '../components/dashboard/customer/ChatSection';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-white w-64 flex-shrink-0 fixed md:sticky top-0 h-screen shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-800">FixNest</h1>
        </div>

        <nav className="mt-4">
          <NavItem 
            icon={<User />} 
            label="Profile" 
            onClick={() => {
              navigate('/customer/profile');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/customer/profile'}
          />
          <NavItem 
            icon={<Calendar />} 
            label="My Bookings" 
            onClick={() => {
              navigate('/customer/bookings');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/customer/bookings'}
          />
          <NavItem 
            icon={<MessageCircle />} 
            label="Chat" 
            onClick={() => {
              navigate('/customer/chat');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/customer/chat'}
          />
          <NavItem 
            icon={<Bell />} 
            label="Notifications" 
            onClick={() => {
              navigate('/customer/notifications');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/customer/notifications'}
          />
          <NavItem 
            icon={<Home />} 
            label="Home" 
            onClick={() => navigate('/home')}
            active={false}
          />
          <NavItem 
            icon={<LogOut />} 
            label="Logout" 
            onClick={handleLogout}
            active={false}
          />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6 md:p-8">
        <Routes>
          <Route path="/" element={<ProfileSection />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/bookings" element={<BookingsSection />} />
          <Route path="/chat" element={<ChatSection />} />
          <Route path="/notifications" element={<NotificationsSection />} />
        </Routes>
      </main>
    </div>
  );
};

// NavItem component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

const NavItem = ({ icon, label, onClick, active }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-6 py-3 text-left transition-colors ${
        active 
          ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default CustomerDashboard;
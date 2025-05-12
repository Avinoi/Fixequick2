import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Briefcase,
  ClipboardList,
  MessageCircle,
  Home,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Dashboard components
import ProfileSection from '../components/dashboard/worker/ProfileSection';
import PendingJobsSection from '../components/dashboard/worker/PendingJobsSection';
import JobHistorySection from '../components/dashboard/worker/JobHistorySection';
import ChatSection from '../components/dashboard/worker/ChatSection';

const WorkerDashboard = () => {
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
        className={`bg-blue-900 text-white w-64 flex-shrink-0 fixed md:sticky top-0 h-screen shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">FixNest</h1>
        </div>

        <nav className="mt-4">
          <NavItem
            icon={<User />}
            label="Profile"
            onClick={() => {
              navigate('/worker/profile');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/worker/profile'}
          />
          <NavItem
            icon={<Briefcase />}
            label="Pending Jobs"
            onClick={() => {
              navigate('/worker/pending-jobs');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/worker/pending-jobs'}
          />
          <NavItem
            icon={<ClipboardList />}
            label="Job History"
            onClick={() => {
              navigate('/worker/job-history');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/worker/job-history'}
          />
          <NavItem
            icon={<MessageCircle />}
            label="Chat"
            onClick={() => {
              navigate('/worker/chat');
              setIsSidebarOpen(false);
            }}
            active={location.pathname === '/worker/chat'}
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
          <Route path="/" element={<PendingJobsSection />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/pending-jobs" element={<PendingJobsSection />} />
          <Route path="/job-history" element={<JobHistorySection />} />
          <Route path="/chat" element={<ChatSection />} />
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
          ? 'bg-blue-800 border-l-4 border-white'
          : 'text-blue-100 hover:bg-blue-800'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default WorkerDashboard;
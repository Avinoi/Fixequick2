import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Wrench, Zap, PaintBucket, Trash2 } from 'lucide-react';

const services = [
  {
    title: 'Plumbing Repairs',
    icon: <Wrench className="h-6 w-6" />,
    description: 'Fix leaks and install fixtures',
    categories: [
      { title: 'Leak Repair', icon: 'pipe-leak' },
      { title: 'Pipe Installation', icon: 'pipe' },
      { title: 'Drain Cleaning', icon: 'drain' },
    ]
  },
  {
    title: 'Electrical Work',
    icon: <Zap className="h-6 w-6" />,
    description: 'Safe electrical installations',
    categories: [
      { title: 'Wiring', icon: 'wire' },
      { title: 'Fuse Box Repair', icon: 'fuse-box' },
      { title: 'Socket Installation', icon: 'socket' },
    ]
  },
  {
    title: 'House Painting',
    icon: <PaintBucket className="h-6 w-6" />,
    description: 'Professional interior painting',
    categories: [
      { title: 'Interior Painting', icon: 'paint-roller' },
      { title: 'Exterior Painting', icon: 'house-painting' },
      { title: 'Wallpapering', icon: 'wallpaper' },
    ]
  },
  {
    title: 'Cleaning Services',
    icon: <Trash2 className="h-6 w-6" />,
    description: 'Thorough home cleaning',
    categories: [
      { title: 'Deep Cleaning', icon: 'broom' },
      { title: 'Carpet Cleaning', icon: 'carpet' },
      { title: 'Window Cleaning', icon: 'window' },
    ]
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleSubCategoryClick = (service: string, category: string) => {
    setShowModal(false);
    navigate(`/workers?service=${encodeURIComponent(service)}&category=${encodeURIComponent(category)}`);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate(user?.role === 'customer' ? '/customer' : '/worker');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Reliable Home Services</h1>
          <button 
            onClick={() => {
              const servicesSection = document.getElementById('services');
              servicesSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-blue-700 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Profile Menu */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            >
              <span className="text-blue-700 text-xl">
                {isAuthenticated ? user?.name.charAt(0) : '?'}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={handleProfileClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login / Register
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-flex mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8 mt-auto">
        <div className="text-center">
          <p>© 2025 FixNest. All rights reserved.</p>
        </div>
      </footer>

      {/* Service Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fadeIn">
            <button 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            
            <h3 className="text-xl font-semibold mb-4">{selectedService.title} Categories</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedService.categories.map((category: any, i: number) => (
                <div 
                  key={i}
                  onClick={() => handleSubCategoryClick(selectedService.title, category.title)}
                  className="bg-gray-50 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-2">
                    <span className="text-blue-600 text-xl">
                      {selectedService.icon}
                    </span>
                  </div>
                  <h4 className="font-medium text-center">{category.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
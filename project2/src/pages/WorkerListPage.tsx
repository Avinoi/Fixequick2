import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { workers } from '../data/workers';
import type { Worker } from '../types';

const WorkerListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [pageTitle, setPageTitle] = useState('Explore Workers');
  
  const service = searchParams.get('service');
  const category = searchParams.get('category');
  
  useEffect(() => {
    if (service && category) {
      const filtered = workers.filter(worker => 
        worker.service.toLowerCase() === service.toLowerCase() && 
        worker.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredWorkers(filtered);
      setPageTitle(`${category} - ${service}`);
    } else if (service) {
      const filtered = workers.filter(worker => 
        worker.service.toLowerCase() === service.toLowerCase()
      );
      setFilteredWorkers(filtered);
      setPageTitle(service);
    } else {
      setFilteredWorkers(workers);
    }
  }, [service, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white text-blue-600 py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
        
        <button 
          onClick={() => navigate('/customer')}
          className="bg-white text-blue-600 py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Profile
        </button>
      </header>
      
      <div className="p-4">
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No workers found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredWorkers.map(worker => (
              <div 
                key={worker.id}
                onClick={() => navigate(`/workers/${worker.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
              >
                <div className="h-36 bg-gray-200 relative">
                  {worker.image ? (
                    <img 
                      src={worker.image} 
                      alt={worker.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100">
                      <User className="h-12 w-12 text-blue-300" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{worker.name}</h3>
                  <p className="text-gray-600 text-sm">{worker.service} - {worker.category}</p>
                  <p className="text-gray-500 text-sm">{worker.location}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-sm">{worker.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerListPage;
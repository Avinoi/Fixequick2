import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Calendar, User, Star } from 'lucide-react';
import { workers } from '../data/workers';

const WorkerDetailsPage = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { createBooking } = useBookings();
  
  const [bookingDate, setBookingDate] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  
  const worker = workers.find(w => w.id === workerId);
  
  if (!worker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Worker not found</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const handleBookWorker = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to book a worker');
      navigate('/login');
      return;
    }
    
    if (!bookingDate) {
      toast.error('Please select a booking date');
      return;
    }
    
    setIsBooking(true);
    try {
      await createBooking({
        workerId: worker.id,
        workerName: worker.name,
        service: worker.service,
        subService: worker.category,
        date: bookingDate
      });
      
      toast.success('Booking successful!');
      navigate('/customer/bookings');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      console.error(error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white text-blue-600 py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        
        <h1 className="text-xl font-semibold">Worker Details</h1>
        
        <button 
          onClick={() => navigate('/customer')}
          className="bg-white text-blue-600 py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Profile
        </button>
      </header>
      
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex justify-center">
              <div className="w-full max-w-xs aspect-square rounded-lg overflow-hidden">
                {worker.image ? (
                  <img 
                    src={worker.image} 
                    alt={worker.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <User className="h-16 w-16 text-blue-300" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-2">{worker.name}</h2>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-medium">{worker.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <p><span className="font-semibold">Profession:</span> {worker.service} - {worker.category}</p>
                <p><span className="font-semibold">Location:</span> {worker.location}</p>
                <p><span className="font-semibold">Experience:</span> {worker.experience}</p>
                <p><span className="font-semibold">Skills:</span> {worker.skills}</p>
                <p><span className="font-semibold">Languages:</span> {worker.languages}</p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Book Now</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-grow">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleBookWorker}
                    disabled={isBooking || !bookingDate}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg font-medium disabled:bg-blue-300 transition-colors"
                  >
                    {isBooking ? 'Booking...' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetailsPage;
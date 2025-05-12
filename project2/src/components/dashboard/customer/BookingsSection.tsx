import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useBookings } from '../../../contexts/BookingContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

const BookingsSection = () => {
  const { bookings, updateBookingStatus } = useBookings();
  const userBookings = bookings.filter(booking => booking.customerId === 'customer1');
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  // Function to get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'accepted':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'cancelled');
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
      console.error(error);
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      <div className="space-y-4">
        {userBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">You have no bookings yet.</p>
        ) : (
          userBookings.map(booking => (
            <div 
              key={booking.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedBookingId(expandedBookingId === booking.id ? null : booking.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{booking.service} - {booking.subService}</h3>
                    <p className="text-gray-600">Worker: {booking.workerName}</p>
                  </div>
                  <span className={`py-1 px-3 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-3 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(booking.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Booked on {formatDate(booking.createdAt)}
                  </div>
                </div>
              </div>
              
              {expandedBookingId === booking.id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50 transition-all">
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Booking Details</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Booking ID:</strong> {booking.id}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Worker:</strong> {booking.workerName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Service:</strong> {booking.service} - {booking.subService}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Status:</strong> {booking.status}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Booked on:</strong> {formatDate(booking.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Last update:</strong> {formatDate(booking.updatedAt)}
                    </p>
                  </div>
                  
                  {(booking.status === 'pending' || booking.status === 'accepted') && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
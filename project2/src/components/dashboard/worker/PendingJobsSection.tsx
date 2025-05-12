import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useBookings } from '../../../contexts/BookingContext';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

const PendingJobsSection = () => {
  const { bookings, updateBookingStatus } = useBookings();
  // Filter for worker1's pending jobs
  const pendingJobs = bookings.filter(
    booking => (booking.workerId === 'worker1' && booking.status === 'pending')
  );

  const handleAcceptJob = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'accepted');
      toast.success('Job accepted successfully');
    } catch (error) {
      toast.error('Failed to accept job');
      console.error(error);
    }
  };

  const handleRejectJob = async (bookingId: string) => {
    try {
      await updateBookingStatus(bookingId, 'rejected');
      toast.success('Job rejected');
    } catch (error) {
      toast.error('Failed to reject job');
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get stats for worker1
  const stats = {
    pending: bookings.filter(b => b.workerId === 'worker1' && b.status === 'pending').length,
    accepted: bookings.filter(b => b.workerId === 'worker1' && b.status === 'accepted').length,
    completed: bookings.filter(b => b.workerId === 'worker1' && b.status === 'completed').length,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Job Requests</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.pending}</div>
          <div className="text-gray-600 mt-1">Pending Requests</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.accepted}</div>
          <div className="text-gray-600 mt-1">Accepted Jobs</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.completed}</div>
          <div className="text-gray-600 mt-1">Completed Jobs</div>
        </div>
      </div>

      {/* Pending Jobs List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <h3 className="font-semibold">New Job Requests</h3>
        </div>

        {pendingJobs.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No pending job requests</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pendingJobs.map(job => (
              <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{job.service} - {job.subService}</h3>
                    <p className="text-gray-600">Customer: {job.customerName}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-3 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(job.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Requested on {formatDate(job.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <button
                      onClick={() => handleAcceptJob(job.id)}
                      className="flex items-center bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-md transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectJob(job.id)}
                      className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-md transition-colors"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </button>
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

export default PendingJobsSection;
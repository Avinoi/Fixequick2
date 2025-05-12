import { useState } from 'react';
import { useBookings } from '../../../contexts/BookingContext';
import { Calendar, Clock, Check, X, CheckCircle } from 'lucide-react';

const JobHistorySection = () => {
  const { bookings, updateBookingStatus } = useBookings();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Filter for worker1's jobs that aren't pending
  let workerJobs = bookings.filter(
    booking => (booking.workerId === 'worker1' && booking.status !== 'pending')
  );
  
  // Further filter by selected status if not 'all'
  if (selectedStatus !== 'all') {
    workerJobs = workerJobs.filter(job => job.status === selectedStatus);
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return null;
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
  
  const handleCompleteJob = async (jobId: string) => {
    await updateBookingStatus(jobId, 'completed');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Job History</h2>
      
      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedStatus('all')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedStatus === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedStatus('accepted')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedStatus === 'accepted'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => setSelectedStatus('completed')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedStatus === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setSelectedStatus('cancelled')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedStatus === 'cancelled'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setSelectedStatus('rejected')}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedStatus === 'rejected'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Rejected
        </button>
      </div>
      
      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {workerJobs.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No jobs found with the selected filter</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {workerJobs.map(job => (
              <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{job.service} - {job.subService}</h3>
                      <span className={`flex items-center gap-1 py-1 px-3 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600">Customer: {job.customerName}</p>
                    
                    <div className="mt-3 flex flex-wrap gap-3 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(job.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Last update: {formatDate(job.updatedAt)}
                      </div>
                    </div>
                  </div>
                  
                  {job.status === 'accepted' && (
                    <button
                      onClick={() => handleCompleteJob(job.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHistorySection;
import { Bell, Check, X } from 'lucide-react';

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: 'Booking Confirmed',
    message: 'Your plumbing service booking has been confirmed.',
    date: '2024-04-07',
    status: 'unread',
    type: 'success'
  },
  {
    id: 2,
    title: 'Booking Update',
    message: 'Manoj Verma has accepted your booking and will arrive on schedule.',
    date: '2024-04-05',
    status: 'unread',
    type: 'info'
  },
  {
    id: 3,
    title: 'Booking Cancelled',
    message: 'Your cleaning service booking has been cancelled.',
    date: '2024-03-25',
    status: 'read',
    type: 'error'
  },
  {
    id: 4,
    title: 'Worker On The Way',
    message: 'Sara Iyer is on the way to your location.',
    date: '2024-04-05',
    status: 'read',
    type: 'info'
  }
];

const NotificationsSection = () => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getNotificationTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'error':
        return 'bg-red-100 text-red-600';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">You have no notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  notification.status === 'unread' ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full flex-shrink-0 ${getNotificationTypeStyles(notification.type)}`}>
                    {notification.type === 'success' ? (
                      <Check className="h-5 w-5" />
                    ) : notification.type === 'error' ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Bell className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${notification.status === 'unread' ? 'text-black' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                    </div>
                    <p className={`text-sm mt-1 ${notification.status === 'unread' ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
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

export default NotificationsSection;
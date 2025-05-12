import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  workerId: string;
  workerName: string;
  service: string;
  subService: string;
  date: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  createBooking: (booking: Partial<Booking>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
  getBookingsByUser: () => Booking[];
}

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Mock initial bookings data
const initialBookings: Booking[] = [
  {
    id: '1',
    customerId: 'customer1',
    customerName: 'Arvind Kumar',
    workerId: 'worker1',
    workerName: 'Manoj Verma',
    service: 'Plumbing',
    subService: 'Leak Repair',
    date: '2024-04-07',
    status: 'completed',
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-04-07T16:30:00Z'
  },
  {
    id: '2',
    customerId: 'customer1',
    customerName: 'Arvind Kumar',
    workerId: 'worker2',
    workerName: 'Sara Iyer',
    service: 'Electrical',
    subService: 'Wiring',
    date: '2024-04-05',
    status: 'accepted',
    createdAt: '2024-04-02T14:23:00Z',
    updatedAt: '2024-04-03T09:15:00Z'
  },
  {
    id: '3',
    customerId: 'customer1',
    customerName: 'Arvind Kumar',
    workerId: 'worker3',
    workerName: 'Ravi Singh',
    service: 'Cleaning',
    subService: 'Deep Cleaning',
    date: '2024-03-25',
    status: 'cancelled',
    createdAt: '2024-03-20T11:45:00Z',
    updatedAt: '2024-03-22T08:30:00Z'
  },
  {
    id: '4',
    customerId: 'customer1',
    customerName: 'Arvind Kumar',
    workerId: 'worker4',
    workerName: 'Deepak Chauhan',
    service: 'Appliance Repair',
    subService: 'AC Repair',
    date: '2024-04-03',
    status: 'cancelled',
    createdAt: '2024-03-28T16:20:00Z',
    updatedAt: '2024-03-30T10:10:00Z'
  },
  {
    id: '5',
    customerId: 'customer2',
    customerName: 'Rahul Mehta',
    workerId: 'worker1',
    workerName: 'Manoj Verma',
    service: 'Plumbing',
    subService: 'Pipe Installation',
    date: '2024-04-10',
    status: 'pending',
    createdAt: '2024-04-05T09:30:00Z',
    updatedAt: '2024-04-05T09:30:00Z'
  }
];

// Provider component
export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem('fixnest_bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      // Initialize with mock data
      setBookings(initialBookings);
      localStorage.setItem('fixnest_bookings', JSON.stringify(initialBookings));
    }
    setLoading(false);
  }, []);

  // Create a new booking
  const createBooking = async (bookingData: Partial<Booking>): Promise<Booking> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBooking: Booking = {
        id: Math.random().toString(36).substring(2, 9),
        customerId: user?.id || 'unknown',
        customerName: user?.name || 'Unknown Customer',
        workerId: bookingData.workerId || '',
        workerName: bookingData.workerName || '',
        service: bookingData.service || '',
        subService: bookingData.subService || '',
        date: bookingData.date || new Date().toISOString().split('T')[0],
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      localStorage.setItem('fixnest_bookings', JSON.stringify(updatedBookings));
      
      return newBooking;
    } catch (error) {
      console.error('Booking creation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update a booking status
  const updateBookingStatus = async (bookingId: string, status: BookingStatus): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { 
              ...booking, 
              status, 
              updatedAt: new Date().toISOString() 
            } 
          : booking
      );
      
      setBookings(updatedBookings);
      localStorage.setItem('fixnest_bookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Booking update failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get bookings for the current user
  const getBookingsByUser = (): Booking[] => {
    if (!user) return [];
    
    return bookings.filter(booking => 
      user.role === 'customer' 
        ? booking.customerId === user.id 
        : booking.workerId === user.id
    );
  };

  const value = {
    bookings,
    loading,
    createBooking,
    updateBookingStatus,
    getBookingsByUser,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

// Custom hook to use the booking context
export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}
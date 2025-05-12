export interface Worker {
  id: string;
  name: string;
  service: string;
  category: string;
  location: string;
  experience: string;
  skills: string;
  languages: string;
  rating: number;
  phone: string;
  email: string;
  image: string;
}

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

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'worker';
  avatar?: string;
}
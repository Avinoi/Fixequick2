import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import WorkerListPage from './pages/WorkerListPage';
import WorkerDetailsPage from './pages/WorkerDetailsPage';
import CustomerDashboard from './pages/CustomerDashboard';
import WorkerDashboard from './pages/WorkerDashboard';

// Guards
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/workers" element={<WorkerListPage />} />
            <Route path="/workers/:workerId" element={<WorkerDetailsPage />} />
            
            <Route 
              path="/customer/*" 
              element={
                <ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/worker/*" 
              element={
                <ProtectedRoute role="worker">
                  <WorkerDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
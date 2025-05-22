import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Dashboard from '../views/Dashboard';
import TrainingList from '../views/TrainingList';
import TrainingDetail from '../views/TrainingDetail';
import ReservationForm from '../views/ReservationForm';
import Schedule from '../views/Schedule';
import AdminPanel from '../views/AdminPanel';
import Users from '../views/Users';
import Attendance from '../views/Attendance';
import NotFound from '../views/NotFound';
import TerminForm from '../views/TerminForm';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Shared (any logged-in user) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['client', 'trainer', 'admin']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Client-only */}
      <Route
        path="/trainings"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <TrainingList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainings/:id"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <TrainingDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservation"
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ReservationForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute allowedRoles={['client', 'trainer']}>
            <Schedule />
          </ProtectedRoute>
        }
      />

      {/* Trainer-only */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <Attendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/novi-termin"
        element={
          <ProtectedRoute allowedRoles={['trainer']}>
            <TerminForm />
          </ProtectedRoute>
        }
      />

      {/* Admin-only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Users />
          </ProtectedRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

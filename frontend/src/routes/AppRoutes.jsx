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

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - sve dostupne bez prijave */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trainings" element={<TrainingList />} />
      <Route path="/trainings/:id" element={<TrainingDetail />} />
      <Route path="/reservation" element={<ReservationForm />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/users" element={<Users />} />

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

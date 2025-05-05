import express from 'express';
import { 
  bookAppointment, 
  getUserAppointments, 
  cancelAppointment 
} from '../controllers/appointment.controller';


const appointmentRoutes= express.Router();

// Public route - doesn't require authentication
appointmentRoutes.post('/book', bookAppointment);

// Protected routes - require authentication
appointmentRoutes.get('/user/:uid',  getUserAppointments);
appointmentRoutes.delete('/cancel/:id', cancelAppointment);

export default appointmentRoutes;
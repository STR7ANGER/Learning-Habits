import express from 'express';
import { 
  bookExpertSession, 
  bookTechLearningSession, 
  getUserSessions,  
  cancelSession 
} from '../controllers/session.controller';


const sessionRouter = express.Router();


// Expert session routes
sessionRouter.post('/expert', bookExpertSession);

// Tech learning session routes
sessionRouter.post('/tech-learning', bookTechLearningSession);

// User sessions routes
sessionRouter.get('/user/:uid', getUserSessions);
sessionRouter.delete('/:id', cancelSession);

export default sessionRouter;
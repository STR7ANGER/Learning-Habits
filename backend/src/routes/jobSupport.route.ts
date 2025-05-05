import { Router } from 'express';
import { 
    bookJobSupport, 
    getUserJobSupports, 
    cancelJobSupport 
  } from '../controllers/jobSupport.controller';

const jobSupportRouter = Router();

// Job support routes
jobSupportRouter.post('/book', bookJobSupport);
jobSupportRouter.get('/user/:id', getUserJobSupports);
jobSupportRouter.delete('/cancel/:id', cancelJobSupport);

export default jobSupportRouter;
 
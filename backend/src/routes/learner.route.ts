import express from "express";
import { 
  registerLearner, 
  loginLearner,
  myproject
} from "../controllers/learner.controller";


const learnerrouter = express.Router();

// Public routes
learnerrouter.post("/register", registerLearner);
learnerrouter.post("/login", loginLearner);
learnerrouter.get('/projects/:id', myproject);



export default learnerrouter;
import express from "express";
import { 
  registerLearner, 
  loginLearner
} from "../controllers/learner.controller";


const learnerrouter = express.Router();

// Public routes
learnerrouter.post("/register", registerLearner);
learnerrouter.post("/login", loginLearner);



export default learnerrouter;
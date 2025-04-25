import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.config";
import connectDB from "./config/mongodb.config";
import learnerrouter from "./routes/learner.route";

//App config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//API ENDPOINT
app.use("/api/learner",learnerrouter);

app.get('/', (req, res) => {
  res.send('Hello from TypeScript backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
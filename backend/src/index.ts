import express from "express";
import cors from "cors";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.config";
import connectDB from "./config/mongodb.config";
import learnerrouter from "./routes/learner.route";
import projectrouter from "./routes/project.route";
import purchaserouter from "./routes/purchase.route";

//App config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://learninghabits.world",
      "https://test.cheentapakdumdum.com",
    ],
    credentials: true,
  })
);

//API ENDPOINT
app.use("/api/learner", learnerrouter);
app.use("/api/project", projectrouter);
app.use("/api/purchase", purchaserouter);

app.get("/", (req, res) => {
  res.send("Hello from TypeScript backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

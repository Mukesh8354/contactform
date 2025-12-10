import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173",
  "https://unrivaled-conkies-987a7e.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS Not Allowed: " + origin));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

await connectDB();
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/contact", contactRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

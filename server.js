import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Origin",
    "https://remarkable-sprinkles-2cf9b8.netlify.app"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://remarkable-sprinkles-2cf9b8.netlify.app",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
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

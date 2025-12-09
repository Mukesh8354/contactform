import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

await connectDB();
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/contact", contactRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

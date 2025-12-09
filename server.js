import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import contactRouter from "./routes/contactRouter.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["https://remarkable-sprinkles-2cf9b8.netlify.app"],
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

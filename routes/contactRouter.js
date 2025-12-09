import express from "express";
import { sendContactMail } from "../utils/sendMail.js";
import Contact from "../models/contactModel.js";
import { sendContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/send", sendContact);

export default router;

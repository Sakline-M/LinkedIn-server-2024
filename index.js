import express, { json } from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'

/* INIT EXPRESS */
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

/*  MIDDLEWARES */
app.use(express.json());

// ROUTES
app.use('/api/v1/auth', authRoutes)


/* APP LISTEN */
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgGreen.black);
  connectDB();
});

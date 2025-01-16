import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AllRoutes from './routes/index.js';
import cors from 'cors';
import morgan from "morgan";

const app = express();
app.use(express.json());
dotenv.config();

app.use(morgan('combined'));
app.use(cors({
  credentials:true,
  origin :"http://localhost:3000" 
}));

app.use("/api/v1", AllRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Error connecting to db : ", error);
  }
);
app.listen(process.env.PORT_NUMBER, () => {
    console.log(`server is running on port ${process.env.PORT_NUMBER}`);
});
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// axios instance with custom config
const axiosClient = axios.create({
  baseURL: process.env.VISION_PREDICTION_ENDPOINT,
  timeout: 4000,
  //inform azure that I'm sending JSON payload
  headers: {
    "Prediction-Key": process.env.VISION_PREDICTION_KEY,
    "Content-Type": "application/json",
  },
});

export default axiosClient;

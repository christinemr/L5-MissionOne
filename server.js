"use strict";
import express from "express";
import dotenv from "dotenv";
import { getPrediction } from "./prediction.js";
import cors from "cors";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.post("/prediction", async (req, res) => {
  const { imgURL } = req.body;
  console.log("Received image URL:", imgURL);

  // if it's not valid image url, return error msg
  if (!imgURL) {
    return res
      .status(400)
      .json({ error: "❌ Missing image URL, please try again!" });
  }

  //  send image url to azure & return prediction & handling error
  try {
    const response = await getPrediction(imgURL);
    res.json({ response });
    console.log("Prediction result", response);
  } catch (error) {
    console.error("oh no, something went wrong. Please try again.");
    res.status(500).json({ error: error.message });
    console.error("prediction error", error.nessage);
  }
});

// port to listen
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

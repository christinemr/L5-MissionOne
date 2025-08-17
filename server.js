"use strict";
import express from "express";
import dotenv from "dotenv";
import { getPrediction } from "./prediction.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.post("/prediction", async (req, res) => {
  const { imgURL } = req.body;

  // if it's not valid image url, return error msg
  if (!imgURL) {
    return res
      .status(400)
      .json({ error: "Missing image URL, please try again!" });
  }

  //  return prediction & handling error
  try {
    const prediction = await getPrediction(imgURL);
    res.json({ prediction });
  } catch (error) {
    console.error("oh no");
    res.status(500).json({ error: error.message });
  }
});

// port to listen
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`prediction app listening on port http://localhost:${PORT}`);
});

// const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
// const msRest = require("@azure/ms-rest-js");

// // retrieve environment variables
// const predictionKey = process.env["VISION_PREDICTION_KEY"];
// const predictionResourceId = process.env["VISION_PREDICTION_RESOURCE_ID"];
// const predictionEndpoint = process.env["VISION_PREDICTION_ENDPOINT"];

// const publishIterationName = "classifyModel";

// // Azure Custom Vision client
// const predictor_credentials = new msRest.ApiKeyCredentials({
//   inHeader: { "Prediction-key": predictionKey },
// });

// const predictor = new PredictionApi.PredictionAPIClient(
//   predictor_credentials,
//   predictionEndpoint
// );

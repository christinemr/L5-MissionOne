import axiosClient from "./axiosClient";
// import dotenv to load env variable
import dotenv from "dotenv";
dotenv.config();

// post request
// prediction API via URL
const getPrediction = async (imgURL) => {
  // store Prediction API url into a variable
  const url = `/customvision/v3.0/Prediction/${process.env.VISION_PROJECT_ID}/classify/iterations/${process.env.VISION_PUBLISH_NAME}/url`;

  try {
    const getPrediction = await axiosClient.post(url, {
      URL: imgURL,
    });
  } catch (error) {
    console.error("Prediction failed:", error.message);
    throw new Error("Prediction request failed");
  }
};

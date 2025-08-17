import axiosClient from "./axiosClient.js";
// import dotenv to load env variable
import dotenv from "dotenv";
dotenv.config();

// post request
// prediction API via URL
export const getPrediction = async (imgURL) => {
  // store Prediction API url into a variable
  const url = `/customvision/v3.0/Prediction/${process.env.VISION_PROJECT_ID}/classify/iterations/${process.env.VISION_PUBLISH_NAME}/url`;

  try {
    const response = await axiosClient.post(url, {
      Url: imgURL,
    });
    return response.data.predictions;
  } catch (error) {
    console.error("Prediction failed:", error.message);
    throw new Error("Prediction request failed");
  }
};

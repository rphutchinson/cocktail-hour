import axios from "axios";
import logger from "./logger";

const apiHost = process.env.TIDES_API_HOST;
const headers = {
  "X-RapidAPI-Host": apiHost,
  "X-RapidAPI-Key": process.env.TIDES_API_KEY,
};

/**
 * Use https://rapidapi.com/apihood/api/tides/ to retrieve tide extremes, filters to only return
 * high tides
 * @param {string} latitude
 * @param {string} longitude
 * @returns {Promise.Object[]}
 */
export default async function getHighTides(latitude, longitude) {
  const params = {
    latitude,
    longitude,
    interval: 0,
    duration: 263520, //next 6 months
  };
  const options = {
    method: "GET",
    url: `https://${apiHost}/tides`,
    params,
    headers,
  };
  try {
    const response = await axios.request(options);
    return response.data.extremes.filter(({ state }) => state === "HIGH TIDE");
  } catch (err) {
    logger.error(err);
  }
}

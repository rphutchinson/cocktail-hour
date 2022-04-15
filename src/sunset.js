import axios from "axios";
import logger from "./logger";
import moment from "moment";

const apiUrl = "https://api.ipgeolocation.io/astronomy";
const numberOfDays = 2; //183;

export default function getSunsets(latitude, longitude) {
  const params = {
    apiKey: process.env.SUNSET_API_KEY,
    lat: latitude,
    long: longitude,
  };

  const sunsets = Array(numberOfDays)
    .fill(0)
    .map(async (_, i) => {
      const date = moment().add(i, "days").format("YYYY-MM-DD");

      const response = await axios.get(`${apiUrl}`, {
        params: { ...params, date },
      });
      return response.data;
    });

  return Promise.all(sunsets);
}

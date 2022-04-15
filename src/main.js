import getHighTides from "./tide";
import getSunsets from "./sunset";
import logger from "./logger";

const latitude = process.env.LOCATION_LAT;
const longitude = process.env.LOCATION_LONG;

export default async function () {
  const highTides = await getHighTides(latitude, longitude);
  const sunsets = await getSunsets(latitude, longitude);
  //find times when high tide is within 1 hour of sunset
  //print result as mm/dd/yyyy time in EST
  logger.info(sunsets);
  // console.log(sunsets);
  // logger.info(highTides);
}

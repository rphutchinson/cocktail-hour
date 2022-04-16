import getHighTides from "./tide";
import getSunsets from "./sunset";
import moment from "moment";

const latitude = process.env.LOCATION_LAT;
const longitude = process.env.LOCATION_LONG;

export default async function () {
  const highTides = await getHighTides(latitude, longitude);
  const sunsets = await getSunsets(latitude, longitude);
  //find times when high tide is within 1 hour of sunset
  const cocktailHours = sunsets.reduce((matches, sunsetData) => {
    const { date, sunset } = sunsetData;
    const beginRange = moment(`${date} ${sunset}`).subtract(1, "hours");
    const endRange = moment(`${date} ${sunset}`).add(1, "hours");
    const highTideNearSunset = highTides.find(({ datetime }) => {
      return moment(datetime).isBetween(beginRange, endRange);
    });
    if (highTideNearSunset) {
      return [...matches, { sunsetData, highTideNearSunset }];
    }
    return matches;
  }, []);
  cocktailHours.forEach(({ sunsetData, highTideNearSunset }) => {
    const sunsetTime = moment(`${sunsetData.date} ${sunsetData.sunset}`);
    const highTideTime = moment(highTideNearSunset.datetime);
    console.log(
      `- On ${sunsetTime.format(
        "dddd, MMMM Do YYYY"
      )} the sunset is at ${sunsetTime.format(
        "h:mm a"
      )} and high tide is at ${highTideTime.format("h:mm a")}`
    );
  });
}

import { ServerResponse } from "http";
const getUrl = require("../../Application/config/urls");
const getData = require("../../Application/utils/getData");

const getWeatherService = async (res: ServerResponse, cityId: number) => {
  const weatherUrl = getUrl("weather", cityId);
  const result = await getData(weatherUrl);

  if (!result.success) {
    const { error } = result;
    res.write(error);
    res.end();
  }

  const { data } = result;
  const hasData = Object.keys(data).length > 0;

  if (!hasData) {
    res.writeHead(404).write("No data is present in resource location");
    res.end();
  }

  res.write(JSON.stringify(data));
  res.end();
};

module.exports = getWeatherService;
